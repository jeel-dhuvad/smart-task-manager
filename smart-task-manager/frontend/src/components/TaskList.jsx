import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

function TaskList({ tasks, fetchTasks, authHeaders }) {

  const deleteTask = async (id) => {
    try {
      await axios.delete(
        `${API_URL}/api/tasks/${id}`,
        authHeaders
      );
      fetchTasks();
    } catch (err) {
      alert(err.response?.data?.msg || "Failed to delete task.");
    }
  };

  const completeTask = async (task) => {
    try {
      await axios.put(
        `${API_URL}/api/tasks/${task._id}`,
        { ...task, status: "Completed" },
        authHeaders
      );
      fetchTasks();
    } catch (err) {
      alert(err.response?.data?.msg || "Failed to update task.");
    }
  };

  return (
    <div className="task-list">
      {tasks.map(task => (
        <div key={task._id} className="task-card">

          <h3>{task.title}</h3>
          <p>{task.description}</p>

          <p>
            Due Date:{" "}
            {task.dueDate
              ? new Date(task.dueDate).toLocaleDateString()
              : "N/A"}
          </p>

          <p className={task.status === "Completed" ? "status completed" : "status pending"}>
            {task.status}
          </p>

          <div className="btn-group">
            <button
              className="complete-btn"
              onClick={() => completeTask(task)}
              disabled={task.status === "Completed"}
            >
              Complete
            </button>

            <button
              className="delete-btn"
              onClick={() => deleteTask(task._id)}
            >
              Delete
            </button>
          </div>

        </div>
      ))}
    </div>
  );
}

export default TaskList;