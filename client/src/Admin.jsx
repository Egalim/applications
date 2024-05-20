import React, { useEffect, useState } from 'react'

const Admin = () => {
  const [Info, setInfo] = useState([])
  console.log(Info);
  useEffect(()=>{
    fetch('http://localhost:8080/req/')
    .then( data => data.json())
    .then( json => setInfo(json.data))
  }, [])
  const handleClick = (status, id) => {
    fetch("http://localhost:8080/admin", {
      method: "PATCH",
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({
        status,
        id
      })
    })
  }
  return (
    <div>
      {
        Info.length > 0 ? (
          Info.map((e) =>(
            <div className="card">
                <p>Гос. номер автомобиля: {e.numcar}</p>
                <p>Описание: {e.descript}</p>
                <button onClick={() => handleClick(2, Info[0].id)}>YEEES</button>
                <button onClick={() => handleClick(3, Info[0].id)}>NO</button>
            </div>
          ))
        ): (
          <p>No req</p>
        )
      }
    </div>
  )
}

export default Admin