/**
 * Title: employee.js
 * Author: Emily Richter
 * Date: 23 September 2020
 * Description: Sprint 1 -- Employee model for MongoDB collection
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// have to explicitly tell app how to connection to database
// w/out options it will try to create a new collection
const employeeSchema = new Schema({
    employeeId: { type: String, unique: true, dropDups: true },
    firstName: { type: String },
    lastName: { type: String },
    toDoTasks: { type: Array },
    doneTasks: { type: Array }
}, { collection: 'employees' });

module.exports = mongoose.model('Employees', employeeSchema);
