import React, { useState } from 'react'
import { useNavigate } from 'react-router'

const Reg = () => {
    const [Name, setName] = useState('')
    const [Login, setLogin] = useState('')
    const [Phone, setPhone] = useState('')
    const [Pass, setPass] = useState('')
    const [Err, setErr] = useState('')
    

    const navigate = useNavigate()

    const handleReg = async(e) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:8080/reg', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: Name,
                    phone: Phone,
                    password: Pass,
                    login: Login
                }),
            });
            const data = await res.json();
            if (res.ok) {
                navigate('/');
            } else {
                setErr(data.message);
                console.log(data.message);
            }
        } catch (error) {
            console.error(error);
            setErr('Ошибка при регистрации');
        }
    }
  return (
    <div>
        <h1>Reg</h1>
        {Err && <h2> {Err} </h2>}
        <form onSubmit={handleReg}>
            <input type="text"
            name='name'
            value={Name}
            required
            placeholder='name'
            onChange={e => setName(e.target.value)}
             />
            <input type="text"
            name='login'
            value={Login}
            required
            placeholder='login'
            onChange={e => setLogin(e.target.value)}
             />
            <input type="phone"
            name='phone'
            value={Phone}
            required
            placeholder='phone'
            onChange={e => setPhone(e.target.value)}
             />
      
            <input type="password"
            name='password'
            value={Pass}
            required
            placeholder='password'
            onChange={e => setPass(e.target.value)}
             />
             <button type='submit'>reg</button>
        </form>
    </div>
  )
}

export default Reg