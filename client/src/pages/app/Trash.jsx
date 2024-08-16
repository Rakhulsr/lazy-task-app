import { useState } from "react";
import { useLocation } from "react-router-dom";
import { AiOutlineDelete, AiOutlineRollback } from "react-icons/ai";

function Trash() {
  const location = useLocation();
  const [deletedTask, setDeletedTask] = useState(
    location.state?.deletedTask ? [location.state.deletedTask] : []
  );

  const [tasks, setTasks] = useState([]);

  const handleRestore = (taskId) => {
    const taskToRecover = deletedTask.find((task) => task.id === taskId);
    if (taskToRecover) {
      setTasks((prevTasks) => [...prevTasks, taskToRecover]);
      setDeletedTask((prevDeletedTasks) => {
        const updatedDeletedTasks = prevDeletedTasks.filter(
          (task) => task.id !== taskId
        );
        console.log("Deleted tasks after restore:", updatedDeletedTasks);
        return updatedDeletedTasks;
      });

      localStorage.setItem("restoredTasks", JSON.stringify([taskToRecover]));
      console.log("Restored task:", taskToRecover);
    }
  };

  const handlePermanentDelete = (taskId) => {
    setDeletedTask((prevDeletedTasks) => {
      const updatedDeletedTasks = prevDeletedTasks.filter(
        (task) => task.id !== taskId
      );
      console.log("Deleted tasks after permanent delete:", updatedDeletedTasks);
      return updatedDeletedTasks;
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Trash</h2>

      {deletedTask.length === 0 ? (
        <p className="text-gray-500">No task in trash container</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {deletedTask.map((task) => (
            <div
              key={task.id}
              className="p-4 border rounded-lg shadow-md bg-white"
            >
              <h3 className="text-lg font-bold">{task.title}</h3>
              <p className="text-gray-600 line-clamp-2">{task.content}</p>
              <div className="mt-4 flex justify-between items-center">
                <button
                  onClick={() => handleRestore(task.id)}
                  className="text-green-500 hover:text-green-700 transition"
                >
                  <AiOutlineRollback className="h-5 w-5" /> Restore
                </button>
                <button
                  onClick={() => handlePermanentDelete(task.id)}
                  className="text-red-500 hover:text-red-700 transition"
                >
                  <AiOutlineDelete className="h-5 w-5" /> Delete Permanently
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Trash;
