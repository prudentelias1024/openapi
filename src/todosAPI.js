const express = require('express');
const app = express()
const todoAPI = express.Router()



app.get('/', (req,res) => {
    fs.readFile('./todos.json', 'utf-8', (err,data) => {
     if(!err) {res.send(JSON.parse(data))} else {console.log(err)}
    })
 })
 app.get('/:id', (req,res) =>{
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



app.post('/', (req,res) => {
    
    if (req.body.id !== null && req.body.task !== null && req.body.completed !== null
     ) {
    
    let products; 
    fs.readFile('./todos.json', 'utf-8', (err,data) => {
        if(!err) {
            console.log(req.body)
        todos = [...JSON.parse(data), req.body]
      
        console.log(todos)
        todos = JSON.stringify(todos)
        fs.writeFile('./todos.json',todos, 'utf-8', (err) =>{
            if(err) {console.log(err)}
        })   
        fs.readFile('./todos.json', 'utf-8', (err,data) => {
            if(!err) {res.send(data)} else {console.log(err)}
           })
    } else {console.log(err)}
       })
       
    
    } else { 
        res.status(300)
    }
})


app.delete('/:id',(req,res) => {
    const id = Number(req.params.id)
   fs.readFile('./todos.json', 'utf-8', (err,data) => {
         if(!err) {
             let todos = [...JSON.parse(data).filter((todo) => {
                 return todo.id !== id
             })]
             todos = JSON.stringify(todos)
             console.log(todos)
         fs.writeFile('./todos.json',todos, 'utf-8', (err) =>{
             if(err) {console.log(err)}
         })   
         fs.readFile('./todos.json', 'utf-8', (err,data) => {
             if(!err) {res.send(data)} else {console.log(err)}
            })
 }
 })
 })
 

 
app.put('/:id/completed', (req,res) => 
{
    const id = Number(req.params.id);
    console.log(id)
    fs.readFile('./todos.json', 'utf-8', (err,data) => {
    let todos = JSON.parse(data).filter((todo) => {
         if(todo.id == id){ todo.completed = !todo.completed } 
         return data
    })
    console.log(todos)
    todos = JSON.stringify(todos);
    fs.writeFile('./todos.json',todos, 'utf-8', (err) =>{
        if(err) {console.log(err)}
    })   
    fs.readFile('./todos.json', 'utf-8', (err,data) => {
        if(!err) {res.send(data)} else {console.log(err)}
       })



})

    
})



 module.exports = todoAPI