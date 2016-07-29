angular.module('restApp', []);

angular.module('restApp').controller('RestController', function($http){
  var vm = this;
  // vm.edit = false;
  // vm.editable = function(){
  //   vm.edit = !vm.edit;
  // };


  vm.getAssignments = function(){
    $http.get('/assignment/getAssignments').then(function(response){
      console.log(response);
      vm.assignments = response.data;
      vm.assignments.edit = true;
      // vm.assignments.[assignment.edit] = false;
      // vm.assignments[response.data._id] = false;
      // console.log(vm.assignments[response.data._id]);
    }, function(response){
      console.log('Your assignments are soooooooo bad that the server couldnt find them.', response);
    })

  };

  vm.createAssignment = function(){
    // console.log('Clicked');
    var assignmentData = {};
    //takes the data from the input boxes and assigns them to a object
    assignmentData.assignmentNumber = vm.assignmentNumber;
    assignmentData.studentName = vm.studentName;
    assignmentData.teacherName = vm.teacherName;
    assignmentData.score = vm.score;
    console.log(assignmentData);

    //posts the assginmentData to the assignmentRouter
    $http.post('/assignment/createAssignment', assignmentData).then(function(response){
      console.log(response);
      vm.getAssignments();
    }, function(response){
      console.log('Your assignment is complete and utter garbage, it couldn\'t even be sent to the server.');
    });
  };

  vm.removeAssignment = function(assignmentId){
    console.log(assignmentId);
    $http.delete('/assignment/removeAssignment/' + assignmentId).then(function(response){
      console.log(response);
      vm.getAssignments();
    }, function(response){
      console.log('Could not delete,', response);
    });
  };

  vm.editAssignment = function(index){
    // console.log(assignment._id);
    vm.assignments[index].edit = !vm.assignments[index].edit;
    // console.log(assignment.edit);
    // vm.assignment[assignment._id] = !vm.assignment[assignment._id];
    // $http.put('/assignemnt/updateAssignment/' + assignmentId).then(function(response){
    //   console.log(response);
    //   vm.getAssignments();
    // }, function(response){
    //   console.log('Could not update', response);
    // });
  };

  vm.updateAssignment = function($index, assignmentId, assignmentNumber, studentName, teacherName, score, dateCompleted){
    // console.log($index, assignmentId, assignmentNumber, studentName, teacherName, score, dateCompleted);
    $http.put('/assignment/updateAssignment/' + assignmentId + '/' + assignmentNumber
    + '/' + studentName + '/' + teacherName + '/' + score + '/' + dateCompleted)
    .then(function(response){
      console.log(response);
      vm.getAssignments();
    }, function(err){
      console.log(err);
    });
  };

  vm.getAssignments();
});
