import React, { useState } from "react";

function ToDoList() {
    const [tasks, setTasks] = useState(
        JSON.parse(localStorage.getItem("tasks")) || ["Eat breakfast", "Walk the dog", "Take a shower", "Go to work"],
    );
    const [newTask, setNewTask] = useState("");

    function handleTaskChange(e) {
        setNewTask(e.target.value);
    }

    function handleAddTask() {
        if (newTask.trim() !== "") {
            setTasks((t) => [...t, newTask]);
            setNewTask("");
            localStorage.setItem("tasks", JSON.stringify(tasks));
        }
    }

    function handleRemoveTask(index) {
        setTasks((t) => t.filter((_, i) => i !== index));
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function handleMoveTaskUp(index) {
        if (index > 0) {
            const updateTasks = [...tasks];
            // const movedItem = updateTasks.splice(index, 1)[0];
            // // console.log(movedItem);
            // updateTasks.splice(index - 1, 0, movedItem);

            [updateTasks[index], updateTasks[index - 1]] = [updateTasks[index - 1], updateTasks[index]];

            setTasks([...updateTasks]);
        }
    }
    function handleMoveTaskDown(index) {
        if (index < tasks.length - 1) {
            const updateTasks = [...tasks];
            const movedItem = updateTasks.splice(index, 1)[0];
            // console.log(movedItem);
            updateTasks.splice(index + 1, 0, movedItem);

            setTasks([...updateTasks]);
        }
    }

    return (
        <div className="container">
            <h1 className="title">To-Do-List</h1>
            <div className="input-container">
                <input value={newTask} onChange={handleTaskChange} placeholder="Enter a task..." />
                <button onClick={handleAddTask}>Add</button>
            </div>
            <main>
                <ul>
                    {tasks.length === 0 ? (
                        <li>
                            <h2>Aucun task</h2>
                        </li>
                    ) : (
                        tasks.map((task, index) => (
                            <li key={index}>
                                <h2>{task}</h2>
                                <div className="btn-container">
                                    <button className="btn" onClick={() => handleRemoveTask(index)}>
                                        Delete
                                    </button>

                                    <button className={index == 0 ? "btnDisabled" : "btn"} onClick={() => handleMoveTaskUp(index)}>
                                        ☝️
                                    </button>
                                    <button
                                        className={index == tasks.length - 1 ? "btnDisabled" : "btn"}
                                        onClick={() => handleMoveTaskDown(index)}>
                                        👇
                                    </button>
                                </div>
                            </li>
                        ))
                    )}
                </ul>
            </main>
        </div>
    );
}

export default ToDoList;
