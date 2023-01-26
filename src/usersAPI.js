const express = require('express');
const app = express()
const userAPI = express.Router()


app.get('/users', (req,res) => {
    fs.readFile('./users.json', 'utf-8', (err,data) => {
     if(!err) {res.send(JSON.parse(data))} else {console.log(err)}
    })
 })

 app.get('/users/:property', (req,res) =>{
    let products
    fs.readFile('./users.json', 'utf-8', (err,data) => {
        if(!err) {
            let property = req.params.property
            console.log(property)
          if (property.endsWith('.com')) {
            
              products = JSON.parse(data).filter((product) => {
                  return product.email == property
              })
          } else if(property.match('[a-zA-Z][0-9]')) {
             products = JSON.parse(data).filter((product) => {
                return product.username == property
            })
          } else if(property.match('[0-9]')){
            products = JSON.parse(data).filter((product) => {
              
                return product.id == Number(property)
            })
            console.log(products)

          }
             res.send(products)
            
            }
       })
   
})


app.get('/users/profile/:img', (req,res) => {
    const img = req.params.img;
    fs.readFile(`./src/images/users/${img}`, (err,data) => {
        if(!err){res.send(data)} else {console.log(err)}
    })
})



app.post('/users', (req,res) => {
    if (req.body.id !== null && req.body.firstname !== null && req.body.lastname !== null && req.body.username !== null && req.body.gender !== null && req.body.email !== null && req.body.profile_image !== null && req.body.password) {
    
    let users; 
    fs.readFile('./users.json', 'utf-8', (err,data) => {
        if(!err) {
            console.log(req.body)
        users = [...JSON.parse(data), req.body]
      
        console.log(users)
        users = JSON.stringify(users)
        fs.writeFile('./users.json',users, 'utf-8', (err) =>{
            if(err) {console.log(err)}
        })   
        fs.readFile('./users.json', 'utf-8', (err,data) => {
            if(!err) {res.send({data: data})} else {console.log(err)}
           })
    } else {console.log(err)}
       })
       
    
    } else { 
        res.status(300)
    }
})

app.delete('/users/:id',(req,res) => {
    const id = Number(req.params.id)
   fs.readFile('./users.json', 'utf-8', (err,data) => {
         if(!err) {
             let users = [...JSON.parse(data).filter((user) => {
                 return user.id !== id
             })]
             users = JSON.stringify(users)
             console.log(users)
         fs.writeFile('./users.json',users, 'utf-8', (err) =>{
             if(err) {console.log(err)}
         })   
         fs.readFile('./users.json', 'utf-8', (err,data) => {
             if(!err) {res.send(data)} else {console.log(err)}
            })
 }
 })
 })
 

 app.get('/users/:username', (req,res) =>{
    fs.readFile('./users.json', 'utf-8', (err,data) => {
        if(!err) {
            const username = req.params.username
            
            const product = JSON.parse(data).filter((product) => {
                return product.username == username
            })
            console.log(product)
             res.send(product)
            
            }
       })
   
})

app.get('/users/:email', (req,res) =>{
    fs.readFile('./users.json', 'utf-8', (err,data) => {
        if(!err) {
            const email = req.params.email
            
            const product = JSON.parse(data).filter((product) => {
                return product.email == email
            })
             res.send(product)
            
            }
       })
   
})

module.exports = userAPI;