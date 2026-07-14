import { useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

function TaskForm({ fetchTasks, authHeaders }) {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [error, setError] = useState("");

  const addTask = async () => {

    setError("");

    if (!title.trim()) {
      setError("Task title is required.");
      return;
    }

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
      />

      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />

      <button className="add-btn" onClick={addTask}>
        Add Task
      </button>

    </div>
  );
}

export default TaskForm;