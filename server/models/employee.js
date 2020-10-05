/**
 * Title: employee.js
 * Author: Emily Richter
 * Date: 28 September 2020
 * Description: Sprint 1 -- Employee model for MongoDB collection
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Item = require('./item');

// have to explicitly tell app how to connection to database
// w/out options it will try to create a new collection
const employeeSchema = new Schema({
    employeeId: { type: String, unique: true, dropDups: true },
    firstName: { type: String },
    lastName: { type: String },
    todo: [Item],
    done: [Item]
}, { collection: 'employees' });

module.exports = mongoose.model('Employee', employeeSchema);
