app.controller("LoginCtrl", function($scope, $timeout, AuthFactory){
  // Display Mode Variables
  $scope.loginMode = true;
  $scope.account = {};
  $scope.newAccount = {};

  $scope.login = () => {
    AuthFactory.authenticate($scope.account)
    .then((data) => {
      console.log(data)
    })
    .catch((error) => {
      console.log(error)
    })
  }

  $scope.loginGoogle = () => {
    AuthFactory.authenticateGoogle()
    .then((data) => {
      console.log(data)
    })
    .catch((error) => {
      console.log(error)
    })
  }

  let toastSent = false;
  $scope.validate = () => {
    if ($scope.newAccount.password.length < 6 && !toastSent) {
      toastSent = true;
      $timeout(function () {
        Materialize.toast('psssst. password needs to be 6 chars', 5000, "gray")
      }, 5000);
    } else {
      toastSent = false;
      $timeout.cancel();
    }
  }

})
