import { updateTodoIntoDataBase } from '../../services/todosServices';
import { ITodoItem } from '../../interfaces/ITodoItem';
import { ArrowLeft } from '../../icons/ArrowLeft';
import { useLoaderData, useNavigate } from "react-router-dom";
import { MoreVert } from '../../icons/moreVert';
import './styles.css';
import { useEffect, useState } from 'react';

export function TodoDetails() {
  const todo = useLoaderData() as ITodoItem;
  const navigate = useNavigate();
  
  const [title, setTitle] = useState(todo.text);
  const [description, setDescription] = useState(todo.description);
  const [saveTimer, setSaveTimer] = useState<NodeJS.Timeout | null>(null);

  // Function to save to the database
  function saveChanges() {
    const todoToSave = {
      ...todo,
      text: title,
      description,
    };

    updateTodoIntoDataBase(todoToSave)
      .catch(() => {
        alert("Changes were not saved.");
      });
  }

  // Debounced save function that waits for 3 seconds after the user stops typing
  function handleDebouncedSave() {
    if (saveTimer) clearTimeout(saveTimer); // Clear previous timer if still active

    const timer = setTimeout(() => {
      saveChanges();
    }, 5000); // 3-second delay

    setSaveTimer(timer); // Set new timer
  }

  // Update title with debounce
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    handleDebouncedSave();
  };

  // Update description with debounce
  const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
    handleDebouncedSave();
  };

  return (
    <div className="todo-details-wrapper page details-page d-flex flex-column">
      <div className='d-flex align-item-center justify-content-between mb-4'>
        <div className='arrow-btn' onClick={() => navigate('/')}>
          <ArrowLeft />
        </div>
        <div>
          <MoreVert/>
        </div>
      </div>

      <input 
        placeholder='Your task title...' 
        className='details-title mb-2' 
        type="text" 
        value={title} 
        onChange={handleTitleChange} 
      />
      
      <span className='date mb-4'>Janeiro, 24 8am</span>

      <textarea
        id={`desc-id-${todo.id}`}
        className="detail-desc mt-3"
        rows={10}
        cols={30}
        placeholder="Add a detailed description..."
        value={description}
        onChange={handleDescriptionChange}
      ></textarea>
    </div>
  );
}
