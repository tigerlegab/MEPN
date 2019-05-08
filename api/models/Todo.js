const mongoose = require('mongoose');
const TodoSchema = new mongoose.Schema({
    todo: {
        type: String,
        required: true
    }
});
mongoose.model('Todo', TodoSchema);

module.exports = mongoose.model('Todo');