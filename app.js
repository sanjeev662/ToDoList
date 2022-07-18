//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { getDate } = require("./date");
const date = require(__dirname + "/date.js");

const app = express();

app.set("view engine","ejs");

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

//yaha se mongodb ka part suru hai

mongoose.connect("mongodb+srv://admin:admin123@todolistcluster.pr9jm.mongodb.net/toDoListDb",{useNewUrlParser:true});

const itemsSchema={
  name:String
};

const Itema=mongoose.model("Itema",itemsSchema);

const item1=new Itema({
  name: "Welcome to your toDoList!"
});

const item2=new Itema({
  name:"Lets start"
});

const defaultItems=[item1,item2];

app.get("/",function(req,res)
{
Itema.find({},function(err,foundItems){

  var day= getDate();

  if(foundItems.length==0){
    Itema.insertMany(defaultItems,function(err){
      if(err){
        console.log(err);
      }else{
        console.log("Succesfully saved default items to DB.");
      }
    });
    res.redirect("/");
  }

  else{
    res.render("lists",{listTitle:day,newListItems:foundItems});
  }
  });
});

//for adding from input

app.post("/",function(req,res)
{
  const itemName=req.body.newItem;
  
  const item=new Itema({
    name:itemName
  });
  item.save();
  console.log("Successfully added."); 
  res.redirect("/"); 
});

//for deleting from db

app.post("/delete",function(req,res){
  const checkedItemId=req.body.checkbox;

  Itema.findByIdAndRemove(checkedItemId,function(err){
    if(!err){
      console.log("Successfully deleted checked item.");
      res.redirect("/");
    }
  });
});

app.get("/work",function(req,res){
  res.render("lists",{listTitle:"WorkList"});
})

app.get("/about",function(req,res)
{
  res.render("about");
})

app.listen(3000, function(){
  console.log("Server started on port 3000.");
});