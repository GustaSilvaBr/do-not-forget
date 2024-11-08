import { db } from '../../../config/db';
import { doc, setDoc } from 'firebase/firestore';
import { ITodoItem } from '../../../interfaces/ITodoItem';

interface TodoDetailsProps {
  todoSelected: ITodoItem
  onBackToList: () => void; // Nova prop para o botão de "Voltar"
};


export function TodoDetails(props: TodoDetailsProps) {

  function handleSaveDescription() {
    //save into database
    updateTodoIntoDataBase().then(() => {
      props.onBackToList();
    }).catch(() => {
      alert("Não foi salvo");
    });
    //comeback

  }


  async function updateTodoIntoDataBase() {
    const newDesc = (document.getElementById(`desc-id-${props.todoSelected.id}`) as HTMLTextAreaElement).value
    await setDoc(doc(db, "todos", props.todoSelected.id.toString()), {
      ...props.todoSelected,
      description: newDesc,
    });
  }


  return (
    <div className="todo-details-wrapper ">
      <div className='d-flex justify-content-start align-items-bottom gap-4'>
        <button onClick={props.onBackToList} className='btn btn-sm btn-outline-secondary'>
          back
        </button>
        <h4 style={{ margin: "0px" }}>{props.todoSelected.text}</h4>
      </div>

      <textarea
        id={`desc-id-${props.todoSelected.id}`}
        className="form-control mt-3"
        rows={10}
        cols={30}
        placeholder="Add a detailed description..."
        defaultValue={props.todoSelected.description}

      ></textarea>
      <div className='d-flex justify-content-start align-item-center'>
        <button
          className="btn btn-primary mt-3"
          onClick={handleSaveDescription}
        >
          Save Description
        </button>
      </div>

    </div>
  );
}
