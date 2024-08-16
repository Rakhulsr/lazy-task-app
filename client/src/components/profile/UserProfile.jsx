import { useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";

function UserProfile() {
  const [fullName, setFullName] = useState("Budi Sedunia");
  const [username, setUsername] = useState("budi");
  const [profilePicture, setProfilePicture] = useState(
    "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
  );

  const handleSaveChanges = (e) => {
    e.preventDefault();
    const updatedFullName = e.target.fullname.value;
    const updatedUsername = e.target.username.value;
    const updatedProfilePicture = e.target.profile_picture.files[0]
      ? URL.createObjectURL(e.target.profile_picture.files[0])
      : profilePicture;

    setFullName(updatedFullName);
    setUsername(updatedUsername);
    setProfilePicture(updatedProfilePicture);

    document.getElementById("profile_edit_modal").close();
  };

  return (
    <div className="flex flex-col items-center mb-6">
      <div className="avatar justify-center py-5">
        <div className="w-20 rounded-full">
          <img src={profilePicture} alt="User Profile" />
        </div>
      </div>
      <div className="text-center">
        <h3 className="text-lg font-semibold text-white">{fullName}</h3>
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
                htmlFor="fullname"
                className="block text-sm font-medium text-gray-400"
              >
                Full Name
              </label>
              <input
                type="text"
                id="fullname"
                defaultValue={fullName}
                placeholder="Enter your full name"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm"
              />
            </div>

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
                className="file-input file-input-bordered file-input-md w-full mt-2"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="btn btn-primary px-6 py-2 rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
}

export default UserProfile;
