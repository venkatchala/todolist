import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

function Settings() {
  const inputTitle = useRef();
  const addButtonName = useRef();
  const removeButtonName = useRef();
  const primaryButtonColor = useRef();
  const secondaryButtonColor = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const settingsJson = JSON.parse(localStorage.getItem("settings"));
    inputTitle.current.value = settingsJson.title;
    addButtonName.current.value = settingsJson.addTodo;
    removeButtonName.current.value = settingsJson.removeCompleted;
    primaryButtonColor.current.value = settingsJson.primaryButtonColor;
    secondaryButtonColor.current.value = settingsJson.secondaryButtonColor;
  });

  const onClickUpdateButton = (e) => {
    const setData = {
      title: inputTitle.current.value,
      addTodo: addButtonName.current.value,
      removeCompleted: removeButtonName.current.value,
      primaryButtonColor: primaryButtonColor.current.value,
      secondaryButtonColor: secondaryButtonColor.current.value,
    };
    localStorage.setItem("settings", JSON.stringify(setData));
    navigate("/");
  };

  return (
    <div>
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        Home
      </button>
      <br />
      <label>Title:</label>
      <input type="text" ref={inputTitle}></input>
      <br />
      <label>Add Button Name:</label>
      <input type="text" ref={addButtonName}></input>
      <br />
      <label>Remove Button Name:</label>
      <input type="text" ref={removeButtonName}></input>
      <br />
      <label>Primary Button Color:</label>
      <input type="text" ref={primaryButtonColor}></input>
      <br />
      <label>secondary Button Color:</label>
      <input type="text" ref={secondaryButtonColor}></input>
      <br />
      <button onClick={onClickUpdateButton}>Update</button>
    </div>
  );
}
export default Settings;
