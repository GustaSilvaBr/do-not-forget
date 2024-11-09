import { doc, setDoc, deleteDoc } from 'firebase/firestore';
import {ITodoItem} from '../interfaces/ITodoItem';
import { db } from '../config/db';

export async function updateTodoIntoDataBase(todo: ITodoItem) {
    await setDoc(doc(db, "todos", todo.id.toString()), todo);
}

export async function deleteTodoFromDataBase(id: string){
    await deleteDoc(doc(db, "todos", id));
}   

