app.factory("DataFactory", function($q, $http, FIREBASE_CONFIG){
    let returnCohortList = () => {
      return $q((resolve, reject) => {
        $http.get(`./app/data/cohort_seed.json`)
          .then((cohorts) => {
            resolve(cohorts.data.cohorts);
          }).catch((error)=> {
            reject(error);
          });
      });
    };

    let returnPreviousExperienceList = () => {
      return $q((resolve, reject) => {
        $http.get(`./app/data/previous_experience.json`)
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
        $http.get(`./app/data/type_of_dev_seed.json`)
          .then((typeOfDev) => {
            let typeOfDevList = typeOfDev.data["type-of-dev"];
            resolve(typeOfDevList);
          }).catch((error)=> {
            reject(error);
          });
      });
    };

    return {returnCohortList: returnCohortList, returnPreviousExperienceList: returnPreviousExperienceList, returnTypeOfDevList: returnTypeOfDevList}
})
