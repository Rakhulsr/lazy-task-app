import { Link, Outlet } from "react-router-dom";
import {
  AiOutlineDashboard,
  AiOutlineDelete,
  AiOutlineGithub,
  AiOutlineLogout,
} from "react-icons/ai";
import logo from "../assets/lazy.svg";
// import ProfileEditModal from "./modal/ProfileEditModal";
import UserProfile from "./profile/UserProfile.jsx";

function Drawer() {
  return (
    <div className="drawer lg:drawer-open ">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        <div className="navbar bg-primary w-full">
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
            <div className="flex items-center justify-center">
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

      <div className="drawer-side">
        <label
          htmlFor="my-drawer-3"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

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

          <Link
            to="/logout"
            className="flex items-center p-4 hover:bg-gray-700 transition mt-auto"
          >
            <AiOutlineLogout className="mr-3" />
            Logout
          </Link>
        </ul>
      </div>
    </div>
  );
}

export default Drawer;
