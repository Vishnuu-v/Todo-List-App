import React from "react";
import { useState } from "react";
import "./App.css"

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editTaskIndex, setEditTaskIndex] = useState(-1);

  const handleTaskAddition = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask("");
    }
  };

  const handleTaskCompletion = (index) => {
    setTasks((prevTasks) => {
      const updatedTasks = [...prevTasks];
      updatedTasks[index] = {
        ...updatedTasks[index],
        completed: !updatedTasks[index].completed,
      };
      return updatedTasks;
    });
  };

  const handleTaskDeletion = (index) => {
    setTasks((prevTasks) => {
      const updatedTasks = [...prevTasks];
      updatedTasks.splice(index, 1);
      return updatedTasks;
    });
  };

  const handleTaskEditStart = (index) => {
    setEditTaskIndex(index);
  };

  const handleTaskEdit = (newValue, index) => {
    setTasks((prevTasks) => {
      const updatedTasks = [...prevTasks];
      updatedTasks[index].text = newValue;
      return updatedTasks;
    });
  };

  const handleTaskEditComplete = () => {
    setEditTaskIndex(-1);
  };

  return (
    <>
      <div className="container">
        <div className="input-container">
          <h1>Todo List</h1>

          <input
            type="text"
            placeholder="Enter a task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="task-input"
          />

          <button onClick={handleTaskAddition} className="add-task-btn" >Add Task</button>
        
        </div>

        <ul className="task-list">

          {tasks.map((task, index) => (
            <li key={index} className="task-item">
               <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleTaskCompletion(index)}
                  className="task-cheackbox"
               />
              
              {editTaskIndex === index ? (
                  <input
                    type="text"
                    value={task.text}
                    onChange={(e) => handleTaskEdit(e.target.value, index)}
                    onBlur={handleTaskEditComplete}
                    autoFocus
                    className="edit-task-input"
                  />
              ) : (
                  <>
                    <span className={`task-text ${task.completed ? "completed" : ""}`}>{task.text}</span>
                    <button onClick={() => handleTaskEditStart(index)}
                    className="edit-task-btn">
                      Edit
                    </button>
                  </>
              )}

              <button onClick={() => handleTaskDeletion(index)}
                className="delete-task-btn"
                >Delete
              </button>
            </li>

          ))}

        </ul>

      </div>
    </>

  );
}

export default App;
