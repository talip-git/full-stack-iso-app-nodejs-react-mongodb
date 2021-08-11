const mongoose = require('mongoose')

const userschema = new mongoose.Schema({
    username:{
        type:String,
        min:3,
        max:10,
        required:true,
        unique:true
    },
    email:{
        type:String,
        max:50,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        min:7
    },
    qandrefs:[
        {
            standardId:{
                type:String,
            },
            clauseId:{
                type:String,
            },
            subclauseId:{
                type:String,
            },
            question:{
                type:String,
            },
            reference:{
                type:String
            },
        },
    ],
    isAdmin:{
        type:Boolean,
        default:false
    }
})
module.exports = mongoose.model('User',userschema)