const mongoose = require('mongoose')
const subSchema = new mongoose.Schema({
    number:{
        type:Number,
    },
    desc:{
        type:String
    },
})
const standardSchema = new mongoose.Schema({
    standardType:{
        type:String,
    },
    clauses:[
        {
            number:{
                type:Number,
            },
            desc:{
                type:String,
            },
            subclauses:[subSchema]
        }
    ]
},
{
    timestamps:true
})
module.exports = mongoose.model('Standards',standardSchema)