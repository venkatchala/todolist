import { useState } from "react";
import App from "./App";

function AddTodoComponent() {
    const [value, setValue] = useState(null);
    const [list, setList] = useState(null);


    const onClickEvent = (e) => {
        e.preventDefault();


        setList(list, value)
    }
    return (
        <div>
            <h1>Add Task To-Do</h1>
            <input type="text" name="inputValue" onChange={e => setValue(e.target.value)}></input>
            <button onClick={onClickEvent}> Add</button>
            <ul>
                <App todolist={list}></App>
            </ul>



        </div>
    );
}
export default AddTodoComponent;