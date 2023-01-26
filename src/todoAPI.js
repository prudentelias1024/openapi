const express = require('express');
const app = express()
const todoAPI = express.Router()



app.get('/todos', (req,res) => {
    fs.readFile('./todos.json', 'utf-8', (err,data) => {
     if(!err) {res.send(JSON.parse(data))} else {console.log(err)}
    })
 })
 app.get('/todos/:id', (req,res) =>{
    fs.readFile('./todos.json', 'utf-8', (err,data) => {
        if(!err) {
            const id = req.params.id
            
            const product = JSON.parse(data).filter((product) => {
                return product.id == id
            })
             res.send(product)
            
            }
       })
   
})
 