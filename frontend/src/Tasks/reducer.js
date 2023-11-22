import {
  NEW_TASK_ITEM,
  UPDATE_TASK_ITEM,
  UPDATE_TASKS,
  REMOVE_TASK,
  ADD_STAGE,
  REMOVE_STAGE,
  INIT_STATE
} from "./actions";
import stages from "./stages";
import { createUUID } from "./utils";

export const getInitialState = stages => ({
  ...stages.reduce((mem, { key }) => {
    mem[key] = [];
    return mem;
  }, {}),
  searchTerm: ""
});

const initialState = getInitialState(stages);

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case INIT_STATE: {
      return{
        ...state,
        ...action.payload,
      }
    }

    case ADD_STAGE: {
      return {
        ...state,
        [`${action.payload.key}`]: []
      }
    }

    case REMOVE_STAGE: {
      delete state[`${action.payload.id}`]
      return{
        ...state
      }
    }

    case NEW_TASK_ITEM: {
      const now = new Date().getTime();
      const stage = action.payload;
      return {
        ...state,
        [stage]: [
          ...state[stage],
          {
            id: createUUID(),
            editMode: true,
            created: now,
            updated: now
          },
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
