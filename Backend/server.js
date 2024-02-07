const express = require("express");
const mongoose = require("mongoose");
const User = require("./Models/UserModel");
const app = express();
const cors = require("cors");
app.use(express.json());
const dotenv = require("dotenv");
dotenv.config();

app.use(cors());

mongoose.connect(process.env.URL)
.then(() => {
    console.log("connected successfully.");
})
.catch((err) => {
    console.log( "ERROR : ", err);
});


//create operation
app.post("/" , async (req, res) => {
    var {name, email, age} = req.body;

    try{
        const userAdded = await User.create({
            name : name,
            email : email,
            age : age
        });
        return res.status(201).json(userAdded);
    }catch(error){
        res.status(400).json({error: error.message});
    }
})

//get all users - Read operation
app.get("/" , async (req, res) => {
        const showAll = await User.find();
        res.send(showAll);
    // res.send("Server Running...");
});


// get single user using id - Read Operation
app.get("/:id" ,async (req, res) => {
        const {id} = req.params;
        const singleUser = await User.findById({_id : id});
        res.send(singleUser);
        // console.log(singleUser);
});


// delete single user using id - delete operation
app.delete("/:id" ,async (req, res) => {
        const {id} = req.params;
        const deleteUser =await User.findByIdAndDelete({_id : id});
        res.send(deleteUser);
        // console.log(deleteUser);
});


// update single user using id - Update Operation
app.patch("/:id" ,async (req, res) => {
        const {name, email, age} = req.body;
        const {id} = req.params;
        const updateUser =await User.findByIdAndUpdate(id, {name, email, age} , {
            new : true,
        });
        res.send(updateUser);
});

app.listen(process.env.PORT || 3000 , (err)=>{
    if(err)  console.log(err);
    console.log("Listing to port ", process.env.PORT);
});


