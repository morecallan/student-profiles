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
      console.log(user)
      $scope.account = {
        photo: user.photoURL,
        name: user.displayName,
        email: user.email
      }
    });
  }

  $scope.loadAccountInfo()

})
