const express=require("express");
const fetchUser = require("../middleware/fetchUser");
const Notes = require("../models/Notes.js");
const notesRouter=express.Router()
const { body, validationResult } = require("express-validator");

notesRouter.get('/fetchallnotes',fetchUser,async (req, res) => {
    const notes=await Notes.find({user:req.user})
    console.log(req.user)
  res.send(notes);
})


notesRouter.post('/addnote',fetchUser,[
   body("title", "Title should not be empty").isLength({ min: 5 }),
  body("description", "Description should not be empty").isLength({ min: 5 }),
],async (req, res) => {
    
  
  const errors = validationResult(req);
  const {title,description,tag}=req.body;
    if (!errors.isEmpty())
      res.status(400).json(errors)
    let noteObj=new Notes({
      user:req.user,title,description,tag}
    );
    console.log(noteObj.user)
    await noteObj.save();
    res.json(noteObj);

})

notesRouter.put('/updatenote/:id',fetchUser,async (req, res) => {

  const {title,description,tag}=req.body;
  const newNote={};
  if(title){newNote.title=title}
  if(description){newNote.description=description}
  if(tag){newNote.tag=tag}

  let note=await Notes.findById(req.params.id);
  if(!note)
  {
      return res.status(404).send("Not found");
  }
  // console.log(note.user.toString())
  if(note.user.toString()!==req.user)
    {
      return res.status(404).send("Not Allowed");
    }

    note=await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
    res.json(note)
})


notesRouter.delete('/deletenote/:id',fetchUser,async (req, res) => {

  
  let note=await Notes.findById(req.params.id);
  if(!note)
  {
      return res.status(404).send("Not found");
  }
  // console.log(note.user.toString())
  if(note.user.toString()!==req.user)
    {
      return res.status(404).send("Not Allowed");
    }

    note=await Notes.findByIdAndDelete(req.params.id)
    res.send("Deleted")
})




module.exports=notesRouter;

