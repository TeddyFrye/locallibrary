var express = require("express");
var router = express.Router();
var { Author, Story } = require("../models/author"); // Ensure Story is exported from models/authors

// POST request to add a new author
router.post("/", async (req, res, next) => {
  try {
    var newAuthor = new Author({ name: req.body.name });
    var author = await newAuthor.save();
    res.status(201).json(author);
  } catch (err) {
    next(err);
  }
});

router.post("/:authorId/stories", async (req, res, next) => {
  try {
    const { title } = req.body;
    const authorId = req.params.authorId;

    // Create a new story
    const story = new Story({ title, author: authorId });
    await story.save();

    // Find the author and add this story to their list of stories
    const author = await Author.findById(authorId);
    if (!author) {
      return res.status(404).json({ message: "Author not found" });
    }

    author.stories.push(story._id);
    await author.save();

    res.status(201).json({ story, author });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
