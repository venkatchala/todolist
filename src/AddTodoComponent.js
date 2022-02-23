import { useEffect, useState } from "react";

function AddTodoComponent() {
    const [value, setValue] = useState([null]);

    useEffect = () => {
        setValue(...value, [value])
    }
    const handleronChange = (e) => {
        setValue(e.target.value);
    }
    const onClickEvent = () => {
        const value = { value }
    }
    return (
        <div>
            <h1>Add Task To-Do</h1>
            <input type="text" name={value} onChange={handleronChange}></input>
            <button onClick={onClickEvent}> Add</button>
            <h1>{value}</h1>

        </div>
    );
}
export default AddTodoComponent;