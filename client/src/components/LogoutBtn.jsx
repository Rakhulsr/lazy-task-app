import { useQueryClient, useMutation } from "@tanstack/react-query";
import { AiOutlineLogout } from "react-icons/ai";
import { redirect, useNavigate } from "react-router-dom";

function LogoutButton() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: logout } = useMutation(
    "logout",
    async () => {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      if (response.ok) {
        queryClient.invalidateQueries("me");
        queryClient.remove("me");
      }
    },
    {
      onSuccess: () => {
        redirect("/login");
      },
    }
  );

  return (
    <button
      onClick={logout}
      className="flex items-center p-4 hover:bg-gray-700 transition mt-auto"
    >
      <AiOutlineLogout className="mr-3" />
      Logout
    </button>
  );
}

export default LogoutButton;
