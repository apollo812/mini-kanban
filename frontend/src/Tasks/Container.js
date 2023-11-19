import React from "react";
import { Store } from "../Store";

import Stage from "./views/Stage";
import SearchForm from "./views/SearchForm";
import stages from "./stages";
import {
  UPDATE_TASKS,
  REMOVE_TASK,
  NEW_TASK_ITEM,
  UPDATE_TASK_ITEM,
  UPDATE_SEARCH_TERM
} from "./actions";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { getListStyle, handleDragEnd } from "./utils/drag";
import Icon from "Components/Icon";

function Tasks() {
  const { state, dispatch } = React.useContext(Store);
  const updateTasks = payload => {
    return dispatch({
      type: UPDATE_TASKS,
      payload
    });
  };
  const addEmptyTask = payload => {
    return dispatch({
      type: NEW_TASK_ITEM,
      payload
    });
  };
  const updateTask = payload => {
    return dispatch({
      type: UPDATE_TASK_ITEM,
      payload
    });
  };
  const removeTask = payload => {
    return dispatch({
      type: REMOVE_TASK,
      payload
    });
  };
  const updateSearchTerm = payload => {
    return dispatch({
      type: UPDATE_SEARCH_TERM,
      payload
    });
  };
  const getList = key => state.tasks[key];
  const onDragEnd = result => handleDragEnd({ result, updateTasks, getList });
  const getStageData = key => {
    if (state.tasks.searchTerm === "") {
      return state.tasks[key];
    }
    return state.tasks[key].filter(t => {
      const filter = state.tasks.searchTerm.toUpperCase();
      if (t.text && t.text.toUpperCase().indexOf(filter) > -1) {
        return true;
      }
      return false;
    });
  };
  return (
    <div className="Tasks">
      <SearchForm
        updateSearchTerm={updateSearchTerm}
        searchTerm={state.tasks.searchTerm}
      />
      <div className="py-4 row">
        <DragDropContext onDragEnd={onDragEnd}>
          {stages.map(({ key, title }) => (
            <div className={`col-md-${12 / stages.length}`} key={key}>
              <div className="px-3 py-3 bg-white rounded shadow-sm">
                <div className="row px-2">
                  <div className="col-10">
                    <h2>{title}</h2>
                  </div>
                  <div className="col-2">
                    <div
                      className="add-btn btn"
                      onClick={() => addEmptyTask(key)}
                    >
                      <Icon type="add" />
                    </div>
                  </div>
                </div>
                <Droppable droppableId={key}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      style={getListStyle(snapshot.isDraggingOver)}
                    >
                      <Stage
                        updateTask={updateTask}
                        removeTask={removeTask}
                        stage={key}
                        title={title}
                        data={getStageData(key)}
                      />
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            </div>
          ))}
        </DragDropContext>
      </div>
    </div>
  );
}

export default Tasks;
