import { useEffect, useState } from "react";
import TodoItem from "./Components/TodoItem";
import axios from "axios";
import "./App.css";

function App() {
  const [todoItems, setTodoItems] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:8080/getTasks").then((res) => {
      setTodoItems(res.data);
    });
  }, []);
  return (
    <>
      <div className="container">
        <h1 className="text-center">todo App</h1>
        {todoItems.map((items, idx) => {
          return <TodoItem name={items.tName} key={idx} />;
        })}
      </div>
    </>
  );
}

export default App;
