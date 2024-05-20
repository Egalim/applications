import express  from "express"
import cors from "cors"
import bcrypt from "bcrypt"
import { sql } from "./db.js"

const port = 8080
const app = express()
app.use(cors())
app.use(express.json())
     
app.post("/reg", async(req, res) => {
    const {name, login, phone,  password} = req.body

    if( !name || !login || !phone || !password){ 
        return res.send({message: "no data"})
    }

    const ifuser = await sql`select * from Users where phone = ${phone}`

    if( ifuser[0]){
        return res.send({message: "no unique"})
    }

    const hashPass = bcrypt.hashSync(password, 11)
    const data = await sql` insert into Users
     (name, login, password, phone, roleid) values 
    (${name}, ${login}, ${hashPass}, ${phone}, 1) returning *`
    res.send({data})
}) 
    
app.post("/auth", async(req, res) => {
    const {phone, password} = req.body
    const user = await sql`select * from Users where phone = ${phone}`
    if (!user[0]){
        res.send({message: "no user"})
    }
    const validPass = bcrypt.compareSync(password, user[0].password)
    if(!validPass){
        res.send({message: "no pass"})
    }
    res.send({id: user[0].id, role: user[0].roleid})
}) 
      
app.post("/add", async(req, res)=>{
    const {numCar, descript, date, time, userid} = req.body
     const data = await sql`insert into Requests 
     (numCar, descript, date, time, userid, statusid)
     values (${numCar}, ${descript}, ${date}, ${time}, ${userid}, 1) returning *`
     res.send(data)
})
 
app.get("/req/:id", async(req, res) => {
    const id = req.params.id
    const data = await sql`select * from Requests where userid = ${id}`
    res.send({data})
})

app.get("/req", async(req, res)=>{
    const data = await sql`select * from Requests where statusid = 1`
    res.send({data})
})

app.patch("/admin", async(req, res)=>{
    const { status, id} = req.body
    console.log("Received status:", status);
    console.log("Received id:", id);
    
    if (!id || !status) {
        return res.status(400).send({ message: "Missing id or status" });
      }
    const data = await sql`update Requests set statusid = ${status} where id = ${id} returning *`
    res.send(data)
})
const start = async() => {
    await sql`create table if not exists Statuses(
        id serial primary key not null,
        status varchar(255) not null
    )`

    await sql`create table if not exists Roles(
        id serial primary key not null, 
        role varchar(255) not null
    )`
    //await sql`insert into Roles (role) values ('USER'), ('ADMIN') returning *`
    //await sql`insert into Statuses (status) values ('новое'), ('подтверждено'), ('отклонено') returning *`


    await sql`create table if not exists Users(
        id serial primary key not null,
        name varchar(255) not null,
        phone int not null,
        login varchar(255) not null,
        password varchar(255) not null, 
        roleid int not null,
        foreign key (roleid) references Roles(id)
    )`

    await sql`create table if not exists Requests(
        id serial primary key not null,
        numCar varchar(255) not null,
        descript varchar(255) not null,
        date varchar(255) not null,
        time varchar(255) not null,
        userid int not null,
        statusid int not null,
        foreign key (statusid) references Statuses(id),
        foreign key (userid) references Users(id)
    )`
    app.listen(port, () => {
        console.log(`РАботает на порту ${port}`);
    })
}

start()