const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const multer = require("multer");
const PORT = 8080;
const Chat = require("./models/chat");

const app = express();

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(methodOverride("_method"));

mongoose
  .connect("mongodb://127.0.0.1:27017/whatsappDB")
  .then(() => console.log("DB Connected"))
  .catch(console.log);

  //index
  app.get("/chats", async(req,res)=>{
    const chats= await Chat.find({});
    res.render("index.ejs", {chats});
  })

  //show
  app.get("/chats/:id", async (req, res) => {

    let { id } = req.params;

    const chat = await Chat.findById(id);

    res.render("view.ejs", { chat });

});

  //create
  app.get("/chats/new", (req,res)=>{
    res.render("new.ejs");
  })

  app.post("/chats", async(req,res)=>{
    const {from, to, msg} = req.body;
    const chat = new Chat({
      from, to, msg,
    });
    await chat.save();
      res.redirect("/chats");
  })

  //edit
  app.get("/chats/:id/edit", async(req,res)=>{
    const chat= await Chat.findById(req.params.id);
    res.render("edit.ejs", {chat});
  })

  //update
  app.patch("/chats/:id", async (req, res) => {
  const { msg } = req.body;
  await Chat.findByIdAndUpdate(req.params.id,{ msg });
  res.redirect("/chats");
});

//delete
app.delete("/chats/:id", async(req,res)=>{
  let {id} = req.params;
  await Chat.findByIdAndDelete(id);
  res.redirect("/chats");

})