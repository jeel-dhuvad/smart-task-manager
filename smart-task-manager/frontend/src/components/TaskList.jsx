import axios from "axios";

function TaskList({
  tasks,
  fetchTasks
}) {

  const deleteTask =
    async (id) => {

      await axios.delete(
        `http://localhost:5000/api/tasks/${id}`
      );

      fetchTasks();
    };

  const completeTask =
    async (task) => {

      await axios.put(
        `http://localhost:5000/api/tasks/${task._id}`,
        {
          ...task,
          status: "Completed"
        }
      );

      fetchTasks();
    };

  return (

    

  <div className="task-list">

    {tasks.map(task => (

      <div
        key={task._id}
        className="task-card"
      >

        <h3>{task.title}</h3>

        <p>{task.description}</p>

        <p>
          Due Date:
          {" "}
          {
            task.dueDate
            ?
            new Date(task.dueDate)
            .toLocaleDateString()
            :
            "N/A"
          }
        </p>

        <p
          className={
            task.status === "Completed"
            ?
            "status completed"
            :
            "status pending"
          }
        >
          {task.status}
        </p>

        <div className="btn-group">

          <button
            className="complete-btn"
            onClick={() =>
              completeTask(task)
            }
          >
            Complete
          </button>

          <button
            className="delete-btn"
            onClick={() =>
              deleteTask(task._id)
            }
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