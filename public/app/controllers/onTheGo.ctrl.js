app.controller("OnTheGoCtrl", function($scope, DataFactory){
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
})
