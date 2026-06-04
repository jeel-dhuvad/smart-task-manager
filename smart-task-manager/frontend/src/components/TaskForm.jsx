import { useState } from "react";
import axios from "axios";

function TaskForm({ fetchTasks }) {

  const [title, setTitle] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [dueDate, setDueDate] =
    useState("");

  const addTask = async () => {

    try {

      await axios.post(
        "http://localhost:5000/api/tasks",
        {
          title,
          description,
          dueDate
        }
      );

      setTitle("");
      setDescription("");
      setDueDate("");

      fetchTasks();

    } catch (error) {

      console.log(error);

    }
  };

  return (

   
  <div className="task-form">

    <h2>Add New Task</h2>

    <input
      type="text"
      placeholder="Task Title"
      value={title}
      onChange={(e)=>setTitle(e.target.value)}
    />

    <input
      type="text"
      placeholder="Description"
      value={description}
      onChange={(e)=>setDescription(e.target.value)}
    />

    <input
      type="date"
      value={dueDate}
      onChange={(e)=>setDueDate(e.target.value)}
    />

    <button
      className="add-btn"
      onClick={addTask}
    >
      Add Task
    </button>

  </div>
);
  
}

export default TaskForm;