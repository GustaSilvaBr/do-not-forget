import React, { useState } from 'react';

import './TodoList.css'; // Importação do CSS
import { TodoDetails } from './TodoDetails';

type TodoItem = {
    id: number;
    text: string;
    description: string;
    completed: boolean;
};

export const TodoList: React.FC = () => {
    const [todos, setTodos] = useState<TodoItem[]>([]);
    const [inputValue, setInputValue] = useState<string>('');
    const [selectedTodo, setSelectedTodo] = useState<TodoItem | null>(null);
    const [description, setDescription] = useState<string>('');

    const handleAddTodo = () => {
        if (inputValue.trim() === '') return;

        const newTodo: TodoItem = {
            id: Date.now(),
            text: inputValue,
            description: '',
            completed: false,
        };

        setTodos([...todos, newTodo]);
        setInputValue('');
    };

    const toggleComplete = (id: number) => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    };

    const handleDelete = (id: number) => {
        setTodos(todos.filter(todo => todo.id !== id));
        if (selectedTodo?.id === id) {
            setSelectedTodo(null);
            setDescription('');
        }
    };

    const handleSelectTodo = (todo: TodoItem) => {
        setSelectedTodo(todo);
        setDescription(todo.description);
    };

    const handleSaveDescription = () => {
        if (!selectedTodo) return;

        setTodos(todos.map(todo =>
            todo.id === selectedTodo.id ? { ...todo, description } : todo
        ));
        alert("Description saved!");
    };

    const handleBackToList = () => {
        setSelectedTodo(null);
    };

    return (
        <div className="d-block mt-2 ">
            <div className='row'>
                <div className="col-4">
                    <h2 className="text-start">Do Not Forget!</h2>
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Add a new task"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                        />
                        <button className="btn btn-primary" onClick={handleAddTodo}>
                            Add
                        </button>
                    </div>
                    <ul className="list-group">
                        {todos.map(todo => (
                            <li
                                key={todo.id}
                                className={`list-group-item d-flex justify-content-between align-items-center ${todo.completed ? 'list-group-item-success' : ''}`}
                                onClick={() => handleSelectTodo(todo)}
                            >
                                <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                                    {todo.text}
                                </span>
                                <div>
                                    <button
                                        className={`btn btn-sm ${todo.completed ? 'btn-secondary' : 'btn-success'}`}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleComplete(todo.id);
                                        }}
                                    >
                                        {todo.completed ? 'Undo' : 'Done'}
                                    </button>
                                    <button
                                        className="btn btn-danger btn-sm ms-2"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDelete(todo.id);
                                        }}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>

                </div>
                <div className="col-8">
                    {selectedTodo ? (
                        <TodoDetails
                        title={selectedTodo.text}
                        description={description}
                        onDescriptionChange={setDescription}
                        onSaveDescription={handleSaveDescription}
                        onBackToList={handleBackToList}
                    />
                    ) : (
                        <div className="col-12 todo-list-wrapper">
                            <p>No item selected...</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};