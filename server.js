/**
 * Module dependencie(s)
 */
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

/** 
 * App initialize
 */
const app = express();
const port = process.env.PORT || 5000;
const server = require('http').createServer(app);

/** 
 * Middleware(s)
 */
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/** 
 * API(s)
 */
require('./api/app')(app);

if (app.get('env') !== 'development') {
    /**
     * Serve static files from build directory for production
     * Visit https://polymer-library.polymer-project.org/3.0/docs/apps/build-for-production
     * for another builds
     */
    app.use(express.static(__dirname + '/client'));
    app.get('*', function (req, res) {
        res.sendFile("/client/index.html", { root: __dirname });
    });
}

/**
 * Start server
 */
server.listen(port, () => {
    console.log('Server listening on: http://localhost:%d', port);
});