import { useState } from "react";
import { AiOutlineEdit, AiOutlineDelete, AiOutlineEye } from "react-icons/ai";

function TaskCard({ id, title, content, status, onEdit, onDelete }) {
  const [isCompleted, setIsCompleted] = useState(status === "Completed");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [editContent, setEditContent] = useState(content);

  const handleCheckboxChange = async () => {
    const newStatus = isCompleted ? "In Progress" : "Completed";
    try {
      await fetch(`/api/tasks/update/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      setIsCompleted(!isCompleted);
    } catch (error) {
      console.error("Failed to update task status:", error);
    }
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const toggleEditModal = () => {
    setIsEditModalOpen(!isEditModalOpen);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    onEdit(id, editTitle, editContent);
    toggleEditModal();
  };

  return (
    <>
      <div
        className={`p-4 border rounded-lg shadow-md ${
          isCompleted ? "bg-green-100" : "bg-white"
        } overflow-hidden whitespace-nowrap`}
      >
        <div className="flex justify-between items-start p-2">
          <div className="line-clamp-2">
            <h3 className="text-lg font-bold text-gray-800 line-clamp-2">
              {title}
            </h3>
            <p className="text-gray-600 line-clamp-2">{content} </p>
          </div>
          <input
            type="checkbox"
            checked={isCompleted}
            onChange={handleCheckboxChange}
            className="max-h-md max-w-md "
          />
        </div>

        <div className="mt-4 flex justify-between items-center">
          <span
            className={`text-sm font-semibold ${
              isCompleted ? "text-green-600" : "text-yellow-600"
            }`}
          >
            {isCompleted ? "Completed" : "In Progress"}
          </span>

          <div className="flex space-x-2">
            <button
              onClick={toggleModal}
              className="text-gray-500 hover:text-gray-700 transition"
            >
              <AiOutlineEye className="h-5 w-5" />
            </button>
            <button
              onClick={toggleEditModal}
              className="text-blue-500 hover:text-blue-700 transition"
            >
              <AiOutlineEdit className="h-5 w-5" />
            </button>
            <button
              onClick={() => onDelete(id)}
              className="text-red-500 hover:text-red-700 transition"
            >
              <AiOutlineDelete className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-40 z-50 overflow-y-auto"
          style={{ maxHeight: "100vh", overflowY: "auto" }}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full relative"
            style={{ maxWidth: "400px", width: "100%" }}
          >
            <button
              onClick={toggleModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
            <h3 className="text-lg font-bold mb-4 break-words text-black">
              {title}
            </h3>
            <p
              className="text-gray-700 break-words whitespace-pre"
              style={{ maxHeight: "300px", overflowY: "auto" }}
            >
              {content}
            </p>
            <div className="mt-4 flex justify-end">
              <button onClick={toggleModal} className="btn btn-primary">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {isEditModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
            <button
              onClick={toggleEditModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
            <h3 className="text-lg font-bold mb-4">Edit Task</h3>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="edit-title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Title
                </label>
                <input
                  id="edit-title"
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm py-3"
                />
              </div>

              <div>
                <label
                  htmlFor="edit-content"
                  className="block text-sm font-medium text-gray-700"
                >
                  Content
                </label>
                <textarea
                  id="edit-content"
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  rows="6"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div className="mt-4 flex justify-end">
                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default TaskCard;
