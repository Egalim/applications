import React, { useEffect, useState } from 'react'
import {Link, useNavigate} from "react-router-dom"

const Auth = () => {
    const id = localStorage.getItem("userid")
    const [Phone, setPhone] = useState('')
    const [Pass, setPass] = useState('')
    const [Err, setErr] = useState('')
    const [Ex, setEx] = useState('')
    
    const navigate = useNavigate()

    const handleAuth = async(e) =>{
        e.preventDefault()
        try{
            const res = await fetch('http://localhost:8080/auth', {
                method: "POST",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify({
                    password: Pass,
                    phone: Phone
                })
            }, [id])
            
            const json = await res.json()
                if(res.ok){
                    localStorage.setItem("userId", json.id)
                    localStorage.setItem("role", json.role)
                    location.reload()
                    navigate("/")
                }else{
                    setErr(json.message)
                }

        }catch(error){
            console.error(error);
            setErr(error.message)
        }  
    }
 
    
  return (
    <div>
        <Link to="/reg">reg</Link>
        <h1>Auth</h1>
        {Err && <h2>{Err} </h2>}
        <form onSubmit={handleAuth}>
        <input type="phone"
            name='phone'
            required 
            value={Phone}
            onChange={e => setPhone(e.target.value)}
            placeholder='phone'/>
            <input type="password"
            name='pass'
            required
            value={Pass}
            onChange={e => setPass(e.target.value)} />
            <button type="submit">Войти</button>
        </form>

        
    </div>
  )
}

export default Auth