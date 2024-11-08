import { useState } from 'react';
import { ITodoItem } from '../../interfaces/ITodoItem';
import { TodoDetails } from './TodoItemDetails/Index';
import { TodoList } from './TodoList/Index';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../config/db';

export function Home() {
    const [selectedTodo, setSelectedTodo] = useState<ITodoItem | undefined>(undefined);
    const [inputValue, setInputValue] = useState<string>('');
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

    async function addTodo(todo: ITodoItem) {
        await addDoc(collection(db, "todos"), todo);
    }

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
                    {
                        selectedTodo ? (
                            <TodoDetails onBackToList={() => setSelectedTodo(undefined)} todoSelected={selectedTodo} />
                        ) : (
                            <TodoList setSelectedTodo={setSelectedTodo} />
                        )
                    }
                </div>
            </div>
        </div>

    )
}