app.controller("navCtrl", function($scope, AuthFactory){
  $(document).ready(function() {
    $(".button-collapse").sideNav();
  })

  $scope.account = {
    photo: "",
    name: "",
    email: ""
  }

  $scope.loadAccountInfo = () => {
    AuthFactory.getUser().then((user) => {
      $scope.account = {
        photo: user.photoURL,
        name: user.displayName,
        email: user.email
      }
    });
  }


  $scope.massUpdate = (cohort) => {
    console.log(cohort)
    // StudentFactory.massUpdateStudentSeekingStatus().then()
  }



  $scope.loadAccountInfo()

})
