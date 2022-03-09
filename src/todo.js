import React from "react";
import AddTodoComponent from "./AddTodoComponent";

export let context = React.createContext(null);

function Todo() {
  const inputDetails = {
    title: "Your Todo's",
    addTodo: "Add Task",
    removeCompleted: "Remove completed Task",
    primaryButtonColor: "#175A23",
    secondaryButtonColor: "#540F17",
  };
  return (
    <context.Provider value={inputDetails}>
      <AddTodoComponent />
    </context.Provider>
  );
}
export default Todo;
