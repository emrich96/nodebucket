/**
 * Title: item.js
 * Author: Emily Richter
 * Date: 28 September 2020
 * Description: Sprint 2 -- Item model for employee model
 */


const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let itemSchema = new Schema({
  text: {type: String}
});

module.exports = itemSchema;
