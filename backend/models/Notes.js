const mongoose = require('mongoose')
const {Schemas} = mongoose;

const NotesSchema = new Schemas({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true,
    },
    tag:{
        type:String,
    },
    timestamp:{
        type:Date,
        default:Date.now
    },
    

});

module.exports = mongoose.model('notes',NotesSchema)