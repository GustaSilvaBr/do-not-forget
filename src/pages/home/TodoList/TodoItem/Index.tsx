import { updateTodoIntoDataBase } from '../../../../services/todosServices';
import { ITodoItem } from '../../../../interfaces/ITodoItem';
import { deleteTodoFromDataBase } from '../../../../services/todosServices';
import './styles.css';

interface TodoItemPropsInterface {
    todoItem: ITodoItem;
    handleSelectTodo: (todoItem: ITodoItem) => void;
}

export function TodoItem(props: TodoItemPropsInterface) {
    function toggleComplete() {
        updateTodoIntoDataBase({
            ...props.todoItem,
            completed: !props.todoItem.completed,
        }).catch(() => {
            alert("Não foi salvo");
        });
    }

    function handleDelete() {
        const response = prompt("Do you REALLY want to delete it? (y/n)");
        if (response && response.toUpperCase().trim() === "Y") {
            deleteTodoFromDataBase(props.todoItem.id.toString()).catch(() => {
                alert("Não foi salvo");
            });
        }
    }

    // Extract the first line of the description
    const firstLineOfDescription = props.todoItem.description.split('\n')[0];

    return (
        <li
            key={props.todoItem.id}
            className={`todo-item list-group-item d-flex justify-content-between align-items-center ${props.todoItem.completed ? 'list-group-item-success' : ''}`}
            onClick={() => props.handleSelectTodo(props.todoItem)}
        >
            <div className='item-info'>
                <span  className='item-title' style={{ textDecoration: props.todoItem.completed ? 'line-through' : 'none' }}>
                    {props.todoItem.text}
                </span>
                <div className="todo-item-description">
                    {firstLineOfDescription}
                </div>
            </div>
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
    );
}
