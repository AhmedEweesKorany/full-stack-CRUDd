// import express
const express = require('express')
const app = express()

// import mysql2 to make connection with database
const mysql = require('mysql2')
const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "test"
})

//import cors after install module to allow commnuication with other pages
const cors = require('cors')
app.use(cors())

//use middleware to parse incoming JSON data
app.use(express.json())

//make get request to get products form database
app.get('/products', (req, res) => {
    const quary = "SELECT * FROM `products`"
    conn.execute(quary, (err, data) => {
        if (err) {
            res.json('error')
        }
        else {
            res.json(data)
        }
    })
})


//make post request to add product to database
app.post('/addProduct', (req, res) => {
    const { name, price, description } = req.body
    const query = "INSERT INTO `products` (name, price, description) VALUES (?, ?, ?)";
    conn.execute(query, [name, price, description], (err, data) => {
        if (err) {
            res.json('error')
        }
        else {
            res.json('user added')
        }
    })
})



//make delete request to delete product form database
app.delete('/deleteProduct/:id', (req, res) => {
    const productId = +req.params.id
    const quary = "DELETE FROM `products` WHERE id = ?"
    conn.execute(quary, [productId], (error, data) => {
        if (error) {
            res.json('error')
        }
        else if (data.affectedRows == 0) {
            res.json('user not found')
        }
        else {
            res.json('user deleted')
        }
    })
})



//make put request to update product in database
app.put('/updateProduct/:id', (req, res) => {
    const productId = +req.params.id
    const { name, price, description } = req.body
    const quary = "UPDATE `products` SET `name`=?,`price`=?,`description`=? WHERE id=?"
    conn.execute(quary, [name, price, description, productId], (error, data) => {
        if (error) {
            res.json('error')
        }
        else if (data.affectedRows == 0) {
            res.json('user not found')
        }
        else {
            res.json('user updated')
        }
    })
})


//set server port
app.listen(5000, () => {
    console.log('server is running')
})
