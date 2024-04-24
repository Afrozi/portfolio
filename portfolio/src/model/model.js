const mongoose = require("mongoose");
const newmongoose = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true
    },
});

let chat = mongoose.model("bigner",newmongoose);
module.exports = chat;