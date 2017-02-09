app.controller("SplashCtrl", function($scope, StudentFactory){
  StudentFactory.returnAllStudents().then((data) => {
    console.log(data)
    $scope.students = data
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
