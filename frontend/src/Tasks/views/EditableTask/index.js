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
      className={`${showAnimation && "opacity-0 transform -translate-x-10"} w-full`}
      onDoubleClick={() => setIsEditing(true)}
    >
      {isEditing ? (
        <div ref={elementToEdit} className="">
          <input
            className="focus:border-2 focus:border-blue-400 focus:outline-0 rounded-lg text-sm"
            type="text"
            placeholder="New item..."
            value={text}
            onChange={handleTextChange}
            onKeyUp={handleKeyPress}
            autoFocus
          />
        </div>
      ) : (
        <div className="">
          <div className="text-kanban_txt text-xs">{task.text}</div>
        </div>
      )}
    </div>
  );
}
