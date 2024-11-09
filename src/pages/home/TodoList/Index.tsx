import { useEffect, useState } from 'react';
import './styles.css'; // Importação do CSS
import { db } from '../../../config/db';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { ITodoItem } from '../../../interfaces/ITodoItem';
import { TodoItem } from './TodoItem/Index';



export function TodoList(props: { setSelectedTodo: (selectedTodo: ITodoItem) => void }) {
    const [todos, setTodos] = useState<ITodoItem[]>([]);

    useEffect(() => {
        try {
            const q = query(collection(db, "todos"));
            return onSnapshot(q, (querySnapshot) => {
                const todosFromDB: ITodoItem[] = [];
                querySnapshot.forEach((doc) => {
                    todosFromDB.push(doc.data() as ITodoItem);
                });
                setTodos(todosFromDB);
            });
        } catch (err) {
            console.error(err);
        }
    }, []);

    return (

        <ul className="list-group">
            {todos.map((todo, index) => (
                <TodoItem key={index + todo.id} todoItem={todo} handleSelectTodo={props.setSelectedTodo} />
            ))}
        </ul>
    );
};
