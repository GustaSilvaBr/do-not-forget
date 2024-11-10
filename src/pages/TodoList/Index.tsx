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
          
            <div className="todo-list-wrapper">
                <ul className="list-group">
                    {todos.map((todo, index) => (
                        <TodoItem key={index + todo.id} todoItem={todo} />
                    ))}
                </ul>
            </div>

            <img onClick={handleAddTodo} className='mt-4 orb' width={'auto'} height={'60px'} src={orbAnimated} alt="" />

        </div>

    );
};
