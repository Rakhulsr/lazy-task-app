import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";

function LoginPage() {
  const initialState = {
    email: "",
    password: "",
  };

  const [formData, setFormData] = useState(initialState);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {
    mutate: loginMutate,
    isLoading,
    // isError,
    // isPending,
    // error,
  } = useMutation({
    mutationFn: async ({ email, password }) => {
      try {
        const res = await fetch("api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
          credentials: "include",
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Something went wrong");
        if (data.error) throw new Error(data.error);
        console.log(data);
        localStorage.setItem("authToken", data.token);
        return data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
  });

  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loginMutate(formData, {
      onSuccess: () => {
        navigate("/app/dashboard", { replace: true });
      },
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-primary">
      <div className="max-w-md w-full bg-gray-400 p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-black text-center">
          Login
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-black"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="email"
              value={formData.email}
              onChange={handleInput}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent sm:text-sm"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-black"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="password"
              value={formData.password}
              onChange={handleInput}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent sm:text-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 px-4 rounded-lg shadow-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <Link to={"/signup"}>
          <div className="flex justify-end mt-2 items-center">
            <span className="link text-black">Create Account</span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default LoginPage;
