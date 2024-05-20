import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

const Account = () => {
    const id = localStorage.getItem("userId")
    const [NumCar, setNumCar] = useState('')
    const [Desc, setDesc] = useState('')
    const [Date, setDate] = useState('')
    const [Time, setTime] = useState('')
    const [ERR, setERR] = useState('')
    const [Req, setReq] = useState([])

    const navigate = useNavigate()
    

    const handleReq = async(e) =>{
        e.preventDefault(
        )

        try{
            const res = await fetch('http://localhost:8080/add', {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                numCar: NumCar,
                descript: Desc,
                date: Date,
                time: Time,
                userid: id
            })
            })
            const data = await res.json()
            if(res.ok){
                alert("Заявка отправлена")
                setDate('')
            }else{
                setERR(data.message)
                console.log("err");
            }

        }catch(error){
            console.error();
            setERR(error.message)
            console.log("err2");
        }
    }

    useEffect(() =>{
        fetch(`http://localhost:8080/req/${id}`)
        .then (data => data.json())
        .then (json => {
            setReq(json.data)
            console.log(json.data);
        })
    }, [id])

    
    const [Id, setId] = useState('')
    const handleLogout = () => {
        localStorage.removeItem("userId")
        localStorage.removeItem("role")
        setId(1)
        location.reload()
        navigate("/")
    }
    useEffect(() => {
        if (Id) {
            navigate("/")
        }
    }, [Id]); 

  return (
    <div> 
        { ERR && <h2>{ERR}</h2>}
        <h1>new request</h1>
        <form onSubmit={handleReq}>
            <input type="text" 
            name="car"
            required
            value={NumCar}
            placeholder='car'
            onChange={e => setNumCar(e.target.value)}/>
     
            <input type="text" 
            name="desc"
            required
            value={Desc}
            placeholder='desc'
            onChange={e => setDesc(e.target.value)}/>
     
            <input type="date" 
            name="date"
            required
            value={Date}
            placeholder='date'
            onChange={e => setDate(e.target.value)}/>
        
            <input type="time" 
            name="time"
            required
            value={Time}
            placeholder='time'
            min="9:00"
            max="21:00"
            onChange={e => setTime(e.target.value)}/>
        <button type='submit'>Add</button>
        </form>

        <h1>Req</h1>
        {Req.length > 0 ?(
            Req.map((e) => (
                <div className="card">
                <p>Гос. номер автомобиля: {e.numcar}</p>
                <p>Описание: {e.descript}</p>
                <p className="status"
                >{e.statusid == 1 ? 'новое' : e.statusid == 2 ? 'отклонено' : 'принято'}</p>
            </div>
            ))): (<p>no req</p>)
        }

        <button onClick={handleLogout}><h1>EXIT</h1></button>
    </div>
  )
}

export default Account