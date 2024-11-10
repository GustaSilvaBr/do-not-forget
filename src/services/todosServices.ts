import { doc, setDoc, deleteDoc, query, collection, onSnapshot, getDoc } from 'firebase/firestore';
import { ITodoItem } from '../interfaces/ITodoItem';
import { db } from '../config/db';

export async function updateTodoIntoDataBase(todo: ITodoItem) {
    await setDoc(doc(db, "todos", todo.id.toString()), todo);
}

export async function deleteTodoFromDataBase(id: string) {
    await deleteDoc(doc(db, "todos", id));
}

export async function addTodo(todo: ITodoItem) {
    await setDoc(doc(db, "todos", todo.id.toString()), todo);
}

export function getTodos({ setTodos }: { setTodos: (todos: ITodoItem[]) => void }) {
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
}

export async function getTodo(id: string) {
    const docRef = doc(db, "todos", id);
    const docSnap = await getDoc(docRef);
    if(docSnap.exists()){
        console.log(docSnap.data());
        return docSnap.data();
    }else{
        throw 'todo not found'
    }
   
}
