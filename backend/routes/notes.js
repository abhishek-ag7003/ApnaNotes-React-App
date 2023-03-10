const express = require("express");
const router = express.Router();
const fetchUser = require("../middleware/fetchUser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

// Route 1 : Get all the notes using GET "/api/auth/fetchALlNotes" -- login required

router.get("/fetch-all-notes", fetchUser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
});

// Route 2 : Add a new notes using Post "/api/notes/addNotes" -- login required

router.post(
  "/add-note",
  fetchUser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Enter a valid description").isLength({ min: 2 }),
  ],
  async (req, res) => {
    try {
      const error = await validationResult(req.body);
      if (!error.isEmpty()) {
        res.status(400).json({ error: error.array() });
      }

      // extacting title, description and tag from request
      const { title, description, tag } = req.body;
      const note = await new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });

      // saving Notes
      const saveNote = await note.save();
      saveNote
        ? res.json({ details: saveNote, msg: "Notes are saved successfully" })
        : res.send("Notes are not saved because of some error");
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal server error");
    }
  }
);


// Route 3 : update an existing notes using Post "api/notes/update-note"
router.put("/update-note/:id", fetchUser,async(req,res)=>{
try {
    const {title, description, tag} = req.body;
    const id = req.params.id

    // create a new Note Object
    const newNote = {}
    if(title){newNote.title = title};
    if(description){newNote.description = description};
    if(tag){newNote.tag = tag};

    // Find the note to be updated

    let userNoteById = await Notes.findById(id);
    if(!userNoteById){
        return res.status(404).send("Not Found")
    }
    if(userNoteById.user.toString() !== req.user.id){
        return res.status(401).send("Unauthorized user")
    }

    userNoteById = await Notes.findByIdAndUpdate(id , {$set:newNote}, {new:true})
    res.json(userNoteById)

} catch (error) {
    console.log(error);
        res.status(500).send("Internal server error");
}
});

// Route 4 : create an api to delete existing note by given id using DELETE "/api/notes/delete-note/:id"

router.delete("/delete-note/:id", fetchUser, async(req,res)=>{
    try {
        const id = req.params.id;

        //Find the user note by id passed in the parameter of the request
        const userNoteById = await Notes.findById(id);
        if(!userNoteById){
            return res.status(404).send("Not found")
        }

        // Check and allowed user to delete if the users owns that note
        // User can't delete others note
        if(userNoteById.user.toString() !== req.user.id){
            return res.status(401).send("Unauthorized user")
        }

        // If user matched by id allow him to delete the note
        let notes = await Notes.findByIdAndDelete(id)
        res.json({"msg":"Note Deleted","notes":notes})
    } catch (error) {
        console.log(error);
            res.status(500).send("Internal server error");
    }
})
module.exports = router;
