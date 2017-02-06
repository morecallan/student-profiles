app.controller("SplashCtrl", function($scope, StudentFactory){
  StudentFactory.returnAllStudents().then((data) => {
    console.log(data)
    $scope.students = data
  })
})
