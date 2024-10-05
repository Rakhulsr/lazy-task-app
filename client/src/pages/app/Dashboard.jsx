import { useState, useEffect } from "react";
import TaskCard from "../../components/TaskCard.jsx";
import { useQuery } from "@tanstack/react-query";
import { Navigate } from "react-router-dom";
function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [debounced, setDebounced] = useState("");
  const [tasks, setTasks] = useState([]);

  const [isCreateTaskOpen, setIsCreateTaskOpen] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskContent, setNewTaskContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { data: authUser } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/auth/me", { credentials: "include" });
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      } catch (error) {
        console.error(error);
        return null;
      }
    },
  });

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("/api/tasks");
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  const handleCreateTaskOpen = () => {
    setIsCreateTaskOpen(!isCreateTaskOpen);
  };

  const handleCreateTask = async () => {
    try {
      const response = await fetch("/api/tasks/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newTaskTitle,
          content: newTaskContent,
        }),
      });
      const data = await response.json();
      setTasks([data.task, ...tasks]);
      setNewTaskTitle("");
      setNewTaskContent("");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleEdit = async (id, newTitle, newContent) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/tasks/update/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTitle, content: newContent }),
      });
      const updatedTask = await response.json();

      const tasksResponse = await fetch("/api/tasks");
      const tasksData = await tasksResponse.json();

      setTasks([updatedTask, ...tasksData]);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/tasks/delete/${id}`, {
        method: "POST",
      });
      await response.json();
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error(error);
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

  const filteredTasks = tasks.filter((task) => {
    if (task && task.title) {
      return task.title.toLowerCase().includes(debounced.toLowerCase());
    }
    return false;
  });

  if (!authUser) {
    return <Navigate to="/login" />;
  }
  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Task Dashboard</h2>
      <div className="mb-6 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="input input-bordered w-full max-w-md"
        />
        <button onClick={handleCreateTaskOpen} className="btn btn-primary ml-4">
          {isCreateTaskOpen ? "Close" : "New Task"}
        </button>
      </div>
      {isCreateTaskOpen && (
        <div className="mb-6 p-6 border rounded-lg shadow-sm bg-white">
          <h3 className="text-lg font-semibold mb-4">Create New Task</h3>
          <input
            type="text"
            placeholder="Task Title"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            className="input input-bordered w-full mb-4"
          />
          <textarea
            placeholder="Task Content"
            value={newTaskContent}
            onChange={(e) => setNewTaskContent(e.target.value)}
            rows="5"
            className="textarea textarea-bordered w-full"
          />
          <div className="mt-4 flex justify-end">
            <button
              onClick={handleCreateTask}
              className="btn btn-primary"
              disabled={!newTaskTitle || !newTaskContent}
            >
              Add Task
            </button>
          </div>
        </div>
      )}
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              id={task.id}
              title={task.title}
              content={task.content}
              status={task.status}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <p className="text-center col-span-full">No tasks found.</p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
