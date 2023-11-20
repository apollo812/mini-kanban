import React, { useEffect, useState } from "react";
import { Store } from "../Store";

import Stage from "./views/Stage";
import SearchForm from "./views/SearchForm";
import stages from "./stages";
import {
  UPDATE_TASKS,
  REMOVE_TASK,
  NEW_TASK_ITEM,
  UPDATE_TASK_ITEM,
  UPDATE_SEARCH_TERM,
} from "./actions";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { getListStyle, handleDragEnd } from "./utils/drag";
import Icon from "Components/Icon";
import Pop from "./views/Pop";

function Tasks() {
  const { state, dispatch } = React.useContext(Store);

  const [sortList, setSortList] = useState([])

  useEffect(() => {
    let tmp_list = stages.map(data => data.sort); // Using map to transform data and return the result
    setSortList([...tmp_list]);
  }, [])

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

  const updateSortList = (index, value) => {
    let tmp_list = [...sortList]
    tmp_list[index] = value
    setSortList([...tmp_list])
  }

  const getList = key => state.tasks[key];
  const onDragEnd = result => {
    // clear sort list
    let tmp_list = Array(sortList.length).fill("custom");
    setSortList([...tmp_list])
    
    handleDragEnd({ result, updateTasks, getList });
  }
  const getStageData = (key, sort) => {
    console.log(state)
    // if (state.tasks.searchTerm === "") {
    //   return state.tasks[key];
    // }
    // return state.tasks[key].filter(t => {
    //   const filter = state.tasks.searchTerm.toUpperCase();
    //   if (t.text && t.text.toUpperCase().indexOf(filter) > -1) {
    //     return true;
    //   }
    //   return false;
    // });

    switch(sort){
      case "newest":
        return state.tasks[key].sort((a, b) => new Date(a.created) - new Date(b.created));
      case "oldest":
        return state.tasks[key].sort((a, b) => new Date(b.created) - new Date(a.created));
      case "update":
        return state.tasks[key].sort((a, b) => new Date(a.updated) - new Date(b.updated));
      case "alpha":
        return state.tasks[key].sort((a, b) => a.text && b.text && a.text.localeCompare(b.text));
      default:
        return state.tasks[key];
    }
  };
  return (
    <div className="px-4">
      {/* <SearchForm
        updateSearchTerm={updateSearchTerm}
        searchTerm={state.tasks.searchTerm}
      /> */}
        
      <div className="py-4 w-full relative overflow-x-auto h-[calc(100vh-80px)]">
        <div className="inline-flex gap-6">
          <DragDropContext onDragEnd={onDragEnd}>
            {stages.map(({ key, title }, index) => (
              <div className="w-[272px]" key={key}>
                <div className="p-3 bg-kanban_bg-plan rounded-lg shadow-md">
                  <div className="grid grid-cols-12">
                    <div className="col-span-11">
                      <h2 className="text-kanban_txt font-bold text-sm">{title}</h2>
                    </div>
                    <div className="col-span-1">
                      <Pop addEmptyTask={addEmptyTask} updateSortList={updateSortList} id={key} pos={index} />
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
                          data={getStageData(key, sortList[index])}
                        />
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>

                  <div className="hover:bg-kanban_bg-card rounded-lg p-1.5 cursor-pointer" onClick={() => addEmptyTask(key)}>
                    <div className="flex gap-4">
                      <Icon type="add" width="12" height="12" className="text-kanban_txt mt-1" />
                      <p className="text-sm font-bold text-kanban_txt">Add a card</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="w-[272px]">
              <div className="p-3 bg-kanban_bg-add_plan rounded-lg shadow-md hover:bg-kanban_bg-add_plan_hover">
                <div className="flex gap-4">
                  <div className="">
                    <Icon type="add" width="12" height="12" className="text-white mt-1" />
                  </div>
                  <p className="text-sm text-white font-bold cursor-default">Add another list</p>
                </div>
              </div>
            </div>
          </DragDropContext>
        </div>
      </div>
    </div>
  );
}

export default Tasks;
