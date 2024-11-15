//Create web server
const express = require('express');
const app = express();
//To use the body of the request
const bodyParser = require('body-parser');
app.use(bodyParser.json());
//To use the comments model
const { Comment } = require('./models');
//To use the database
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/commentsdb');
//Create a new comment
app.post('/comments', (req, res) => {
    const newComment = new Comment({
        name: req.body.name,
        message: req.body.message
    });
    newComment.save().then((commentDoc) => {
        res.send(commentDoc);
    });
});
//Get all comments
app.get('/comments', (req, res) => {
    Comment.find().then((comments) => {
        res.send(comments);
    });
});
//Get a comment by id
app.get('/comments/:id', (req, res) => {
    Comment.findById(req.params.id).then((comment) => {
        if (comment) {
            res.send(comment);
        } else {
            res.sendStatus(404);
        }
    });
});
//Update a comment by id
app.put('/comments/:id', (req, res) => {
    Comment.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        message: req.body.message
    }).then((comment) => {
        if (comment) {
            res.sendStatus(200);
        } else {
            res.sendStatus(404);
        }
    });
});
//Delete a comment by id
app.delete('/comments/:id', (req, res) => {
    Comment.findByIdAndRemove(req.params.id).then((comment) => {
        if (comment) {
            res.send(comment);
        } else {
            res.sendStatus(404);
        }
    });
});
//Start the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});