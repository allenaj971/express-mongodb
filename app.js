const express = require("express");
const db = require("./connection.js");
const app = express();
const postModel = require("./postModel.js");

// our server 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// our post request to send a new article
app.post('/', async (req, res) => {
    // deconstruct title and content from request body
    const { title, content } = req.body;

    // it will try to create a newPost object from our schema model 
    // then it will send it as a response to us
    try {
        const newPost = await postModel.create({ title, content });
        res.json(newPost);
    } catch (error) {
        res.status(500).send(error);
    }

});

// get all posts
app.get('/', async (req, res) => {
    // it will try to find our posts
    // then it will send it as a response to us
    try {
        const post = await postModel.find();
        res.json(post);
    } catch (error) {
        res.status(500).send(error);
    }
});

// filter posts by id
app.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const post = await postModel.findById(id);
        res.json(post);
    } catch (error) {
        res.status(500).send(error);
    }
});

// used to update the post based on id
app.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;

    try {
        const post = await postModel.findByIdAndUpdate(id, { title, content });
        res.json(post);
    } catch (error) {
        res.status(500).send(error);
    }
});

// delete post
app.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const post = await postModel.findByIdAndDelete(id);
        res.json("Deleted sucessfully!");
    } catch (error) {
        res.status(500).send(error);
    }
});

// our application
app.listen(3000, () => {
    console.log(`Listening to port 3000`);
});

