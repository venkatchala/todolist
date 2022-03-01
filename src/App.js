import React, { useState, useEffect } from 'react';

function App() {

  const [name, setName] = useState({});
  const [user, setUser] = useState({});
  const [result, setResult] = useState();

  const onChangeHandler = (e) => {
    let nam = e.target.name;
    let val = e.target.value;
    setName({ ...name, [nam]: val });
  }

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setUser({ ...user, name });
    createUser();


  }

  const createUser = () => {
    const userDetail = {
      method: "POST",
      header: { 'content-type': 'application/json' },
      body: JSON.stringify({ title: user })
    }
    fetch("https://reqres.in/api/users", userDetail)
      .then(resp => resp.json())
      .then(data => setResult(data))
  }






  return (
    <div >
      <input type="text" name='name' onChange={onChangeHandler} />
      <input type="text" name='job' onChange={onChangeHandler} />
      <button onClick={onSubmitHandler}>Submit</button>

      <ul>
        <li>{result && result.id}</li>
      </ul>

    </div>
  );
}

export default App;
