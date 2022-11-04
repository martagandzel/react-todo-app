import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './index.css';


function TodoApp() {

    const [taskInputValue, setTaskInputValue] = useState('');
    const [todoList, setTodoList] = useState([]);


    useEffect(() => {
        const todoList = JSON.parse(localStorage.getItem('todoList')) ?? [];
        setTodoList(todoList);
    }, [])

    const addTask = event => {
        event.preventDefault();
        const newTodo = {
            id: uuidv4(),
            title: taskInputValue,
        }
        const newTodoList = todoList.concat(newTodo);
        setTodoList(newTodoList);
        localStorage.setItem('todoList', JSON.stringify(newTodoList));
        setTaskInputValue('')
    }

    const readInputValue = event => {
        setTaskInputValue(event.target.value);
    }

    const handleDone = (event) => {
        event.target.classList.toggle('done');
    }

    const handleDelete = () => {
        setTodoList([]);
        localStorage.clear();
    }

    return (
        <section className="todoApp">
            <h1>Organize your day</h1>
            <form onSubmit={addTask}>
                <label htmlFor="task">
                    Add a task:
                    <input
                        type="text"
                        placeholder="type your task"
                        value={taskInputValue}
                        onChange={readInputValue}
                        required
                    />
                </label>
            </form>
            <p>Things to do:</p>
            <ol className="task-list">
                {todoList.map(todo => {
                    return (
                        <li
                            key={todo.id}
                        >
                            <span
                                onClick={handleDone}
                            >{todo.title}</span>
                        </li>
                    )
                })}
            </ol>
            <button
                onClick={handleDelete}
            >Delete all tasks
                <span
                    className="material-symbols-outlined"
                >delete</span>
            </button>
        </section>
    )
}

export default TodoApp;