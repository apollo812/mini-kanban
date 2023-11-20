import React from "react";
import Tasks from "./Tasks/Container";

function App() {
  return (
    <div>
      <div className="">
        <div className="text-center">
          <h1>Mini-Kanban</h1>
          <p>
            This is an example web application of using{" "}
            <strong>useReducer</strong> of React Hooks as an alternative to
            Redux.
          </p>
        </div>
      </div>
      <div className="container-fluid py-5 bg-light">
        <Tasks />
      </div>
    </div>
  );
}

export default App;
