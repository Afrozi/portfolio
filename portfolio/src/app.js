const express = require("express");
const app = express();
const port = 8000;
const mongoose = require("mongoose");
const path = require("path");
const methodoverride = require("method-override");
const  engine = require('ejs-mate');
const static_path = path.join(__dirname,"../public");
const staticpath = path.join(__dirname,"../views/particials");
app.set("views",staticpath);
app.use(methodoverride("_method"));
app.use(express.static(static_path));
app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}));
app.engine('ejs', engine);
require("./db/connect");
const chat = require("./model/model");
// show router
app.get("/show", async(req,res)=>{
   let chats = await chat.find();
   console.log(chats);
   res.render("show",{chats});
})
// create router
app.get("/",(req,res)=>{
    res.render("index");
})
// insert create router
app.post("/show",(req,res)=>{
    let {name,email,description} = req.body;
    let newdata = new chat({
        name,
        email,
        description,
    });
    // console.log(newdata);
    newdata.save();
    res.redirect("/show");
})
// update router
app.get("/show/:id/edit", async(req,res)=>{
    let {id} = req.params;
    let upchat = await chat.findById(id);
    res.render("edits",{upchat});
})
// update data router
app.put("/show/:id", async(req,res)=>{
    let {id} = req.params;
    let {name:newname,email:newemail,description:newdescription} = req.body;
   let updatedata = await chat.findByIdAndUpdate(id,{
    name:newname,
    email:newemail,
    description:newdescription,
   },{runValidators:true,new:true})
   console.log(updatedata);
   res.redirect("/show");
})
//delete router
app.delete("/show/:id", async(req,res)=>{
    let {id} = req.params;
    let deletechat = await chat.findByIdAndDelete(id)
    console.log(deletechat);
    res.redirect("/show");
})
app.get("*",(req,res)=>{
    res.send("page is a not found");
})
app.listen(port,()=>{
    console.log("connected");
})