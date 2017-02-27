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

  }

  $scope.loadAccountInfo()

})
