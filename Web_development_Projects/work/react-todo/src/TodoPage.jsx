import React from 'react';
import { useState } from 'react';
import { fetchGetTasks, fetchDeleteTasks, fetchAddTask } from './services';
import DisplayTasks from './DisplayTasks';
import './App.css';

function TodoPage({userInfo}) {
    const [task, setTask] = useState();
    const [error, setError] = useState();
    const [tasks, setTasks] = useState({});
    const [value, setValue] = useState();

    const performAddTask = () => {   
        if (typeof task === 'undefined' || /^ *$/.test(task)) {
            setError("Enter a valid task");
            setTask("");
        } else {
            setError('');

            fetchAddTask(userInfo, {done: false, name: task})
            .then(() => performReadAll())
            .catch((error) => setError(error.message))
            setTask('');
        }
    }

    const performReadAll = () => {
        setError('');

        fetchGetTasks(userInfo)
        .then((tasks) => setTasks(tasks.data))
        .catch((error) => setError(error.message))
    }

    const performRefresh = () => {
        setError('');

        fetchGetTasks(userInfo)
        .then((tasks) => sort(tasks, value))
        .then((result) => setTasks(result))
        .catch((error) => setError(error.message))
    }

    const performDeleteAll = () => {    
        setError('');

        fetchDeleteTasks(userInfo)
        .then(() => performReadAll())
        .catch((error) => setError(error.message))
    }

    const performSort = (value) => {
        setError('');
        setValue(value);

        fetchGetTasks(userInfo)
        .then((tasks) => sort(tasks, value))
        .then((result) => setTasks(result))
        .catch((error) => setError(error.message))
    }

    const sort = (tasks, value) => {
        const result = {};

        if (value === "ascending") {
            const sorted = Object.values(tasks.data).sort((a,b) => (a.name > b.name ? 1 : -1));
            sorted.forEach(val => (result[val.taskId] = val));
        } else if (value === "descending") {
            const sorted = Object.values(tasks.data).sort((a,b) => (a.name > b.name ? -1 : 1));
            sorted.forEach(val => (result[val.taskId] = val));
        } else if (value === "Completed-tasks") {
            const sorted = Object.values(tasks.data).sort((a,b) => (a.done === b.done)? 0 : a.done ? -1 : 1);
            sorted.forEach(val => (result[val.taskId] = val));
        } else if (value === "Incomplete-tasks"){
            const sorted = Object.values(tasks.data).sort((a,b) => (a.done === b.done)? 0 : a.done ? 1 : -1);
            sorted.forEach(val => (result[val.taskId] = val));
        } else {
            return tasks.data;
        }
        return result;
    }

    return(
        <div>
            <h2 className="error">{error}</h2>
            <button className="delete-all" onClick={() => performDeleteAll()}>DeleteAll</button>
            <button className="refresh-button" onClick={() => performRefresh()}>Refresh</button>
            <label>Enter Task<input class="add-task" value={task} onChange={(e) => setTask(e.target.value)}/></label>
            <button type="button" class="to-add" onClick={() => performAddTask()}>Add</button>
            <span className="sorting">
                <label for="tasks">Sort:</label>
                <select name="theme" id="themes" onChange={(e) => {setValue(e.target.value); performSort(e.target.value)}}>
                <option value="select-order">select-order</option>
                <option value="ascending">ascending</option>
                <option value="descending">descending</option>
                <option value="Completed-tasks">Completed-tasks</option>
                <option value="Incomplete-tasks">Incomplete-tasks</option>
                </select>
            </span>
            <DisplayTasks tasks={tasks} userInfo={userInfo} performReadAll={() => performReadAll()}/>
        </div>
    );
}

export default TodoPage;
