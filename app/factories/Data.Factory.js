app.factory("DataFactory", function($q, $http, FIREBASE_CONFIG){
  //Firebase: GOOGLE - Use input credentials to authenticate user.
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

    return {returnCohortList: returnCohortList}
})
