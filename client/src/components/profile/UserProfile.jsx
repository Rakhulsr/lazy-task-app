import { useEffect, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { useQuery, useQueryClient } from "@tanstack/react-query";

function UserProfile() {
  const queryClient = useQueryClient();
  const {
    data: authUser,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      const res = await fetch("/api/auth/me", {
        credentials: "include",
      });
      return res.json();
    },
  });

  const {
    data: profile,
    isLoading: isProfileLoading,
    isError: isProfileError,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const res = await fetch("/api/profile", {
        credentials: "include",
      });
      return res.json();
    },
  });

  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [profilePicture, setProfilePicture] = useState("");

  useEffect(() => {
    if (profile) {
      setUsername(profile.username);
      setFullname(profile.fullname);
      setProfilePicture(profile.profile);
    }
  }, [profile]);

  const handleSaveChanges = (e) => {
    e.preventDefault();
    const updatedUsername = e.target.username.value;
    const updatedFullname = e.target.fullname.value;
    const file = e.target.profile_picture.files[0];

    const formData = new FormData();
    formData.append("username", updatedUsername);
    formData.append("fullname", updatedFullname);
    if (file) {
      formData.append("profile", file);
    }

    fetch("/api/profile/update", {
      method: "PUT",
      credentials: "include",
      body: formData,
    })
      .then((res) => res.json())
      .then(() => {
        queryClient.invalidateQueries({ queryKey: ["authUser"] });
        queryClient.invalidateQueries({ queryKey: ["profile"] });
        document.getElementById("profile_edit_modal").close();
      })
      .catch((error) => console.error(error));
  };

  if (isLoading || isProfileLoading) {
    return <div>Loading...</div>;
  }

  if (isError || isProfileError) {
    return <div>Error: {isError.message || isProfileError.message}</div>;
  }

  return (
    <div className="flex flex-col items-center mb-6">
      <div className="avatar justify-center py-5">
        <div className="w-20 rounded-full">
          <img src={profile.profile} alt="User Profile" />
        </div>
      </div>

      <div className="text-center">
        <h3 className="text-lg text-gray-300">{fullname}</h3>

        <p className="text-sm text-gray-300">@{username}</p>
      </div>

      <button
        className="btn btn-xs sm:btn-sm md:btn-sm lg:btn-sm mt-3"
        onClick={() =>
          document.getElementById("profile_edit_modal").showModal()
        }
      >
        <AiOutlineEdit className="mr-1" />
        Edit Profile
      </button>

      <dialog id="profile_edit_modal" className="modal">
        <div className="modal-box rounded-lg p-8 bg-primary shadow-lg">
          <form method="dialog" className="relative">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>

          <form onSubmit={handleSaveChanges} className="mt-8 space-y-6">
            <h2 className="text-3xl font-bold mb-6 text-gray-200 text-center">
              Edit Profile
            </h2>

            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-400"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                defaultValue={username}
                placeholder="Enter your username"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="fullname"
                className="block text-sm font-medium text-gray-400"
              >
                Full Name
              </label>
              <input
                type="text"
                id="fullname"
                defaultValue={fullname}
                placeholder="Enter your full name"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm"
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="profile_picture"
                className="block text-sm font-medium text-gray-400"
              >
                Profile Picture
              </label>
              <input
                type="file"
                id="profile_picture"
                accept="image/*"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm"
              />
            </div>

            <button type="submit" className="btn btn-primary btn-block mt-6">
              Save Changes
            </button>
          </form>
        </div>
      </dialog>
    </div>
  );
}

export default UserProfile;
