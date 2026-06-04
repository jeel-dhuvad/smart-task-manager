import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

import "../styles/Dashboard.css";

function Dashboard() {

  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");

  const fetchTasks = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/tasks"
      );

      setTasks(res.data);

    } catch (error) {

      console.log(error);

    }
  };

  useEffect(() => {

    fetchTasks();

  }, []);

  const completedTasks =
    tasks.filter(
      (task) => task.status === "Completed"
    ).length;

  const pendingTasks =
    tasks.length - completedTasks;

  const filteredTasks =
    tasks.filter((task) =>
      task.title
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  return (

    <div className="dashboard">

      <Navbar />

      <h1>Dashboard</h1>

      <div className="stats">

        <div className="card">
          <h3>Total Tasks</h3>
          <p>{tasks.length}</p>
        </div>

        <div className="card">
          <h3>Completed</h3>
          <p>{completedTasks}</p>
        </div>

        <div className="card">
          <h3>Pending</h3>
          <p>{pendingTasks}</p>
        </div>

      </div>

      <div style={{ marginBottom: "20px" }}>

        <input
          type="text"
          placeholder="Search Tasks..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          style={{
            padding: "10px",
            width: "300px",
            borderRadius: "5px",
            border: "1px solid gray"
          }}
        />

      </div>

      <TaskForm fetchTasks={fetchTasks} />

      <hr />

      <TaskList
        tasks={filteredTasks}
        fetchTasks={fetchTasks}
      />

    </div>

  );

}

export default Dashboard;