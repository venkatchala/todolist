import React, { useState, useEffect } from "react";
import './AddTodoComponent.css'

function AddTodoComponent() {
    const [value, setValue] = useState({ value: "", status: null });
    const [list, setList] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    
    

useEffect(() =>{
    if(!isLoaded){
        setIsLoaded(true);
        setList(JSON.parse(localStorage.getItem('TodoList')))
        
    }else{
        localStorage.setItem('TodoList', JSON.stringify(list));
    }
  

})

    const onClickEvent = (e) => {
        e.preventDefault();
        let x = list.map((name) => name.value).indexOf(value.value)
        if(x === -1){
           
            setList([...list, value]);
            
        } else{
            alert("The value you entered is Already present");
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
    return (
        <div>
            <h1>Add Task To-Do</h1>
            <input type="text" name="inputValue" onChange={e => setValue({ value: e.target.value, status: 0 })}></input>
            <button onClick={onClickEvent}> Add</button>
            <ul>
                {list &&
                    list.map((val, index) => {
                        const todoClass = (val.status === 0)?  "InCompleteTodo": "CompletedTodo";
                        return<li style={{listStyleType:"none"}} key={index} >
                            <input type="checkbox"  id={index} name={val.status} onChange={(e) => onChangeCheckbox(index)}/>
                            <span className={todoClass}>{val.value}</span><button id={index} onClick={(e) => onClickDelete(index)}>X</button>
                            </li>

                    })
                }
            </ul>
        </div>
    );
}

export default AddTodoComponent;