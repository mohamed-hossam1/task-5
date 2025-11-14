import React, { useState } from "react";

interface TodoItem {
  taskText: string;
  id: number;
}


interface TaskProps {
  item: TodoItem;
  removeTask: (id: number) => void;
  updateTask: (id: number, newText: string) => void;
}

export function Task({ item, removeTask, updateTask }: TaskProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editText, setEditText] = useState<string>(item.taskText);

  const handleUpdate = (): void => {
    if (editText.trim()) {
      updateTask(item.id, editText);
      setIsEditing(false);
    }
  };

  return (
    <div key={item.id} className="item">
      {isEditing ? (
        <>
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleUpdate()}
            className="edit-input"
            autoFocus
          />
          <div id="icons">
            <button onClick={handleUpdate} className="save-btn">
              Update
            </button>
          </div>
        </>
      ) : (
        <>
          <h2>{item.taskText}</h2>
          <div id="icons">
            <i
              className="fa-solid fa-pen-to-square"
              role="button"
              aria-label="Update"
              onClick={() => setIsEditing(true)}
            ></i>
            <i
              onClick={() => removeTask(item.id)}
              className="fa-solid fa-trash"
              role="button"
              aria-label="Delete"
            ></i>
          </div>
        </>
      )}
    </div>
  );
}
