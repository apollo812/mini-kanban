import React, { useRef, useState } from "react";
import useOnClickOutside from "Tasks/utils/useOnClickOutside";

export default function EditableTask({ task, stage, removeTask, updateTask }) {
  const elementToEdit = useRef(null);
  const [text, setText] = useState(task.text || "");
  const [isEditing, setIsEditing] = useState(task.editMode);
  const [showAnimation, setShowAnimation] = useState(false);
  let timer;

  useOnClickOutside(elementToEdit, () => {
    handleEmptyTask();
  });

  function handleTextChange(e) {
    setText(e.target.value);
  }

  function handleTaskUpdate() {
    if (!text) {
      removeTask({ taskID: task.id, stage });
    }
    updateTask({
      taskID: task.id,
      text,
      stage
    });
    setIsEditing(false);
    setShowAnimation(true);
    timer = setTimeout(() => {
      setShowAnimation(false);
      clearTimeout(timer);
    }, 600);
  }

  function handleEmptyTask() {
    if (!task.text) {
      removeTask({ taskID: task.id, stage });
    } else {
      setText(task.text);
      setIsEditing(false);
    }
  }

  function handleKeyPress(event) {
    if (event.keyCode === 13) handleTaskUpdate();
    if (event.keyCode === 27) handleEmptyTask();
  }

  return (
    <div
      className={`${showAnimation && "saved"} task-item`}
      onDoubleClick={() => setIsEditing(true)}
    >
      {isEditing ? (
        <div ref={elementToEdit} className="input-group">
          <input
            className="form-control"
            type="text"
            placeholder="New item..."
            value={text}
            onChange={handleTextChange}
            onKeyUp={handleKeyPress}
            autoFocus
          />
        </div>
      ) : (
        <div className="input-group">
          <div className="px-3 task-text">{task.text}</div>
        </div>
      )}
    </div>
  );
}
