const mongoose = require('mongoose');
const { db } = require('./config');

mongoose.connect(db, { useNewUrlParser: true, autoIndex: false });
mongoose.connection.on('connected', () => { console.log('MongoDB connection established.\nReady for client.'); });
mongoose.connection.on('error', (err) => { console.log('MongoDB connection error:' + err) });