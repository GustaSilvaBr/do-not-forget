import React from 'react';

type TodoDetailsProps = {
  title: string;
  description: string;
  onDescriptionChange: (description: string) => void;
  onSaveDescription: () => void;
  onBackToList: () => void; // Nova prop para o botão de "Voltar"
};

export const TodoDetails: React.FC<TodoDetailsProps> = ({ title, description, onDescriptionChange, onSaveDescription, onBackToList }) => {
  return (
    <div className="todo-details-wrapper">
      <h4>{title}</h4>
      <textarea
        className="form-control mt-3"
        rows={20}
        cols={30}
        placeholder="Add a detailed description..."
        value={description}
        onChange={(e) => onDescriptionChange(e.target.value)}
      ></textarea>
      <button
        className="btn btn-primary mt-3"
        onClick={onSaveDescription}
      >
        Save Description
      </button>
    </div>
  );
};
