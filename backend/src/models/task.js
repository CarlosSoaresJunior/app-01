const mongoose = require('../database/index');
const bcrypt = require('bcrypt');

const TaskSchema= new mongoose.Schema({
    title:{
        type: String,
        require: true,
    },
    project:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        require: true,
    },
    assingnedTo:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true,
    },
    complete:{
        type: Boolean,
        require: true,
        default:false
    },
    createdAt:{
        type: Date,
        default: Date.now,
    },
});

 
const Tasks = mongoose.model('Tasks', TaskSchema)

module.exports = Tasks;