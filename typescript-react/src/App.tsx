import React, {useState}from "react";
import "./App.css";
import ToDoList from "./components/toDoList";
import NewToDo from "./components/newToDo";
import { Todo } from "./todo.models";


//FunctionComponent
const App: React.FC = () => {
  const [todos,setTodos] = useState<Todo[]>([]);

  //const todos = [{ id: "t1", text: "Finish the Course" }];
  const todoAddHandler = (text: string) => {
    setTodos((prevTodos) => [
      ...prevTodos,
      { id: Math.random().toString(), text: text },
    ]);
  };
  const todoDeleteHandler = (todoId : string) => {
    setTodos(prevTodos => {
      return prevTodos.filter(todo => todo.id !== todoId)
    })
  }
  return (
    <div className="App">
      <NewToDo onAddTodo={todoAddHandler}/>
      <ToDoList items={todos} onDeleteTodo={todoDeleteHandler}/>
    </div>
  );
};

export default App;
