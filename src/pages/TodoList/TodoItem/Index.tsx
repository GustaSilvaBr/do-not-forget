import { ITodoItem } from '../../../interfaces/ITodoItem';
import './styles.css';
import { Link } from 'react-router-dom';

interface TodoItemPropsInterface {
    todoItem: ITodoItem;
}

export function TodoItem(props: TodoItemPropsInterface) {

    const firstLineOfDescription = props.todoItem.description.split('\n')[0];

    return (
        <li
            key={props.todoItem.id}
            className={`todo-item ${props.todoItem.completed ? 'list-group-item-success' : ''}`}
        >
            <Link to={`/todos/${props.todoItem.id}`}>
                <span className='item-title' style={{ textDecoration: props.todoItem.completed ? 'line-through' : 'none' }}>
                    {props.todoItem.text}
                </span>
                <div className="todo-item-description">
                    {firstLineOfDescription}
                </div>
                <div className="date">
                    Janeiro 45, 2029
                </div>
            </Link>

        </li>
    );
}
