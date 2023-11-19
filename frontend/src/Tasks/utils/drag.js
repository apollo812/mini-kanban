export const getListStyle = isDraggingOver => ({
  borderRadius: ".25rem",
  transition: "all 0.3s",
  outline: 0,
  background: isDraggingOver ? "#6f42c1" : "transparent"
});

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

export const handleDragEnd = ({ result, updateTasks, getList }) => {
  const { source, destination } = result;

  // dropped outside the list
  if (!destination) {
    return;
  }

  let tasks = {};

  if (source.droppableId === destination.droppableId) {
    const items = reorder(
      getList(source.droppableId),
      source.index,
      destination.index
    );

    tasks = {
      [source.droppableId]: items
    };
  } else {
    tasks = move(
      getList(source.droppableId),
      getList(destination.droppableId),
      source,
      destination
    );
  }
  updateTasks(tasks);
};
