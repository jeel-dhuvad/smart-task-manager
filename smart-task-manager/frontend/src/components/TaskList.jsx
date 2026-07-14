import axios from "axios";
import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

function TaskList({ tasks, fetchTasks, authHeaders }) {

  const [deleting, setDeleting] = useState(null);
  const [completing, setCompleting] = useState(null);

  const deleteTask = async (id) => {
    // Show confirmation dialog
    if (!window.confirm("Are you sure you want to delete this task?")) {
      return;
    }

    setDeleting(id);
    try {
      await axios.delete(
        `${API_URL}/api/tasks/${id}`,
        authHeaders
      );
      fetchTasks();
    } catch (err) {
      alert(err.response?.data?.msg || "Failed to delete task.");
    } finally {
      setDeleting(null);
    }
  };

  const completeTask = async (task) => {
    setCompleting(task._id);
    try {
      await axios.put(
        `${API_URL}/api/tasks/${task._id}`,
        { ...task, status: "Completed" },
        authHeaders
      );
      fetchTasks();
    } catch (err) {
      alert(err.response?.data?.msg || "Failed to update task.");
    } finally {
      setCompleting(null);
    }
  };

  if (tasks.length === 0) {
    return (
      <div className="task-list">
        <p style={{ textAlign: "center", color: "#999", marginTop: "40px" }}>
          No tasks found. Create one to get started!
        </p>
      </div>
    );
  }

  return (
    <div className="task-list">
      {tasks.map(task => (
        <div key={task._id} className="task-card">

          <h3>{task.title}</h3>
          <p>{task.description}</p>

          <p>
            Due Date:{" "}
            {task.dueDate
              ? new Date(task.dueDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })
              : "N/A"}
          </p>

          <p className={task.status === "Completed" ? "status completed" : "status pending"}>
            {task.status}
          </p>

          <div className="btn-group">
            <button
              className="complete-btn"
              onClick={() => completeTask(task)}
              disabled={task.status === "Completed" || completing === task._id}
            >
              {completing === task._id ? "Completing..." : "Complete"}
            </button>

            <button
              className="delete-btn"
              onClick={() => deleteTask(task._id)}
              disabled={deleting === task._id}
            >
              {deleting === task._id ? "Deleting..." : "Delete"}
            </button>
          </div>

        </div>
      ))}
    </div>
  );
}

export default TaskList;