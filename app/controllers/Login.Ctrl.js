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

  $scope.register = () => {
    AuthFactory.registerWithEmail($scope.account)
    .then((data) => {
      console.log(data)
    })
    .catch((error) => {
      console.log(error)
    })
  }


  // $scope.validate = () => {
  // let toastSent = false;
  //   if ($scope.newAccount.password.length < 6) {
  //     $timeout(function () {
  //       if (!toastSent) {Materialize.toast('psssst. password needs to be 6 chars', 5000, "gray")}
  //       toastSent = true;
  //     }, 5000);
  //   } else {
  //     $timeout.cancel();
  //   }
  // }
  //
  // let matchToastSent = false;
  // $scope.validateConfirm = () => {
  //   if ($scope.newAccount.password !== $scope.newAccount.confirm && !matchToastSent) {
  //     $timeout(function () {
  //       if (!toastSent) {Materialize.toast("those don't even match, doofus", 5000, "gray")}
  //       matchToastSent = true;
  //     }, 6000);
  //   } else {
  //     matchToastSent = false;
  //     $timeout.cancel();
  //   }
  // }

})
