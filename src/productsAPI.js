const express = require('express');
const app = express()
const productsAPI = express.Router()

app.get('/products', (req,res) => {
    fs.readFile('./products.json', 'utf-8', (err,data) => {
     if(!err) {res.send(JSON.parse(data))} else {console.log(err)}
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



app.get('/product/:img', (req,res) => {
    const img = req.params.img;
    fs.readFile(`./src/images/products/${img}`, (err,data) => {
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
 
module.exports = productsAPI
