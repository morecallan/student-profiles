app.controller("SplashCtrl", function($scope, StudentFactory){
  StudentFactory.returnAllStudents().then((data) => {
    console.log(data)
    $scope.students = data
    for (var i = 0; i < $scope.students.length; i++) {
      $scope.students[i].statusColor = colorBasedOnStatus($scope.students[i]);
    }
  })

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
