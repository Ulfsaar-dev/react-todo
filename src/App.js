import React, { useState } from "react";
import "./index.css";

function Todo({ todo, index, changeStateTodo}) {
  const ButtonText = [
    'To Start',
    'Ongoing',
    'Completed'
  ];
  const TextStyle = [
    'Red',
    'Green',
    'Blue'
  ]

  return (
    <div className="todo"
      style={{ color: TextStyle[todo.Status] }}
    >
      {todo.text}
      <button onClick={() => changeStateTodo(index)}>{ButtonText[todo.Status]}</button>
    </div>
  );
}

function TodoForm({ addTodo }) {
  const [value, setValue] = useState("");
  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="input"
        value={value}
        onChange={e => setValue(e.target.value)}
      />
    </form>
  );
}

function App() {
  const [todos, setTodos] = useState([
    {
      text: "Test Text",
      Status: 0
    }
  ]);

  const addTodo = (text, Status) => {
    if (!Status) Status = 0;
    const newTodos = [...todos, { text, Status }];
    setTodos(newTodos);
  };

  const changeStateTodo = index => {
    const newTodos = [...todos];
    newTodos[index].Status = (newTodos[index].Status + 1) % 3;
    
    setTodos(newTodos);
  };

  return (
    <div className="app">
      <div className="todo-list">
        {todos.map((todo, index) => (
          <Todo
            key={index}
            index={index}
            todo={todo}
            changeStateTodo={changeStateTodo}
          />
        ))}
        <TodoForm addTodo={addTodo} />
      </div>
    </div>
  );
}

export default App;