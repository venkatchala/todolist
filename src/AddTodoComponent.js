import { type } from "@testing-library/user-event/dist/type";
import { useState } from "react";
import App from "./App";

function AddTodoComponent() {
    const [value, setValue] = useState({ value: "", status: "" });
    const [list, setList] = useState([]);


    const onClickEvent = (e) => {
        e.preventDefault();
        setList([...list, value]);
    }

    return (
        <div>
            <h1>Add Task To-Do</h1>
            <input type="text" name="inputValue" onChange={e => setValue({ value: e.target.value, status: 0 })}></input>
            <button onClick={onClickEvent}> Add</button>
            <ul>
                {list &&
                    list.map((val) => {
                        return <li>{val.value}</li>

                    })

                }
            </ul>



        </div>
    );
}
export default AddTodoComponent;