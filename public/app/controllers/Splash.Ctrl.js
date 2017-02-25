app.controller("SplashCtrl", function($scope, StudentFactory){
  StudentFactory.returnAllStudents().then((data) => {
    $scope.students = data
    for (var i = 0; i < $scope.students.length; i++) {
      $scope.students[i].statusColor = colorBasedOnStatus($scope.students[i].status);
    }
  })

  $scope.modalOpen = false;
  $scope.editModalOpen = false;

  $scope.modalShift = (context) => {
    context.modalOpen = !context.modalOpen;
  }

  $scope.editModalShift = (context) => {
    context.editModalOpen = !context.editModalOpen;
  }

  $scope.closeAllModals = (context, event) => {
    if ((context.editModalOpen || context.modalOpen) && event.target.className.indexOf("material-icons") == -1) {
      context.editModalOpen = false;
      context.modalOpen = false;
    }
  }

  $scope.deleteStudent = (studentId) => {
    StudentFactory.deleteStudent(studentId).then((data) => {
      $scope.students = data
    })
  }

  $scope.editStudentStatus = (studentId, status) => {
    console.log(studentId, status)
    // StudentFactory.editStudentStatus(studentId, status).then((data) => {
    //   $scope.students = data
    // })
  }



  const colorBasedOnStatus = (status) => {
    console.log(status)
    if (status == "enrolled") {
      return "yellow"
    } else if (status == "seeking") {
      return "green"
    } else {
      return "red"
    }
  }
})
