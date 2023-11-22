import React, { useEffect, useState } from "react";
import { Store } from "../Store";

import Stage from "./views/Stage";
import {
  UPDATE_TASKS,
  REMOVE_TASK,
  NEW_TASK_ITEM,
  UPDATE_TASK_ITEM,
  ADD_STAGE,
  REMOVE_STAGE,
  INIT_STATE
} from "./actions";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { getListStyle, handleDragEnd } from "./utils/drag";
import Icon from "Components/Icon";
import Pop from "./views/Pop";
import { useQuery, useMutation } from '@apollo/client';
import { getInitialState } from "./reducer";
import { GET_DATA, CREATE_LIST } from "./gq";

function Tasks() {
  // Get Data Using Apollo Client
  const { loading, error, data } = useQuery(GET_DATA);
  
  const { state, dispatch } = React.useContext(Store);
  
  const [sortList, setSortList] = useState([])
  const [stageList, setStageList] = useState([])
  const [newListText, setNewListText] = useState("")
  const [isAddListMode, setIsAddListMode] = useState(false)
  
  const [createList] = useMutation(CREATE_LIST);
  
  useEffect(() => {
    if(data){
      console.log("list data", data.getAllList)
      console.log("card data", data.getAllCard)

      let payload = getInitialState([...data.getAllList])

      data.getAllCard && data.getAllCard.length > 0 && data.getAllCard.map(data => (
        payload[`${data.listId}`].push({
          id: data.id,
          text: data.text,
          editMode: data.editMode,
          created: new Date(data.created),
          updated: new Date(data.updated),
        })
      ))

      console.log("payload", payload)

      dispatch({
        type: INIT_STATE,
        payload
      });
      setStageList([...data.getAllList])
    }
  }, [data, dispatch])

  useEffect(() => {
    let tmp_list = stageList.map(data => data.sort); // Using map to transform data and return the result
    setSortList([...tmp_list]);
  }, [stageList])
  
  // Apollo client loading data and error message
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

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

  const addStage = payload => {
    return dispatch({
      type: ADD_STAGE,
      payload
    });
  };

  const removeStage = payload => {
    let tmp_list = [...stageList]
    tmp_list.splice(payload.pos, 1)
    setStageList([...tmp_list])

    return dispatch({
      type: REMOVE_STAGE,
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
    switch(sort){
      case "newest":
        return state.tasks[key] && state.tasks[key].length > 0 && state.tasks[key].sort((a, b) => new Date(a.created) - new Date(b.created));
      case "oldest":
        return state.tasks[key] && state.tasks[key].length > 0 && state.tasks[key].sort((a, b) => new Date(b.created) - new Date(a.created));
      case "update":
        return state.tasks[key] && state.tasks[key].length > 0 && state.tasks[key].sort((a, b) => new Date(a.updated) - new Date(b.updated));
      case "alpha":
        return state.tasks[key] && state.tasks[key].length > 0 && state.tasks[key].sort((a, b) => a.text && b.text && a.text.localeCompare(b.text));
      default:
        return state.tasks[key] && state.tasks[key].length > 0 && state.tasks[key].sort((a, b) => a.index - b.index);
    }
  };

  function handleNewListTextChange(e) {
    setNewListText(e.target.value);
  }

  const addNewList = async () => {
    try {
      // Execute the mutation
      let result = await createList({
        variables: {
          title: newListText,
        }
      });

      console.log("result", result)

      let tmp_list = [...stageList];
      let new_stage = {
        key: result.data.createList.list.key,
        title: result.data.createList.list.title,
        sort: result.data.createList.list.sort
      }
      tmp_list.push(new_stage)
      setStageList([...tmp_list])
      addStage(new_stage)

    } catch (error) {
      console.log("error", error)
      alert(error)
    }

    // init 
    setIsAddListMode(false)
    setNewListText("")
  }

  return (
    <div className="px-4">
      <div className="py-4 w-full relative overflow-x-auto overflow-y-hidden h-[calc(100vh-80px)]">
        <div className="inline-flex gap-6">
          <DragDropContext onDragEnd={onDragEnd}>
            {stageList.map(({ key, title }, index) => (
              <div className="w-[272px]" key={key}>
                <div className="p-3 bg-kanban_bg-plan rounded-lg shadow-md">
                  <div className="grid grid-cols-12">
                    <div className="col-span-11">
                      <h2 className="text-kanban_txt font-bold text-sm">{title}</h2>
                    </div>
                    <div className="col-span-1">
                      <Pop addEmptyTask={addEmptyTask} updateSortList={updateSortList} removeStage={removeStage} id={key} pos={index} />
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
              <div className={`p-3 shadow-md rounded-lg ${!isAddListMode ? "bg-kanban_bg-add_plan hover:bg-kanban_bg-add_plan_hover" : "bg-kanban_bg-plan"}`}>
                {
                  isAddListMode && 
                  <>
                    <input
                      className="focus:border-2 focus:border-blue-400 focus:outline-0 rounded-lg text-sm my-2"
                      type="text"
                      placeholder="New item..."
                      value={newListText}
                      onChange={handleNewListTextChange}
                      autoFocus
                    />
                    <div className="flex gap-4 py-1">
                      <p className="text-sm text-black bg-blue-400 rounded py-1 px-3 cursor-pointer" onClick={() => addNewList()}>Add List</p>
                      <div className="self-center cursor-pointer" onClick={() => {setIsAddListMode(false); setNewListText("")}}>
                        <Icon type="remove" width="12" height="12" className="text-kanban_txt mt-1" />
                      </div>
                    </div>
                  </>
                }
                {
                  !isAddListMode && 
                  <div className="flex gap-4">
                    <div>
                      <Icon type="add" width="12" height="12" className="text-white mt-1" />
                    </div>
                    <p className="text-sm text-white font-bold cursor-default" onClick={() => setIsAddListMode(true)}>Add another list</p>
                  </div>
                }
              </div>
            </div>
          </DragDropContext>
        </div>
      </div>
    </div>
  );
}

export default Tasks;
