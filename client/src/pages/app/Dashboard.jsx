import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import TaskCard from "../../components/TaskCard.jsx";
import { DummyTasks } from "../../components/utils/dummy.js";

function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [debounced, setDebounced] = useState("");
  const [tasks, setTasks] = useState(DummyTasks);
  // const navigate = useNavigate();

  const getAllTask = async () => {
    const response = await fetch("http://localhost:3000/tasks");
    const result = await response.json();

    const restoredTasks = result.data || [];
    if (restoredTasks.length > 0) {
      setTasks((prevTasks) => [...prevTasks, ...restoredTasks]);
      console.log("Restored tasks added to dashboard:", restoredTasks);
    }
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounced(searchQuery);
    }, 500);
    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounced(searchQuery);
    }, 500);
    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  useEffect(() => {
    getAllTask();
  }, []);

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(debounced.toLowerCase())
  );

  // const handleEdit = (taskId, newTitle, newContent) => {
  //   setTasks(
  //     tasks.map((task) =>
  //       task.id === taskId
  //         ? { ...task, title: newTitle, content: newContent }
  //         : task
  //     )
  //   );
  // };

  // const handleDelete = (taskId) => {
  //   const taskToDelete = tasks.find((task) => task.id === taskId);
  //   if (taskToDelete) {
  //     setTasks(tasks.filter((task) => task.id !== taskId));
  //     navigate("/app/trash", { state: { deletedTask: taskToDelete } });
  //     console.log("Task deleted from dashboard:", taskToDelete);
  //   }
  // };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Task Dashboard</h2>
      <div className="mb-6 flex">
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="input input-bordered w-full max-w-md mx-auto"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredTasks.map((task) => (
          <TaskCard
            key={task.id}
            id={task.id}
            title={task.title}
            content={task.content}
            status={task.status}
            // onEdit={handleEdit}
            // onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
