import {ITodoItem } from '../../../../interfaces/ITodoItem';
import './styles.css';

interface TodoItemPropsInterface {
    todoItem: ITodoItem
    handleSelectTodo: (todoItem: ITodoItem)=>void,
}

export function TodoItem(props: TodoItemPropsInterface) {

    function toggleComplete(){
        //atualizar no banco
    }

    function handleDelete(){
        //deletar no banco
    }


    return (
        <li
            key={props.todoItem.id}
            className={`todo-item list-group-item d-flex justify-content-between align-items-center ${props.todoItem.completed ? 'list-group-item-success' : ''}`}
            onClick={() => props.handleSelectTodo(props.todoItem)}
        >
            <span style={{ textDecoration: props.todoItem.completed ? 'line-through' : 'none' }}>
                {props.todoItem.text}
            </span>
            <div>
                <button
                    className={`btn btn-sm ${props.todoItem.completed ? 'btn-secondary' : 'btn-success'}`}
                    onClick={(e) => {
                        e.stopPropagation();
                        toggleComplete();
                    }}
                >
                    {props.todoItem.completed ? 'Undo' : 'Done'}
                </button>
                <button
                    className="btn btn-danger btn-sm ms-2"
                    onClick={(e) => {
                        e.stopPropagation();
                        handleDelete();
                    }}
                >
                    Delete
                </button>
            </div>
        </li>
    )
}