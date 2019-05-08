global.__root = __dirname + '/';
require('./_global/db');

const TodosController = require(__root + 'controllers/TodosController');

module.exports = function (app) {
    app.get('/api', function (req, res) {
        res.status(200).send('Hello there! Welcome to MEPN API.');
    });

    app.use('/api/todos', TodosController);
}