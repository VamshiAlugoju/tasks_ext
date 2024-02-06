/* eslint-disable react/prop-types */
import {} from "react";

function TodoItem(props) {
  return (
    <div className="card">
      <div className="card-body d-flex justify-content-between">
        <p>{props.name}</p>
        <div className="d-flex">
          <button>Delete</button>
        </div>
      </div>
    </div>
  );
}

export default TodoItem;
