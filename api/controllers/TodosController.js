const express = require('express');
const router = express.Router();

const Todo = require('../models/Todo');

// GETS ALL TODOS
router.get('/', function (req, res) {
    Todo.find({}, function (err, todos) {
        if (err) return res.status(500).send("Server Error!");
        res.status(200).send(todos);
    });
});

// CREATES A NEW TODO
router.post('/', function (req, res) {
    Todo.create(req.body, function (err, todo) {
        if (err) return res.json({ success: false, message: err });
        res.json({ success: true, data: todo });
    });
});

// DELETES A TODO
router.delete('/:id', function (req, res) {
    Todo.findByIdAndRemove(req.params.id, function (err, todo) {
        if (err) return res.json({ success: false, message: err });
        res.json({ success: true, data: todo });
    });
});

module.exports = router;