const express = require("express");
const app=express();
const port=8080;
const path=require("path");

app.use(express.urlencoded({extends:true}));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public/css")));
app.use(express.static(path.join(__dirname,"public/js")));
app.use(express.static(path.join(__dirname,"public/video")));


app.listen(port,()=>{
    console.log("app is listing");
});
app.get("/",(req,res)=>{
   res.render("home.ejs");
})
app.get("/mybatch",(req,res)=>{
   res.render("mybatch.ejs");
})
app.get("/college-reviews",(req,res)=>{
   res.render("collegereview.ejs");
})
app.get("/alpha-plus-2",(req,res)=>{
   res.render("alpha-plus.ejs");
})
app.get("/notes",(req,res)=>{
   res.render("notes.ejs");
})
app.get("/sigma-betch",(req,res)=>{
   res.render("sigma-betch.ejs");
})
app.get("/delta-betch",(req,res)=>{
   res.render("delta-3.0.ejs");
})

