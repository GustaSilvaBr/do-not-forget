import { deleteTodoFromDataBase, updateTodoIntoDataBase } from '../../services/todosServices';
import { ITodoItem } from '../../interfaces/ITodoItem';
import { ArrowLeft } from '../../icons/ArrowLeft';
import { useLoaderData, useNavigate } from "react-router-dom";
import { MoreVert } from '../../icons/moreVert';
import './styles.css';
import { useState, useEffect, useRef } from 'react';

export function TodoDetails() {
  const todo = useLoaderData() as ITodoItem;
  const navigate = useNavigate();

  const [title, setTitle] = useState(todo.text);
  const [description, setDescription] = useState(todo.description);
  const [saveTimer, setSaveTimer] = useState<NodeJS.Timeout | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Menu visibility state
  const menuRef = useRef<HTMLDivElement>(null); // Reference for menu container

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

  // Debounced save function that waits for 5 seconds after the user stops typing
  function handleDebouncedSave() {
    if (saveTimer) clearTimeout(saveTimer);

    const timer = setTimeout(() => {
      saveChanges();
    }, 5000);

    setSaveTimer(timer);
  }

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    handleDebouncedSave();
  };

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
    handleDebouncedSave();
  };

  // Toggle menu visibility
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Handle Done action
  const handleDone = () => {
    updateTodoIntoDataBase({
      ...todo,
      completed:true
    }).then(() => {
      return navigate('/');
    }).catch((e) => {
      console.error(e);
    });
   
  };

  // Handle Delete action
  const handleDelete = () => {
    const resp = prompt('Are you sure?');
    if (resp && resp.toUpperCase() == 'Y') {
      deleteTodoFromDataBase(todo.id.toString()).then(() => {
        return navigate('/');
      }).catch((e) => {
        console.error(e);
      });
    }else{
      setIsMenuOpen(false);
    }    
  };

  // Close the menu if clicked outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <div className={`todo-details-wrapper ${todo.completed?('purple-background'):('')} page details-page d-flex flex-column`}>
      <div className='d-flex align-item-center justify-content-between mb-4'>
        <div className='arrow-btn' onClick={() => navigate('/')}>
          <ArrowLeft />
        </div>
        <div className="more-options-container" ref={menuRef}>
          <div className='more-options-icon' onClick={toggleMenu}>
            <MoreVert />
          </div>

          {/* Dropdown menu for More Options */}
          {isMenuOpen && (
            <div className="dropdown-menu">
              <button onClick={handleDone}>Done</button>
              <button onClick={handleDelete}>Delete</button>
            </div>
          )}
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
