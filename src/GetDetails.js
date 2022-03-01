import React, { useEffect, useState } from "react";

function GetDetails() {
    const [alluser, setAllUser] = useState([]);
    useEffect(() => {

        fetch("https://reqres.in/api/users?page=2")
            .then(response => response.json())
            .then(data => setAllUser(data.data))
    }, [])


    return (

        <div style={{ display: "flex" }}>{
            alluser.map((value) => <div id={value.id} key={value.id} style={{ width: "150px", height: "150px", margin: "10px" }}>
                <img src={value.avatar} style={{ width: "150px", height: "150px" }} />
                <p>{value.first_name + " " + value.last_name}</p>
            </div>)

        }

        </div>

    )
}

export default GetDetails;