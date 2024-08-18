// import { useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AiOutlineDelete, AiOutlineRollback } from "react-icons/ai";

function Trash() {
  const queryClient = useQueryClient();

  const {
    data: tasks = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["trashedTasks"],
    queryFn: async () => {
      const response = await fetch("/api/tasks/trash", {
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch trashed tasks");
      }
      return response.json();
    },
  });

  const restoreTaskMutation = useMutation({
    mutationFn: async (taskId) => {
      const response = await fetch(`/api/tasks/trash/restore/${taskId}`, {
        method: "PUT",
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Failed to restore task");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["trashedTasks"]);
    },
  });

  const permanentDeleteMutation = useMutation({
    mutationFn: async (taskId) => {
      const response = await fetch(
        `/api/tasks/trash/permanent-delete/${taskId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to permanently delete task");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["trashedTasks"]);
    },
  });

  const handleRestore = (taskId) => {
    restoreTaskMutation.mutate(taskId);
  };

  const handlePermanentDelete = (taskId) => {
    permanentDeleteMutation.mutate(taskId);
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching trashed tasks</p>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold text-gray-400 mb-6">Trash</h2>

      {tasks.length === 0 ? (
        <p className="text-gray-500 text-center">No tasks in the trash bin.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="p-4 border border-gray-200 rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-300"
            >
              <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-1 break-words">
                {task.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2 break-words">
                {task.content}
              </p>
              <div className="flex justify-between items-center">
                <button
                  onClick={() => handleRestore(task.id)}
                  className="flex items-center text-green-500 hover:text-green-600 transition-colors duration-200"
                  disabled={restoreTaskMutation.isLoading}
                >
                  <AiOutlineRollback className="h-5 w-5 mr-1" />
                  <span>Restore</span>
                </button>
                <button
                  onClick={() => handlePermanentDelete(task.id)}
                  className="flex items-center text-red-500 hover:text-red-600 transition-colors duration-200"
                  disabled={permanentDeleteMutation.isLoading}
                >
                  <AiOutlineDelete className="h-5 w-5 mr-1" />
                  <span>Delete</span>
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
