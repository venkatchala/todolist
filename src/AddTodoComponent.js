import React, { useState, useEffect, useRef, useContext } from "react";
import "./AddTodoComponent.css";
import { context } from "./todo";
import styled from "styled-components";
import { type } from "@testing-library/user-event/dist/type";

const Container = styled.div``;

const Header = styled.h1`
  color: #25a180;
`;
const InputTask = styled.input`
  width: 400px;
  height: 40px;
  box-sizing: border-box;
`;
const AddButton = styled.button`
  height: 40px;
  text-align: center;
  background-color: #309630;
  color: #ffffff;
  border: none;
  margin: 20px;
`;
const UnorderList = styled.ul``;
const List = styled.li`
  list-style-type: none;
`;
const RemoveTask = styled.button`
  background-color: #b94242;
  color: #ffffff;
  border: none;
`;
const RemoveCompletedTask = styled.button`
  background-color: #b94242;
  color: #ffffff;
  height: 40px;
  border: none;
  margin-left: 30px;
`;

const AssignedTask = styled.span``;

function AddTodoComponent() {
  const [list, setList] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const inputElement = useRef();
  const todoConfig = useContext(context);

  useEffect(() => {
    if (!isLoaded) {
      setIsLoaded(true);
      if (localStorage.getItem("TodoList") != null) {
        setList(JSON.parse(localStorage.getItem("TodoList")));
      }
    } else {
      localStorage.setItem("TodoList", JSON.stringify(list));
    }
  }, [list]);

  const onClickEvent = (e) => {
    let x = list.map((name) => name.value).includes(inputElement.current.value);
    if (x === false) {
      setList([...list, { value: inputElement.current.value, status: 0 }]);
    } else {
      alert("The task you entered is Already assigned");
    }
    inputElement.current.value = "";
  };
  const onKeypressHandler = (e) => {
    let key = e.key;
    if (key === "Enter") {
      onClickEvent(key);
    }
  };

  const onChangeCheckbox = (inputId) => {
    const updatedList = list.map((val, index) => {
      if (index === inputId) {
        val.status === 0 ? (val.status = 1) : (val.status = 0);
      }
      return val;
    });
    setList(updatedList);
  };
  const onClickDelete = (inputId) => {
    const updatedList = list.filter((val, index) => {
      if (index === inputId) {
        localStorage.removeItem("TodoList");
        return false;
      }
      return val;
    });
    setList(updatedList);
  };
  const onRemoveCompletedTask = (e) => {
    const updatedNewList = list.filter((val) => val.status === 0);
    setList(updatedNewList);
  };
  return (
    <Container>
      <Header>{todoConfig.title}</Header>
      <InputTask
        type="text"
        className="todo-inputfield"
        name="inputValue"
        ref={inputElement}
        onKeyPress={onKeypressHandler}
      ></InputTask>
      <AddButton onClick={onClickEvent}> {todoConfig.addTodo}</AddButton>
      <UnorderList>
        {list &&
          list.map((val, index) => {
            const todoClass =
              val.status === 0
                ? { class: "incomplete-todo", status: false }
                : { class: "completed-todo", status: true };
            return (
              <List key={index}>
                <input
                  type="checkBox"
                  id={index}
                  name={val.status}
                  onChange={(e) => onChangeCheckbox(index)}
                  checked={todoClass.status}
                ></input>
                <AssignedTask className={todoClass.class}>
                  {val.value}
                </AssignedTask>
                <RemoveTask id={index} onClick={(e) => onClickDelete(index)}>
                  X
                </RemoveTask>
              </List>
            );
          })}
      </UnorderList>
      <RemoveCompletedTask onClick={onRemoveCompletedTask}>
        {todoConfig.removeCompleted}
      </RemoveCompletedTask>
    </Container>
  );
}

export default AddTodoComponent;
