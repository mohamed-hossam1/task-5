import { useState } from "react";
import { Task } from "./components/Task";
import "./App.css";

interface TodoItem {
  taskText: string;
  id: number;
}




function App() {
  const [items, setItems] = useState<TodoItem[]>([]);
  const [count, setCount] = useState<number>(0);
  const [taskText, setTaskText] = useState<string>("");

  const addTask = (): void => {
    if (taskText.trim()) {
      const newItem: TodoItem = {
        taskText: taskText.trim(),
        id: count,
      };
      setItems([...items, newItem]);
      setCount(count + 1);
      setTaskText("");
    }
  };

  const removeTask = (id: number): void => {
    setItems(items.filter((item) => item.id !== id));
  };

  const updateTask = (id: number, newText: string): void => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, taskText: newText } : item
      )
    );
  };

  return (
    <>
      <section className="box">
        <div>
          <h1>Todo List application</h1>
        </div>
        <div className="todo-list">
          {items.map((item) => (
            <Task
              key={item.id}
              item={item}
              removeTask={removeTask}
              updateTask={updateTask}
            />
          ))}
        </div>

        <div className="submit-box">
          <input
            id="todo-input"
            type="text"
            placeholder="Add your task"
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && addTask()}
          />
          <button id="add-btn" onClick={addTask}>
            Add
          </button>
        </div>
      </section>

    </>
  );
}

export default App;