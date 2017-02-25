app.controller("SplashCtrl", function($scope, StudentFactory){

  $scope.populatePage = () => {
    StudentFactory.returnAllStudents().then((data) => {
      $scope.students = data
      for (var i = 0; i < $scope.students.length; i++) {
        $scope.students[i].statusColor = colorBasedOnStatus($scope.students[i].status);
      }
    })
  }
  $scope.populatePage();

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

  $scope.editStudentStatus = (studentId, student, status) => {
    student.status = status
    StudentFactory.updateOneStudentStatus(student, studentId).then((data) => {
      $scope.populatePage();
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
