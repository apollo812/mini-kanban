import {
  NEW_TASK_ITEM,
  UPDATE_TASK_ITEM,
  UPDATE_TASKS,
  REMOVE_TASK,
  UPDATE_SEARCH_TERM
} from "./actions";
import stages from "./stages";

export const getInitialState = stages => ({
  ...stages.reduce((mem, { key }) => {
    mem[key] = [];
    return mem;
  }, {}),
  searchTerm: ""
});

const initialState = getInitialState(stages);

function create_UUID() {
  let dt = new Date().getTime();
  const uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(
    c
  ) {
    const r = (dt + Math.random() * 16) % 16 | 0;
    dt = Math.floor(dt / 16);
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
  return uuid;
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_SEARCH_TERM: {
      return {
        ...state,
        searchTerm: action.payload
      };
    }

    case NEW_TASK_ITEM: {
      const now = new Date().getTime();
      const stage = action.payload;
      return {
        ...state,
        [stage]: [
          {
            id: create_UUID(),
            editMode: true,
            created: now,
            updated: now
          },
          ...state[stage]
        ]
      };
    }

    case UPDATE_TASK_ITEM: {
      const { taskID, text, stage } = action.payload;
      const now = new Date().getTime();
      return {
        ...state,
        [stage]: state[stage].map(item => {
          if (item.id !== taskID) {
            return item;
          }
          return {
            ...item,
            text,
            editMode: false,
            updated: now
          };
        })
      };
    }

    case UPDATE_TASKS: {
      return {
        ...state,
        ...action.payload
      };
    }

    case REMOVE_TASK: {
      const { stage, taskID } = action.payload;
      return {
        ...state,
        [stage]: state[stage].filter(t => t.id !== taskID)
      };
    }

    default:
      return state;
  }
}
