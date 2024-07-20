const express=require('express');
const app=express();
require('dotenv/config');
//bodyparser
const bodyParser=require('body-parser');
//morgan for  middleware
const morgan=require('morgan');






app.use(morgan('tiny'))
app.use(bodyParser.json());



const port=process.env.PORT || 8080;
const api=process.env.API



app.get(api+"home",(req,res)=>{
    const product={
        name:"Laptop",
        price:10000,
        description:"This is a laptop"
    }
    //send json and msg ans status
   
  
    res.status(200).json({ data: product, status: 200 ,msg:"APi Succesfully executed"});
    console.log(req.headers);
})

app.post(api+"product",(req,res)=>{
const product=req.body;
  
    res.status(200).json({ data: req.body, status: 200 ,msg:"APi Succesfully executed"});
    console.log(product);
})

//listen server
app.listen(port,(err)=>{
    if(err) console.log(err);
    console.log(`server is running on port http://localhost:${port}`);
    });
