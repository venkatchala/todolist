import React, { useEffect, useState } from "react";
import TodoHome from "./AddTodoComponent";

export let context = React.createContext(null);

function Todo() {
  const [settings, setSettings] = useState({});

  useEffect(() => {
    const settingsJson = localStorage.getItem("settings");
    if (settingsJson === undefined) {
      localStorage.setItem("settings", {
        title: "Your Todo's",
        addTodo: "Add Task",
        removeCompleted: "Remove completed Task",
        primaryButtonColor: "#175A23",
        secondaryButtonColor: "#540F17",
      });
    }
    setSettings(JSON.parse(localStorage.getItem("settings")));
  }, []);
  return (
    <context.Provider value={settings}>
      <TodoHome />
    </context.Provider>
  );
}
export default Todo;
