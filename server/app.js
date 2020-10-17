/**
 * Title: app.js
 * Author: Emily Richter
 * Date: 23 September 2020
 * Description: Sprint 1
 */


/**
 * Require statements
 */
const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');

const Employees = require('./models/employee'); // get employee model from models directory
const { CONSOLE_APPENDER } = require('karma/lib/constants');
const EmployeeApi = require('./routes/employee-api'); // import employee API

/**
 * App configurations
 */
let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended': true}));
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../dist/nodebucket')));
app.use('/', express.static(path.join(__dirname, '../dist/nodebucket')));

/**
 * Variables
 */
const port = process.env.PORT || 3000; // server port

// TODO: This line will need to be replaced with your actual database connection string
const conn = 'mongodb+srv://nodebucket_user:pOcAptSzBY7xAaoA@buwebdev-cluster-1.m6ctp.mongodb.net/nodebucket?retryWrites=true&w=majority';

/**
 * Database connection
 */
mongoose.connect(conn, {
  promiseLibrary: require('bluebird'),
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex:true
}).then(() => {
  console.debug(`Connection to the database instance was successful`);
}).catch(err => {
  console.log(`MongoDB Error: ${err.message}`)
}); // end mongoose connection

/**
 * APIs go here
 */
app.use('/api/employees', EmployeeApi);

/**
 * Create and start server
 */
http.createServer(app).listen(port, function() {
  console.log(`Application started and listening on port: ${port}`)
}); // end http create server function
