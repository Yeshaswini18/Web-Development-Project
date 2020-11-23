import React from 'react';
import { useState } from 'react';
import { fetchDeleteTask, fetchUpdateTask } from './services';
import './App.css'

function DisplayTasks({tasks, userInfo, performReadAll}) {
    const [newTask, setNewTask] = useState('');
    const [id, setId] = useState(''); // identifier needed to match with taskId condition for onChange
    const [error, setError] = useState();

    const performDelete = (taskId) => {        
        fetchDeleteTask(userInfo, taskId)
        .then(() => performReadAll())
        .catch((error) => setError(error.message))
    }

    const performUpdateTask = (taskId, status) => {       
        fetchUpdateTask(userInfo, taskId, {done:status, name: newTask})
        .then(() => performReadAll())
        .catch((error) => setError(error.message))
        
        setId('');
        setNewTask('');
    }

    const performUpdateStatus = (taskId, status, name) => {       
        fetchUpdateTask(userInfo, taskId, {done: !status, name: name})
        .then(() => performReadAll())
        .catch((error) => setError(error.message))
    }

    const performEditTask = (taskId, e) => {
        setId(taskId);
        setNewTask(e.target.value);
    }

    return (
        Object.keys(tasks).map((taskId) => (
        <div className="task" key={taskId}><h2 className="error">{error}</h2>
            <p><span className="delete" onClick={() => performDelete(taskId)}>X</span>
            <input id={taskId} type="task-text" class={tasks[taskId].done ? "mark-done" : "done"} name="task-field" value={taskId === id ? newTask : tasks[taskId].name } onChange={(e) => {performEditTask(taskId, e)}}/>
            <button class="update" type="button" onClick={() => performUpdateTask(taskId, tasks[taskId].done)}>Update</button>
            <button class="done-button" type="button" onClick={() => performUpdateStatus(taskId, tasks[taskId].done, tasks[taskId].name)}>{tasks[taskId].done ? 'Done': 'MarkDone'}</button>
            </p></div>
        ))
    );

}

export default DisplayTasks;
