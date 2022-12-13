const express = require('express');
const app = express();
const Port = process.env.PORT || 3000
const path = require('path')
const fs = require('fs')
const router = express.Router()
const bodyParser = require('body-parser');
const { type } = require('os');

app.use(express.static('src'))
app.use('/images', express.static(__dirname + 'src/images'))
app.use('/css', express.static(__dirname + 'src/css'))
app.use('/js', express.static(__dirname + 'src/js'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname,'/src/index.html'))
})
app.get('/docs', (req,res) => {
    res.sendFile(path.join(__dirname,'/src/documentation.html'))
})
app.get('/products', (req,res) => {
   fs.readFile('./products.json', 'utf-8', (err,data) => {
    if(!err) {res.send(JSON.parse(data))} else {console.log(err)}
   })
})

app.get('/todos', (req,res) => {
   fs.readFile('./todos.json', 'utf-8', (err,data) => {
    if(!err) {res.send(JSON.parse(data))} else {console.log(err)}
   })
})

app.get('/users', (req,res) => {
    fs.readFile('./users.json', 'utf-8', (err,data) => {
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

app.get('/products/:id', (req,res) =>{
    fs.readFile('./products.json', 'utf-8', (err,data) => {
        if(!err) {
            const id = req.params.id
            
            const product = JSON.parse(data).filter((product) => {
                return product.id == id
            })
             res.send(product)
            
            }
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

// app.get('/user/:username', (req,res) =>{
//     fs.readFile('./users.json', 'utf-8', (err,data) => {
//         if(!err) {
//             const username = req.params.username
            
//             const product = JSON.parse(data).filter((product) => {
//                 return product.username == username
//             })
//             console.log(product)
//              res.send(product)
            
//             }
//        })
   
// })

// app.get('/uses/:email', (req,res) =>{
//     fs.readFile('./users.json', 'utf-8', (err,data) => {
//         if(!err) {
//             const email = req.params.email
            
//             const product = JSON.parse(data).filter((product) => {
//                 return product.email == email
//             })
//              res.send(product)
            
//             }
//        })
   
// })



app.get('/productThumbnail/:img', (req,res) => {
    const img = req.params.img;
    fs.readFile(`./src/images/products/${img}`, (err,data) => {
        if(!err){res.send(data)} else {console.log(err)}
    })
})
app.get('/profile/:img', (req,res) => {
    const img = req.params.img;
    fs.readFile(`./src/images/users/${img}`, (err,data) => {
        if(!err){res.send(data)} else {console.log(err)}
    })
})


app.post('/products', (req,res) => {
    if (req.body.id !== null && req.body.name !== null && req.body.price !== null && req.body.price !== null && req.body.catchword !== null && req.body.productOwner !== null && req.body.dateUploaded !== null) {
    
    let products; 
    fs.readFile('./products.json', 'utf-8', (err,data) => {
        if(!err) {
            console.log(req.body)
        products = [...JSON.parse(data), req.body]
      
        console.log(products)
        products = JSON.stringify(products)
        fs.writeFile('./products.json',products, 'utf-8', (err) =>{
            if(err) {console.log(err)}
        })   
        fs.readFile('./products.json', 'utf-8', (err,data) => {
            if(!err) {res.send({data: data})} else {console.log(err)}
           })
    } else {console.log(err)}
       })
       
    
    } else { 
        res.status(300)
    }
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


app.post('/todos', (req,res) => {
    
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


app.delete('/products/:id',(req,res) => {
   const id = Number(req.params.id)
  fs.readFile('./products.json', 'utf-8', (err,data) => {
        if(!err) {
            let products = [...JSON.parse(data).filter((product) => {
                return product.id !== id
            })]
            products = JSON.stringify(products)
            console.log(products)
        fs.writeFile('./products.json',products, 'utf-8', (err) =>{
            if(err) {console.log(err)}
        })   
        fs.readFile('./products.json', 'utf-8', (err,data) => {
            if(!err) {res.send(data)} else {console.log(err)}
           })
}
})
})

app.delete('/todos/:id',(req,res) => {
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
 

app.put('/products/:id/price', (req,res) => 
{
    const id = Number(req.params.id);
   
    fs.readFile('./products.json', 'utf-8', (err,data) => {
    let products = JSON.parse(data).filter((product) => {
         if(product.id == id){ product.price = req.body.price } 
         return data
    })
    console.log(products)
    products = JSON.stringify(products);
    fs.writeFile('./products.json',products, 'utf-8', (err) =>{
        if(err) {console.log(err)}
    })   
    fs.readFile('./products.json', 'utf-8', (err,data) => {
        if(!err) {res.send(data)} else {console.log(err)}
       })



})

    
})

app.put('/products/:id', (req,res) => {
    const id = req.params.id
    if (req.body.id !== null && req.body.name !== null && req.body.price !== null && req.body.price !== null && req.body.catchword !== null && req.body.productOwner !== null && req.body.dateUploaded !== null && req.body.size !== null) {

   let products; 
    fs.readFile('./products.json', 'utf-8', (err,data) => {
        if(!err) {
            console.log(data)
            products =JSON.parse(data).filter((product) => {
                if(product.id == id){ 
                    product.id = req.body.id
                    product.size = req.body.size
                    product.name = req.body.name
                    product.price = req.body.price
                    product.catchword = req.body.catchword
                    product.productOwner = req.body.productOwner
                    product.dateUploaded = req.body.dateUploaded
                } 
                return data 
                
           })
           products = [...products,]
        fs.writeFile('./products.json',JSON.stringify(products), 'utf-8', (err) =>{
            if(err) {console.log(err)}
        })   
        fs.readFile('./products.json', 'utf-8', (err,data) => {
            if(!err) {res.send( data)} else {console.log(err)}
           })
    } else {console.log(err)}
       })
       
    
    } else { 
        res.status(300)
    }
})

app.put('/todo/:id/completed', (req,res) => 
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


app.listen(Port, () => {
    console.log(`Server Running On Port ${Port}`);
})