import React, { useEffect, useState } from 'react';

function App(props) {
  const [list, setList] = useState([props.todoList]);

  useEffect(() => {
    setList([...list, list])
    list &&
      list.map((val) => {
        return <p>{val}</p>
      })
  })




  return (
    <div >

      <li>{list}</li>


    </div>
  );
}

export default App;
