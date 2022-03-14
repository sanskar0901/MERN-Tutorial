const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const oneTaskSchema = new Schema({
    task:{
        type: String,
    },
    status:{
        type: String,
    }
});

const taskSchema = new Schema({
    userId: {
        type:String,
        required:true,
        unique:true,
        trim:true,
        minlength: 1        
    },
    task: {
        type:[oneTaskSchema],
        minlength: 1        
    }
},{
    timestamps: true,
});

const Tasks = mongoose.model('Tasks', taskSchema);

module.exports = Tasks;