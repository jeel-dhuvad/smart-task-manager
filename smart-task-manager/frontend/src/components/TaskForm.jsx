import { useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

function TaskForm({ fetchTasks, authHeaders }) {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const addTask = async () => {

    setError("");

    if (!title.trim()) {
      setError("Task title is required.");
      return;
    }

    setLoading(true);

    try {
      await axios.post(
        `${API_URL}/api/tasks`,
        { title, description, dueDate },
        authHeaders
      );

      setTitle("");
      setDescription("");
      setDueDate("");
      fetchTasks();

    } catch (err) {
      setError(err.response?.data?.msg || "Failed to add task.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="task-form">

      <h2>Add New Task</h2>

      {error && (
        <p style={{ color: "red", marginBottom: "8px" }}>{error}</p>
      )}

      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        disabled={loading}
        maxLength="200"
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        disabled={loading}
        maxLength="1000"
        rows="3"
        style={{ resize: "vertical" }}
      />

      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        disabled={loading}
      />

      <button 
        className="add-btn" 
        onClick={addTask}
        disabled={loading}
      >
        {loading ? "Adding..." : "Add Task"}
      </button>

    </div>
  );
}

export default TaskForm;