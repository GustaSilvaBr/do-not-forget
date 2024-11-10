import { updateTodoIntoDataBase } from '../../services/todosServices';
import { ITodoItem } from '../../interfaces/ITodoItem';
import { ArrowLeft } from '../../icons/ArrowLeft';
import { useLoaderData, useNavigate } from "react-router-dom";
import './styles.css';
import { MoreVert } from '../../icons/moreVert';

export function TodoDetails() {
  const todo = useLoaderData() as ITodoItem;
  const navigate = useNavigate();
  function handleSaveDescription() {
    const newDesc = (document.getElementById(`desc-id-${todo.id}`) as HTMLTextAreaElement).value

    const todoToSave = {
      ...todo,
      description: newDesc,
    }

    updateTodoIntoDataBase(todoToSave).then(() => {
      //props.onBackToList();
      return navigate('/');

      //return to main page
    }).catch(() => {
      alert("Não foi salvo");
    });
  }

  return (
    <div className="todo-details-wrapper page details-page d-flex flex-column">
      <div className='d-flex align-item-center justify-content-between mb-4'>
        <div className='arrow-btn' onClick={() => { return navigate('/'); }}>
          <ArrowLeft />
        </div>
        <div>
          <MoreVert/>
        </div>
      </div>

      <input className='details-title mb-2' type="text" defaultValue={todo.text} />
      <span className='date mb-4'>
        Janeiro, 24 8am
      </span>
      <textarea
        id={`desc-id-${todo.id}`}
        className="detail-desc mt-3"
        rows={100}
        cols={30}
        placeholder="Add a detailed description..."
        defaultValue={todo.description}

      ></textarea>
  

    </div>
  );
}
