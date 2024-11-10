import {  useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom'
import './styles.css'; 

import { ITodoItem } from '../../interfaces/ITodoItem';
import { TodoItem } from './TodoItem/Index';
import {addTodo, getTodos} from '../../services/todosServices'
import orbAnimated from '../../assets/orb.gif';

export function TodoList() {
    const [todos, setTodos] = useState<ITodoItem[]>([]);
    const navigate = useNavigate();
    useEffect(()=>{
        return getTodos({setTodos});
    },[]);

    const handleAddTodo = () => {
        const newTodo: ITodoItem = {
            id: Date.now(),
            text: '',
            description: '',
            completed: false,
        };
        addTodo(newTodo);
        return navigate(`/todos/${newTodo.id}`)
    };



    return (
        <div className='todo-list-page page'>
            <img onClick={handleAddTodo} className='mb-4 orb' width={'auto'} height={'55px'} src={orbAnimated} alt="" />
            {/* <h2 className="text-start text-secondary">Do Not Forget!</h2>
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
            </div> */}
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
