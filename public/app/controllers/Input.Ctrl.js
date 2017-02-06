app.controller("InputCtrl", function($scope, $q, $location, DataFactory, StudentFactory, localStorageService){
  var storage = firebase.storage();
	var storageRef= firebase.storage().ref();

  $scope.submitMessage = "Add Student"


  var submit = function() {
   return localStorageService.set("student", $scope.student);
  }


  $scope.$watch('student', submit, true)
  $scope.$watch('student.area_of_interest', submit, true)
  $scope.$watch('student.company_type', submit, true)
  $scope.$watch('student.dev_type', submit, true)
  $scope.$watch('student.linkedin', submit, true)
  $scope.$watch('student.observed_traits', submit, true)
  $scope.$watch('student.portfolio', submit, true)
  $scope.$watch('student.previous_experience', submit, true)
  $scope.$watch('student.resume', submit, true)
  $scope.$watch('student.self_described_traits', submit, true)

  $scope.expanded = false;
  $scope.expand = () => {
    $scope.expanded = !$scope.expanded
  }

  $scope.cohorts = [];

  $scope.status = {
    personal_img: "file_upload",
    resume_draft: "file_upload",
    resume_final: "file_upload",
    resume_demo: "file_upload"
  }

  $scope.student = {
    area_of_interest: [],
    cohort_name: "",
    company_type: [],
    dev_type: [],
    first_name: "",
    last_name: "",
    linkedin: {},
    networking_notes: "",
    observed_traits: [],
    other_notes: "",
    personal_img: "",
    portfolio: {
      format: "",
      general: "",
      projects: ""
    },
    prediction: "",
    previous_experience: [],
    previous_experience_notes: "",
    resume: {
      formatting: "",
      general: "",
      nss_job_description: "",
      previous_work_history: "",
      projects: ""
    },
    resume_demo: "",
    resume_draft: "",
    resume_final: "",
    self_described_traits: [],
    server_side: "",
    student_concerns: "",
    target_companies: "",
    type_of_co_preferred_notes: "",
    type_of_dev_notes: ""
  }

  function getItem(key) {
    return $q (function(resolve, reject) {
      var student = localStorageService.get(key);
      if (student) {
        resolve(student)
      } else {
        reject()
      }
    })
  }

  getItem("student").then((student) => {
    $scope.student = student
    $(document).ready(function() {
      Materialize.updateTextFields();
    })
  });


  $scope.uploadImage = (bucket, img) => {
    uploadTask = storageRef.child(bucket).put(img);
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
    StudentFactory.addNewStudent($scope.student).then((data) => {
      localStorageService.remove("student");
      Materialize.toast("Student Added!", 3000, "green")
      $location.path("/splash")
    })
  }
})
