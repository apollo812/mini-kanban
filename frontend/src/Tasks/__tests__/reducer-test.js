import reducer, { getInitialState } from "../reducer";
import { NEW_TASK_ITEM, REMOVE_TASK, UPDATE_TASK_ITEM } from "../actions";
import stages from "../stages";

const stateWithOneStage = {
  done: [
    {
      id: 5,
      editMode: true,
      created: 1,
      updated: 1
    }
  ]
};

describe("task reducer", () => {
  it("should return the initial state by stages.js data", () => {
    const initialState = getInitialState(stages);
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it("should return the initial state by customized stages array", () => {
    const initialState = getInitialState([
      {
        key: "planned",
        title: "Planned"
      }
    ]);
    expect(reducer(initialState, {})).toEqual({
      planned: [],
      searchTerm: ""
    });
  });

  it("should add new task item", () => {
    expect(
      reducer(undefined, {
        type: NEW_TASK_ITEM,
        payload: "done"
      })
    ).toEqual({
      done: [
        {
          id: expect.any(String),
          editMode: true,
          created: expect.any(Number),
          updated: expect.any(Number)
        }
      ],
      progress: [],
      todo: [],
      searchTerm: ""
    });
  });

  it("should update a task", () => {
    expect(
      reducer(stateWithOneStage, {
        type: UPDATE_TASK_ITEM,
        payload: {
          taskID: 5,
          text: "updated text",
          stage: "done"
        }
      })
    ).toEqual({
      done: [
        {
          id: 5,
          editMode: false,
          text: "updated text",
          created: expect.any(Number),
          updated: expect.any(Number)
        }
      ]
    });
  });

  it("should remove a task", () => {
    expect(
      reducer(stateWithOneStage, {
        type: REMOVE_TASK,
        payload: {
          taskID: 5,
          stage: "done"
        }
      })
    ).toEqual({
      done: []
    });
  });
});
