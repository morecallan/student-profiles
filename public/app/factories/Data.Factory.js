app.factory("DataFactory", function($q, $http, FIREBASE_CONFIG){
    let returnCohortList = () => {
      return $q((resolve, reject) => {
        $http.get(`${FIREBASE_CONFIG.databaseURL}/cohort_list.json`)
          .then((cohorts) => {
            resolve(cohorts.data.cohorts);
          }).catch((error)=> {
            reject(error);
          });
      });
    };




    let returnPreviousExperienceList = () => {
      return $q((resolve, reject) => {
        $http.get(`${FIREBASE_CONFIG.databaseURL}/previous_experience.json`)
          .then((previous_experience) => {
            let previous = previous_experience.data["previous_experience"].sort();
            previous.splice(previous.indexOf("None/Education"), 1);
            previous.splice(previous.indexOf("None/Other"), 1);
            previous.splice(previous.indexOf("Other"), 1);
            previous.push("None/Education");
            previous.push("None/Other");
            previous.push("Other");
            resolve(previous);
          }).catch((error)=> {
            reject(error);
          });
      });
    };

    let returnTypeOfDevList = () => {
      return $q((resolve, reject) => {
        $http.get(`${FIREBASE_CONFIG.databaseURL}/type_of_dev.json`)
          .then((typeOfDev) => {
            let typeOfDevList = typeOfDev.data["type-of-dev"];
            resolve(typeOfDevList);
          }).catch((error)=> {
            reject(error);
          });
      });
    };

    let returnTypeOfPersonalityList = () => {
      return $q((resolve, reject) => {
        $http.get(`${FIREBASE_CONFIG.databaseURL}/personality_traits.json`)
          .then((personalityTypes) => {
            let personalityTypeList = personalityTypes.data["personality_traits"];
            let materializeObject = {}
            materializeObject.autocompleteData = {}
            for (var i = 0; i < personalityTypeList.length; i++){
              materializeObject.autocompleteData[String(personalityTypeList[i])] = null;
            }
            resolve(materializeObject);
          }).catch((error)=> {
            reject(error);
          });
      });
    };

    let returnTypeOfCompanyList = () => {
      return $q((resolve, reject) => {
        $http.get(`${FIREBASE_CONFIG.databaseURL}/type_of_co.json`)
          .then((typeOfCo) => {
            let typeOfCoList = typeOfCo.data["type-of-dev"];
            resolve(typeOfCoList);
          }).catch((error)=> {
            reject(error);
          });
      });
    };

    let returnAreasOfInterest = () => {
      return $q((resolve, reject) => {
        $http.get(`${FIREBASE_CONFIG.databaseURL}/areas_of_interest.json`)
          .then((areaOfInterest) => {
            let areaOfInterestList = areaOfInterest.data["areas-of-interest"];
            resolve(areaOfInterestList);
          }).catch((error)=> {
            reject(error);
          });
      });
    };

    let returnFrontEndInstructorList = () => {
      return $q((resolve, reject) => {
        $http.get(`${FIREBASE_CONFIG.databaseURL}/instructors.json`)
          .then((instructors) => {
            var instructors = instructors.data["instructors"];
            resolve(instructors);
          }).catch((error)=> {
            reject(error);
          });
      });
    };

    return {returnCohortList: returnCohortList, returnPreviousExperienceList: returnPreviousExperienceList, returnTypeOfDevList: returnTypeOfDevList, returnTypeOfPersonalityList: returnTypeOfPersonalityList, returnTypeOfCompanyList: returnTypeOfCompanyList, returnAreasOfInterest: returnAreasOfInterest, returnFrontEndInstructorList: returnFrontEndInstructorList}
})
