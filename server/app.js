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

const Employees = require('./models/employee');
const { CONSOLE_APPENDER } = require('karma/lib/constants');

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
const port = 3000; // server port

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

/*
 * FindEmployees
 * Test db connection; pulls up all employees
 */
// Testing connection to database and employee connection
app.get('/api/employees', async(req, res) => {
  try {
    Employees.find({}, function(err, employees) {
      if (err) {
        console.log(err);

        res.status(500).send( {
          'message': 'Internal server error'
        })
      } else {
        console.log(employees);

        res.json(employees)
      }
    })
  } catch (e) {
    console.log(e);

    res.status(500).send( {
      'message': 'Internal server error'
    })
  }
})

/*
 * FindEmployeeById
 * Pull up employees by employeeId
 */
app.get('/api/employees/:employeeId', async(req, res) => {
  try {
    /**
     * Use the mongoose emplyee model to query MongoDB Atlas by employeeId
     */
    Employees.findOne({ employeeId: req.params.employeeId }, function(err, employee) {
      /**
       * If there is a database level error, handle by returning a server 500 error
       */
      if (err) {
        console.log(err);

        res.status(500).send({
          'message': 'Internal server error'
        })
      } else {
        /**
         * If there are no database level errors, return employee object
         * {}
         */
        console.log(employee)

        res.json(employee)
      }
    })
  } catch (e) {
    /**
     * Catch any potential errors that we didn't prepare for
     */
    console.log(e);
    res.status(500).send({
      'message':'Internal server error!'
    })
  }
})

/**
 * Create and start server
 */
http.createServer(app).listen(port, function() {
  console.log(`Application started and listening on port: ${port}`)
}); // end http create server function
