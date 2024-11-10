import {  useEffect, useState } from 'react';
import './styles.css'; 

import { ITodoItem } from '../../interfaces/ITodoItem';
import { TodoItem } from './TodoItem/Index';
import {addTodo, getTodos} from '../../services/todosServices'

export function TodoList() {
    const [todos, setTodos] = useState<ITodoItem[]>([]);
    const [inputValue, setInputValue] = useState<string>('');

    useEffect(()=>{
        return getTodos({setTodos});
    },[]);

    const handleAddTodo = () => {
        if (inputValue.trim() === '') return;

        const newTodo: ITodoItem = {
            id: Date.now(),
            text: inputValue,
            description: '',
            completed: false,
        };
        addTodo(newTodo);
        setInputValue('');
    };


    return (
        <div className='todo-list-page page'>
            <h2 className="text-start text-secondary">Do Not Forget!</h2>
            <div className="input-group mb-5">
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
            <div className="todo-list-wrapper">
                <ul className="list-group">
                    {todos.map((todo, index) => (
                        <TodoItem key={index + todo.id} todoItem={todo} />
                    ))}
                </ul>
            </div>
        </div>

    );
};
