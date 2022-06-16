import React, {useRef}from "react";
import './newToDo.css'

type NewTodoProps = {
    onAddTodo: (todoText: string) => void;
  };

const NewToDo: React.FC<NewTodoProps> = (props) => {
    const textInputRef = useRef<HTMLInputElement>(null);
  
    const todoSubmitHandler = (event: React.FormEvent) => {
      event.preventDefault();
      const enteredText = textInputRef.current!.value;
      props.onAddTodo(enteredText);
    };
  return (
  
    <form onSubmit={todoSubmitHandler}>
      <div className="form-control">
        <label htmlFor="todo-text">ToDo Text</label>
        <input type="text" id="todo-text" ref={textInputRef}/>
      </div>

      <button type="submit">Add ToDo</button>
    </form>
  );
};

export default NewToDo;
