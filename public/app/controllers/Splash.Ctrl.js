app.controller("SplashCtrl", function($scope, StudentFactory){
  StudentFactory.returnAllStudents().then((data) => {
    console.log(data)
    $scope.students = data
    for (var i = 0; i < $scope.students.length; i++) {
      $scope.students[i].statusColor = colorBasedOnStatus($scope.students[i]);
    }
  })

  // $scope.modalOpen = true;

  $scope.modalShift = (context) => {
    context.modalOpen = !context.modalOpen;
  }

  $scope.deleteStudent = (studentId) => {
    StudentFactory.deleteStudent(studentId).then((data) => {
      $scope.students = data
    })
  }

  const colorBasedOnStatus = (status) => {
    if (status == "enrolled") {
      return "yellow"
    } else if (status == "seeking") {
      return "green"
    } else {
      return "red"
    }
  }
})
