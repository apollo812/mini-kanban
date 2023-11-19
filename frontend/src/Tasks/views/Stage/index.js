import React from "react";
import { Draggable } from "react-beautiful-dnd";
import EditableTask from "Tasks/views/EditableTask";
import Icon from "Components/Icon";

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: "none",
  zIndex: 2,
  background: isDragging ? "#f8f9fa" : "white",
  ...draggableStyle
});

function Stage({ data, stage, removeTask, updateTask }) {
  return (
    <div className="stage px-2 py-2" style={{ minHeight: 60 }}>
      <div className="list-group pb-3">
        {data.map((task, index) => (
          <Draggable key={task.id} draggableId={task.id} index={index}>
            {(provided, snapshot) => (
              <div
                className="list-group-item"
                style={getItemStyle(
                  snapshot.isDragging,
                  provided.draggableProps.style
                )}
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
              >
                <div className="row">
                  <div className={task.text ? "col-8 col-md-9" : "col-12"}>
                    <EditableTask
                      updateTask={updateTask}
                      removeTask={removeTask}
                      task={task}
                      stage={stage}
                    />
                  </div>
                  {task.text && (
                    <React.Fragment>
                      <div className="col-1">
                        <div className="basic-tooltip btn">
                          <Icon type="info" width="18" height="18" />
                          <span className="tooltiptext">
                            {new Date(task.updated).toLocaleString()}
                          </span>
                        </div>
                      </div>
                      <div className="col-2">
                        <div
                          className="remove-btn btn"
                          onClick={() => removeTask({ taskID: task.id, stage })}
                        >
                          <Icon type="remove" width="12" height="12" />
                        </div>
                      </div>
                    </React.Fragment>
                  )}
                </div>
              </div>
            )}
          </Draggable>
        ))}
      </div>
    </div>
  );
}

export default Stage;
