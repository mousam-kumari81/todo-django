import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Todo = () => {
    const [todos, setTodos] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        const response = await axios.get('http://127.0.0.1:8000/api/todos/');
        setTodos(response.data);
    };

    const addTodo = async () => {
        const response = await axios.post('http://127.0.0.1:8000/api/todos/', {
            title,
            description,
            completed: false,
        });
        setTodos([...todos, response.data]);
        setTitle('');
        setDescription('');
    };

    const deleteTodo = async (id) => {
        await axios.delete(`http://127.0.0.1:8000/api/todos/${id}/`);
        setTodos(todos.filter(todo => todo.id !== id));
    };

    return (
        <div>
            <h1>Todo App</h1>
            <div>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <button onClick={addTodo}>Add Todo</button>
            </div>
            <ul>
                {todos.map(todo => (
                    <li key={todo.id}>
                        <strong>{todo.title}</strong>: {todo.description}
                        <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Todo;