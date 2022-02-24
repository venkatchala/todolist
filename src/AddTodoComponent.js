import { useState } from "react";

function AddTodoComponent() {
    const [value, setValue] = useState(null);
    const [list, setList] = useState([]);

    const onClickEvent = (e) => {
        e.preventDefault();


        setList([...list, value])
    }
    return (
        <div>
            <h1>Add Task To-Do</h1>
            <input type="text" name="inputValue" onChange={e => setValue(e.target.value)}></input>
            <button onClick={onClickEvent}> Add</button>

            {list &&
                list.map((val) => {
                    return <p>{val}</p>
                })


            }
        </div>
    );
}
export default AddTodoComponent;