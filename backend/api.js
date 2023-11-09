//adding dependencies
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const app = express();

//adding middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//create mysql server

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "test",
});

//get request
app.get("/",(req,res)=>{
    const getQuery = "SELECT * FROM `userinfo`"

    connection.execute(getQuery,(err,data)=>{
        if(err){
            res.json("error")
        }else{
            res.json(data)
        }
    })
})

//post request 
app.post("/adduser",(req,res)=>{
    const {name , Email,address,phone} = req.body
    const addQuery =`INSERT INTO userinfo( name, Email, address, phone) VALUES (?,?,?,?)`
    connection.execute(addQuery,[name,Email,address,phone],(err,data)=>{
        if(err){
            res.json("eroor happend")
        }else{
            res.json("user added succesflly")
        }
    })
})

//delete request

app.delete("/deleteuser/:id",(req,res)=>{
    const userID = +req.params.id
    const deleteQuery = "DELETE FROM `userinfo` WHERE id=?"
    connection.execute(deleteQuery,[userID],(err,data)=>{
        if(err){
            res.json("error happend")

        }else if(data.affectedRows === 0){
            res.json("user id not found")
        }
        else{
            res.json("product deleted successfully")
        }
    })
})

//delete all

app.delete("/deleteAll",(req,res)=>{
    const deletaAll = "DELETE FROM `userinfo`"

    connection.execute(deletaAll,(err,data)=>{
        if(err){
            res.end(err)
        }else{
            res.end("all data has been deleted")
        }
    })
})

app.put("/updateuser/:id",(req,res)=>{
    const userID = req.params.id
    const {name,Email,address,phone} = req.body
    const updateQuery= "UPDATE `userinfo` SET `name`=?,`Email`=?,`address`=?,`phone`=? WHERE id =?"
    connection.execute(updateQuery,[name,Email,address,phone,userID],(err,data)=>{
        if(err){
            res.json(err)
        }else if(data.affectedRows === 0 ){
            res.json("user not found")
        }else{
            res.json("user updated succesflly")
        }
    })
})


app.listen(5000,()=>{
    console.log("server is runign now at http://localhost:5000");
})