app.controller("InputEditCtrl", function($scope, $location, $routeParams, DataFactory, StudentFactory){
  var storage = firebase.storage();
	var storageRef= firebase.storage().ref();

  $scope.cohorts = [];

  $scope.submitMessage = "Update Student"


  let studentId = $routeParams.studentId


  StudentFactory.returnOneStudent(studentId).then((data) => {
    $(document).ready(function() {
       Materialize.updateTextFields();
     });
    $scope.student = data;
  })


  $scope.status = {
    personal_img: "file_upload",
    resume_draft: "file_upload",
    resume_final: "file_upload",
    resume_demo: "file_upload"
  }



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
      Materialize.toast("Student Updated!", 3000, "green")
      $location.path("/splash")
    })
  }




})
