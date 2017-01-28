app.controller("LoginCtrl", function($scope, $timeout, AuthFactory){
  // Display Mode Variables
  $scope.regMode = false;
  $scope.account = {};
  $scope.newAccount = {
    email: "",
    password: "",
    passwordConfirm: ""
  };
  let gotALoginError = false;

  $scope.passwordMinLength = 6;

  $scope.login = () => {
    AuthFactory.authenticate($scope.account)
    .then((data) => {
      console.log(data)
    })
    .catch((error) => {
      $("#email").addClass("invalid");
      $("#password").addClass("invalid");
      Materialize.toast(`${error.message}`, 5000, "red accent-2")
      gotALoginError = true;
    })
  }

  $scope.clearValidationState = () => {
    $("#email").removeClass("invalid");
    $("#password").removeClass("invalid");
  }

  $scope.checkAndClear = () => {
    if ($scope.regMode && gotALoginError) {
      $scope.account = {};
    };

    $(document).ready(function() {
      Materialize.updateTextFields();
    });
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
  console.log($scope.newAccount.password)
    if ($scope.newAccount.password.length < 6 && !toastInitiated) {
      toastInitiated = true;
      $timeout(function () {
        if ($scope.newAccount.password.length < 6) {
          Materialize.toast('psssst. password needs to be 6 chars', 4000, "red accent-2")
        }
        toastInitiated = false;
      }, 5000);
    } else {
      $timeout.cancel();
    }
  }
  $scope.validateImmediate = () => {
    if ($scope.newAccount.password.length < 6 && !toastInitiated) {
      toastInitiated = true;
      Materialize.toast('psssst. password needs to be 6 chars', 4000, "red accent-2")
    }
    $("#passwordReg").removeClass("valid");
  }


  let toastConfirmInitiated = false;
  $scope.validateConfirm = () => {
    if ($scope.newAccount.password != $scope.newAccount.passwordConfirm && !toastConfirmInitiated && $scope.newAccount.passwordConfirm.length > 0) {
      toastConfirmInitiated = true;
      $timeout(function () {
        if ($scope.newAccount.password != $scope.newAccount.passwordConfirm) {
          Materialize.toast("passwords don't match, doofus", 4000, "red accent-2")
        }
        toastConfirmInitiated = false;
      }, 5000);
    } else {
      $timeout.cancel();
    }
  }

  $scope.validateConfirmImmediate = () => {
    if ($scope.newAccount.password != $scope.newAccount.passwordConfirm && !toastConfirmInitiated) {
      toastConfirmInitiated = true;
      Materialize.toast("passwords don't match, doofus", 4000, "red accent-2")
    }
    $("#passwordConfReg").removeClass("valid");
  }

  $scope.checkThenRegister = () => {
    $timeout.cancel();
    if ($scope.newAccount.password != $scope.newAccount.passwordConfirm) {
      $("#passwordConfReg").addClass("invalid");
    }

    if ($scope.newAccount.password.length < 6) {
      $("#passwordReg").addClass("invalid");
    }

    if ($scope.newAccount.password.length >= 6 && $scope.newAccount.password == $scope.newAccount.passwordConfirm ) {
      $scope.register();
    }
  }

})
