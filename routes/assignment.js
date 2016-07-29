var router = require('express').Router();
var assignment = require('../models/assignment');

//this will get a list of all the assignments
router.get('/getAssignments', function(request, response){
  assignment.find({}, function(err, assignments){
    if(err){
      console.log(err);
      response.sendStatus(500);
    }
    else{
      response.send(assignments);
    }
  });
});

//this post takes in the data from the client that is input through a text box
//it will take the schema written in /models/assignment and use that as a template
//and send it to the database
router.post('/createAssignment', function(request, response){
  console.log('creating assignment');
  var data = request.body;

//creates the assignment from the request.body info
  var createdAssignment = new assignment({
    assignmentNumber: data.assignmentNumber,
    studentName: data.studentName,
    teacherName: data.teacherName,
    score: data.score,
    dateCompleted: new Date(),
    edit: false
  });

//saves the assignment to the database
  createdAssignment.save(function(err){
    if(err){
      console.log('Save err', err);
    };
  });

  // assignment.create({
  //   assignmentNumber: 1,
  //   studentName: 'Brian',
  //   teacherName: 'Ryan',
  //   score: 100,
  //   dateCompleted: new Date()
  // }, function(err){
  //   if(err){
  //     console.log('create error', err);
  //   }else{
  //     console.log('create success');
  //   }
  // })
  response.sendStatus(200);
});

//this is used to find the assignment based upon the id number
router.get('/findWithAssignmentNumber/:assignment_number', function(request, response){
  console.log(request.params.assignment_number);

  // assignment.
})

//uses the find assignment and then updates that assigment
router.put('/updateAssignment/:id/:assignmentNumber/:studentName/:teacherName/:score/:dateCompleted',
function(request, response){
  console.log('assignments.js');
  var id = request.params.id;
  var assignmentNumber = request.params.assignmentNumber;
  var studentName = request.params.studentName;
  var teacherName = request.params.teacherName;
  var score = request.params.score;
  var dateCompleted = request.params.dateCompleted;
  // console.log(id, assignmentNumber, studentName, teacherName, score, dateCompleted);
  assignment.findByIdAndUpdate(id, {$set:{assignmentNumber: request.params.assignmentNumber,
     studentName: request.params.studentName, teacherName: request.params.teacherName,
      score: request.params.score, dateCompleted: request.params.dateCompleted}}, function(err){
    if(err){
      console.log('failed to update', err);
      response.sendStatus(500);
    }
    else {
      console.log('Updated');
      response.sendStatus(200);
    }
  });
});

//remvoes the assignment based on the id
router.delete('/removeAssignment/:id', function(request, response){
  var id = request.params.id;
  console.log(id);
  assignment.findByIdAndRemove(id, function(err){
    if(err){
      console.log(err);
      response.sendStatus(500);
    }
    else{
      console.log('Assignment deleted.');
      response.sendStatus(200);
    };
  });

});
module.exports = router;
