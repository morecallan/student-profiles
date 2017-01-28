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
    AuthFactory.registerWithEmail($scope.newAccount)
    .then((data) => {
      console.log(data)
    })
    .catch((error) => {
      console.log(error)
    })
  }


  let toastInitiated = false;

  $scope.validate = () => {
  $timeout.cancel();
    if ($scope.newAccount.password.length < 6 && !toastInitiated) {
      toastInitiated = true;
      $timeout(function () {
        if ($scope.newAccount.password.length < 6) {
          Materialize.toast('psssst. password needs to be 6 chars', 5000, "gray")
        }
        toastInitiated = false;
      }, 3000);
    } else {
      $timeout.cancel();
    }
  }

  let toastConfirmInitiated = false;

  $scope.validateConfirm = () => {
    if ($scope.newAccount.password != $scope.newAccount.passwordConfirm && !toastConfirmInitiated) {
      toastConfirmInitiated = true;
      $timeout(function () {
        if ($scope.newAccount.password != $scope.newAccount.passwordConfirm) {
          Materialize.toast("passwords don't match, doofus", 5000, "gray")
        }
        toastConfirmInitiated = false;
      }, 3000);
    } else {
      $timeout.cancel();
    }
  }

  $scope.checkThenRegister = () => {
    $timeout.cancel();
    if ($scope.newAccount.password != $scope.newAccount.passwordConfirm) {
      $("#passwordConfReg").addClass("invalid");
    }

    if ($scope.newAccount.password.length < 6) {
      $("#passwordReg").addClass("invalid");
    }

    if ($scope.newAccount.password.length >= 6 && $scope.newAccount.password != $scope.newAccount.passwordConfirm) {
      $scope.register();
    }
  }

})
