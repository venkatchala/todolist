import React, { useState, useEffect, useRef,useContext } from "react";
import './AddTodoComponent.css'
import { context } from "./todo";

function AddTodoComponent() {
    const [list, setList] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const inputElement = useRef();
    const todoConfig = useContext(context);

    

useEffect(() =>{
    if(!isLoaded){
        setIsLoaded(true);
        if(localStorage.getItem('TodoList') != null){
            setList(JSON.parse(localStorage.getItem('TodoList')))

        }
        
    }else{
        localStorage.setItem('TodoList', JSON.stringify(list));
    }
  

},[list])

    

    const onClickEvent = (e) => {
        let x = list.map((name) => name.value).includes(inputElement.current.value)
        if(x === false ) {
           
            setList([...list, { value: inputElement.current.value, status: 0 }]);
            
        } else{
            alert("The task you entered is Already assigned");
        }
        inputElement.current.value = "";
              
    }
    const onKeypressHandler = (e) => {
        let key = e.key
        if(key === 'Enter'){
            onClickEvent(key)
        }
    }

    const onChangeCheckbox = (inputId) =>{
         
        
           const updatedList = list.map((val, index) => {
                 if(index === inputId){
                      (val.status === 0 )? val.status = 1 : val.status = 0;
                                     
                      
                }
                return val
            })
            setList(updatedList);
         
        }
        const onClickDelete = (inputId) =>{
            const updatedList = list.filter((val, index) =>{
                if(index === inputId){
                    localStorage.removeItem('TodoList')
                    return false;
                }
                    return val
                
            })
            setList(updatedList);
              
        }
        const onRemoveCompletedTask = (e) =>{
            const updatedNewList = list.filter((val) => val.status === 0)
                 setList(updatedNewList)
        }
    return (
        <div>
            <h1>{todoConfig.title}</h1>
            <input type="text" className="todo-inputfield" name="inputValue" ref={inputElement} onKeyPress =  {onKeypressHandler} ></input>
            <button onClick={onClickEvent} className="add-button"> {todoConfig.addTodo}</button>
            <ul>
                {list &&
                    list.map((val, index) => {
                        const todoClass = (val.status === 0)?  {class :"incomplete-todo",status: false}: {class : "completed-todo", status : true};
                        return<li style={{listStyleType:"none"}} key={index} >
                            <input type="checkbox"  id={index} name={val.status} onChange={(e) => onChangeCheckbox(index)} checked={todoClass.status}/>
                            <span className={todoClass.class}>{val.value}</span><button className="delete-button" id={index} onClick={(e) => onClickDelete(index)}>X</button>
                            </li>

                    })
                }
            </ul>
            <button onClick={onRemoveCompletedTask} className="remove-completed-button">{todoConfig.removeCompleted}</button>

        </div>
    );
}

export default AddTodoComponent;