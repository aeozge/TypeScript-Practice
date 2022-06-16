import React from "react";
import Todo from '../todo.models'
import './toDoList.css'

interface ToDoListProps {
    items : Todo[];
    onDeleteTodo: (todoId: string) => void;
  
}

const ToDoList: React.FC<ToDoListProps> = (props) => {
  return (
    <ul>
    {props.items.map((todo) => (
      <li key={todo.id}>
        <span>{todo.text}</span>
        <button onClick={props.onDeleteTodo.bind(null, todo.id)}>
          DELETE
        </button>
      </li>
    ))}
  </ul>
);
};
export default ToDoList;
