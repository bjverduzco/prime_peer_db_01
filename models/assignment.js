var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//schema for the assignments
var assignmentSchema = new Schema({
  assignmentNumber: Number,
  studentName: String,
  teacherName: String,
  score: Number,
  dateCompleted: Date,
  edit: Boolean
})

var assignment = mongoose.model('Assignment', assignmentSchema);

module.exports = assignment;
