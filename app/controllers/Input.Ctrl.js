app.controller("InputCtrl", function($scope, DataFactory){
  var storage = firebase.storage();
	var storageRef= firebase.storage().ref();

  $scope.cohorts = [];

  $scope.status = {
    personal_img: "file_upload",
    resume_draft: "file_upload",
    resume_final: "file_upload",
    resume_demo: "file_upload"
  }

  $scope.student = {
    personal_img: "",
    resume_draft: "",
    resume_final: "",
    resume_demo: ""
  }

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


    var populateAllDropDowns = () => {
      populateDropdownCompany();
      populateDropdownCohorts();
      populateDropdownJobs();
      populateDropdownDev();
    }

    populateAllDropDowns();




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


  $scope.updateStudent = (studentKey, studentValue) => {
    $scope.student[studentKey] = studentValue;
    console.log($scope.student)
  }
})
