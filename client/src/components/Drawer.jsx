import { Link, Outlet, useNavigate } from "react-router-dom";
import {
  AiOutlineDashboard,
  AiOutlineDelete,
  AiOutlineGithub,
  AiOutlineLogout,
} from "react-icons/ai";
import logo from "../assets/lazy.svg";

import UserProfile from "./profile/UserProfile.jsx";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useState } from "react";

function Drawer() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const { mutate: logoutMutate } = useMutation({
    mutationFn: async () => {
      try {
        const res = await fetch("/api/auth/logout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Something went wrong");
        return data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    onSuccess: () => {
      localStorage.removeItem("authToken");
      queryClient.invalidateQueries({ queryKey: "authUser" });
      navigate("/login", { replace: true });
    },
  });

  const handleLogout = async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);
    await logoutMutate();
    setTimeout(() => {
      setIsLoggingOut(false);
    }, 2000);
  };
  // const { data: authUser } = useQuery({ queryKey: ["authUser"] });

  return (
    <div className="drawer lg:drawer-open ">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        <div className="navbar bg-primary w-full z-50">
          <div className="flex-none lg:hidden">
            <label
              htmlFor="my-drawer-3"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>

          <div className="navbar text-white px-6 py-4 sticky top-0 z-50 flex justify-center items-center w-full">
            <div className="flex items-center justify-center ">
              <img src={logo} alt="logo" className="h-10 w-10 mr-2" />
              <h1 className="text-2xl font-bold">Lazy Task</h1>
            </div>
            <div className="ml-auto flex space-x-6">
              <a
                href="https://github.com/Rakhulsr/REST-CRUD-EJS"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-105 transition"
              >
                <AiOutlineGithub className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        <Outlet />
      </div>

      <div className="drawer-side z-[1000]">
        <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
        <ul className="menu min-h-full w-56 p-4 bg-primary">
          <UserProfile />
          <Link
            to="/app/dashboard"
            className="flex items-center p-4 hover:bg-gray-700 transition"
          >
            <AiOutlineDashboard className="mr-3" />
            Dashboard
          </Link>
          <Link
            to="/app/trash"
            className="flex items-center p-4 hover:bg-gray-700 transition"
          >
            <AiOutlineDelete className="mr-3" />
            Trash
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center p-4 hover:bg-gray-700 transition mt-auto"
            disabled={isLoggingOut}
          >
            <AiOutlineLogout className="mr-3" />
            Logout
          </button>
        </ul>
      </div>
    </div>
  );
}

export default Drawer;
