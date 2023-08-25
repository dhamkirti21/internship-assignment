const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    mobile:{
        type:Number,
        required:true,
    },
    dateofBirth:{
        type:Date,
        required:true,
    },
    workExperince:{
        type:String,
        default:"",
    },
    resumeTitle:{
        type:String,
        default:"",
        required:true
    },
    currentLocation:{
        type:String,
        default:"",
    },
    postalAddress:{
        type:String,
        default:"",
    },
    currentEmployer:{
        type:String,
        default:"",
    },
    currentDesignation:{
        type:String,
        default:"",
    }
},{timestamps:true})


const Candidate =  mongoose.model("Candidate",candidateSchema);

module.exports = Candidate;

