import React, { useState, useEffect, useRef, useContext } from "react";
import "./AddTodoComponent.css";
import { context } from "./todo";
import styled from "styled-components";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

function AddTodoComponent(props) {
  const [isLoaded, setIsLoaded] = useState(false);
  const inputElement = useRef();
  const todoConfig = useContext(context);
  const navigate = useNavigate();

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
    background-color: ${todoConfig.primaryButtonColor};
    color: #ffffff;
    border: none;
    margin: 20px;
  `;
  const UnorderList = styled.ul``;
  const List = styled.li`
    list-style-type: none;
    width: 400px;
    height: 40px;
    padding: 10px;
    border: 1px lightgrey;
    margin: 0.1em;
    background-color: #bcbdc2;
  `;
  const RemoveTask = styled.button`
    background-color: #b94242;
    color: #ffffff;
    border: none;
    width: 30px;
    height: 30px;
  `;

  const CheckBox = styled.input`
    width: 30px;
    height: 30px;
  `;

  const AssignedTask = styled.span``;

  const RemoveCompletedTask = styled.button`
    background-color: ${todoConfig.secondaryButtonColor};
    color: #ffffff;
    height: 40px;
    border: none;
    margin-left: 30px;
  `;
  useEffect(() => {
    if (!isLoaded) {
      setIsLoaded(true);
      if (localStorage.getItem("TodoList") != null) {
        props.handleLoad();
      }
    } else {
      localStorage.setItem("TodoList", JSON.stringify(props.todo));
    }
  }, [props.todo]);

  const onClickEvent = (e) => {
    let x = props.todo
      .map((name) => name.value)
      .includes(inputElement.current.value);
    if (x === false) {
      props.handleAddButton({ value: inputElement.current.value, status: 0 });
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
    props.handleStatusUpdate(inputId);
  };
  const onClickDelete = (inputId) => {
    props.handleDeleteTodo(inputId);
  };
  const onRemoveCompletedTask = (e) => {
    props.handleRemoveCompletedTasks();
  };
  return (
    <Container>
      <button
        onClick={() => {
          navigate("/settings");
        }}
      >
        Settings
      </button>
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
        {props.todo &&
          props.todo.map((val, index) => {
            const todoClass =
              val.status === 0
                ? { class: "incomplete-todo", status: false }
                : { class: "completed-todo", status: true };
            return (
              <List key={index}>
                <CheckBox
                  type="checkBox"
                  id={index}
                  name={val.status}
                  onChange={(e) => onChangeCheckbox(index)}
                  checked={todoClass.status}
                ></CheckBox>
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

const mapStateToPros = (state) => {
  return {
    todo: state,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    handleLoad: () => dispatch({ type: "loading" }),
    handleAddButton: (jsonObject) =>
      dispatch({ type: "addTodo", payload: jsonObject }),
    handleStatusUpdate: (index) =>
      dispatch({ type: "updateStatus", payload: index }),
    handleDeleteTodo: (index) =>
      dispatch({ type: "deleteTodo", payload: index }),
    handleRemoveCompletedTasks: () => dispatch({ type: "removeCompleteTasks" }),
  };
};
const TodoHome = connect(mapStateToPros, mapDispatchToProps)(AddTodoComponent);

export default TodoHome;
