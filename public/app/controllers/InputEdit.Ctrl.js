app.controller("InputEditCtrl", function($scope, $timeout, $q, $location, $routeParams, localStorageService, DataFactory, StudentFactory){
  var storage = firebase.storage();
	var storageRef= firebase.storage().ref();

  $scope.cohorts = [];

  $scope.expanded = false;
  $scope.expand = () => {
    $scope.expanded = !$scope.expanded
  }

  var submit = function() {
   return localStorageService.set("studentEditing", $scope.student);
  }

  $scope.submitMessage = "Update Student"


  let studentId = $routeParams.studentId


  const pullExistingStudentIfNotOneInLocalStorageEditMode = () => {
    StudentFactory.returnOneStudent(studentId).then((data) => {
      $scope.student = data;
      $scope.$watch('student', submit, true)
      $timeout(function(){
        $(document).ready(function() {
           Materialize.updateTextFields();
           $('select').material_select();
         });
      }, 10)
    })
  }



  $scope.status = {
    personal_img: "file_upload",
    resume_draft: "file_upload",
    resume_final: "file_upload",
    resume_demo: "file_upload"
  }

  function getItem(key) {
    return $q (function(resolve, reject) {
      var student = localStorageService.get(key);
      if (student && studentId == student.studentId) {
        resolve(student)
      } else {
        pullExistingStudentIfNotOneInLocalStorageEditMode()
        reject()
      }
    })
  }

  getItem("studentEditing").then((student) => {
    $scope.student = student
    console.log($scope.student)
    $scope.$watch('student', submit, true)
    $(document).ready(function() {
      Materialize.updateTextFields();
    })
  });


  $scope.uploadImage = (bucket, img) => {
    uploadTask = storageRef.child(bucket).child(img.name).put(img);
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, function(snapshot) {
      $scope.status[bucket] = "query_builder";
      $scope.$apply();
    }, function(error) {
      Materialize.toast(`${error.message}`, 2000, "red accent-2")
    }, function() {
      $scope.status[bucket] = "check_circle";
      $scope.$apply();
      $scope.student[bucket] = uploadTask.snapshot.downloadURL;
    })
  }

  var populateDropdownCohorts = () => {
    DataFactory.returnCohortList().then((data)=> {
      $(document).ready(function() {
        $('select').material_select();
      });
      $scope.cohorts = data;
    })
  }

  var populateDropdownJobs = () => {
    DataFactory.returnPreviousExperienceList().then((data)=> {
      $(document).ready(function() {
        $('select').material_select();
      });
      $scope.previous = data;
    })
  }

  var populateDropdownDev = () => {
    DataFactory.returnTypeOfDevList().then((data)=> {
      $(document).ready(function() {
        $('select').material_select();
      });
      $scope.devTypes = data;
    })
  }

  var populateDropdownCompany = () => {
    DataFactory.returnTypeOfCompanyList().then((data)=> {
      $(document).ready(function() {
        $('select').material_select();
      });
      $scope.companyTypes = data;
    })
  }

  var populateAreaOfInterest = () => {
    DataFactory.returnAreasOfInterest().then((data)=> {
      $(document).ready(function() {
        $('select').material_select();
      });
      $scope.areaOfInterests = data;
    })
  }


    var populateAllDropDowns = () => {
      populateDropdownCompany();
      populateDropdownCohorts();
      populateDropdownJobs();
      populateDropdownDev();
      populateAreaOfInterest();
    }

    populateAllDropDowns();

    $('#self.chips').on('chip.add', function(e, chip){
      $scope.student["self_described_traits"].push(chip.tag)
    });

    $('#self.chips').on('chip.delete', function(e, chip){
      var indexOfChip = $scope.student["self_described_traits"].indexOf(chip.tag)
      $scope.student["self_described_traits"].splice(indexOfChip, 1)
    });

    $('#observed.chips').on('chip.add', function(e, chip){
      $scope.student["observed_traits"].push(chip.tag)
    });

    $('#observed.chips').on('chip.delete', function(e, chip){
      var indexOfChip = $scope.student["self_described_traits"].indexOf(chip.tag)
      $scope.student["observed_traits"].splice(indexOfChip, 1)
    });



  const populateChipsForPersonalityAutocomplete = () => {
    DataFactory.returnTypeOfPersonalityList().then((data) => {
      let materializeAutoCompleteActions = {};
      materializeAutoCompleteActions.autocompleteData = data.autocompleteData
      $(document).ready(function() {
        $('.chips-autocomplete').material_chip(materializeAutoCompleteActions)
       });
    })
  }
  populateChipsForPersonalityAutocomplete();


  $scope.populateServerside = (serverSideLang) => {
    $scope.student.id = serverSideLang.name.id;
    $scope.student.cohort_name = serverSideLang.name.name;
    $scope.student.server_side = serverSideLang.name["backend-language"];
    $scope.server_side = serverSideLang.name["backend-language"];
    $(document).ready(function() {
       Materialize.updateTextFields();
     });
  }

  $scope.updateKeyPress = (keyevent) => {
    if (keyevent.key == "Enter") {
      $scope.student["area_of_interest"].push($scope.areaOfInterestTemp);
      $scope.areaOfInterestTemp = "";
      Materialize.toast("Interest Added!", 3000, "green")
    }
  }


  $scope.updateStudent = (studentKey, studentValue) => {
    $scope.student[studentKey] = studentValue;
  }

  $scope.submitStudent = () => {
    StudentFactory.updateOneStudent($scope.student, studentId).then((data) => {
      localStorageService.remove("student");
      Materialize.toast("Student Updated!", 3000, "green")
      $location.path("/splash")
    })
  }

  $scope.submitStudentNoReturn = () => {
    StudentFactory.updateOneStudent($scope.student, studentId).then((data) => {
      localStorageService.remove("student");
      Materialize.toast("Student Updated!", 3000, "green")
    })
  }




})
