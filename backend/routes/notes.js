const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");

// ROUTE 1: get all notes using: GET"/api/notes/getuser"
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("some error occured");
  }
});

// ROUTE 2: add a new note using: GET"/api/notes/addnote"
router.post( "/addnote", fetchuser,
  [
    body("title", "Enter valid title").isLength({ min: 3 }),
    body("description", "description must be 5 character atleast").isLength({ min: 5}),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      //if there are errors, return bad request
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savednote = await note.save();
      res.json(savednote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("some error occured");
    }
  }
);

// ROUTE 3: update an existing note using: PUT"/api/notes/updatenote" login required
router.put('/updatenote/:id', fetchuser, async (req,res)=> {
    const{title,description,tag} = req.body;
    // create newnote object
    try {
        const newNote = {};
        if(title){newNote.title = title};
        if(description){newNote.description = description};
        if(tag){newNote.tag = tag};
    
        //find note to be updated and update it
        let note = await Note.findById(req.params.id);
        if(!note){return res.status(404).send("NOt found")}
    
        console.log(note)
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("not allowed");
        }
         note = await Note.findByIdAndUpdate(req.params.id, newNote, {new:true})
         res.json({note});
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send("some error occured");
    }
   
})

// ROUTE 4: delete an existing note using: DELETE"/api/notes/deletenote" login required
router.delete('/deletenote/:id', fetchuser, async (req,res)=> {
   
   try {
    //find note to be updated and delete it
    let note = await Note.findById(req.params.id);
    if(!note){return res.status(404).send("NOt found")} //to find note with given id

    //Allow delettion only if user own this note
    if(note.user.toString() !== req.user.id){
        return res.status(401).send("not allowed"); // here we see if that id and the owners user id is same if not then dont allow
    }
     note = await Note.findByIdAndDelete(req.params.id)
     res.json({"Success": "NOte deleted"});
   } catch (error) {
     console.error(error.message);
     res.status(500).send("some error occured");
   }
    
})

module.exports = router;
