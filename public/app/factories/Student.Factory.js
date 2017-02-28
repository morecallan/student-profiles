"use strict"

app.factory("StudentFactory", function($q, $http, $rootScope, FIREBASE_CONFIG) {

  const colorBasedOnStatus = (status) => {
    if (status == "enrolled") {
      return "yellow"
    } else if (status == "seeking") {
      return "green"
    } else {
      return "red"
    }
  }


  var addNewStudent = function(student){
          return $q(function(resolve, reject) {
              $http.post(
                  `${FIREBASE_CONFIG.databaseURL}/students.json`,
                  JSON.stringify(student)
              )
              .then((data) => {
                console.log(data)
                resolve(data);
              }, (error) => reject(error));
          });
      };

  var updateOneStudent = function(student, studentId){
          console.log(studentId)
          return $q(function(resolve, reject) {
              $http.put(
                  `${FIREBASE_CONFIG.databaseURL}/students/${studentId}.json`,
                  JSON.stringify(student)
              )
              .then((data) => {
                console.log(data)
                resolve(data);
              }, (error) => reject(error));
          });
      };

  var updateOneStudentStatus = function(student, studentId){
          return $q(function(resolve, reject) {
              $http.put(
                  `${FIREBASE_CONFIG.databaseURL}/students/${studentId}.json`,
                  student
              )
              .then((data) => {
                resolve(data)
              }, (error) => reject(error));
          });
      };

  var returnAllStudents = function() {
    return $q(function(resolve, reject) {
        $http.get(
            `${FIREBASE_CONFIG.databaseURL}/students.json`)
        .then((data) => {
          data = data.data
          var students = [];
                if (data === null) {
                     var students = [];
                } else {
                  Object.keys(data).forEach(function(key){ //using the keys method on js's object. loops through the object and pulls out our keys and returns array of keys. for each of these keys
                      data[key].id=key; //go through the item collection object by each key and sets the id value to the key value
                      students.push(data[key]); //pushes each itemCollection object to the $scope array
                  });
                  //Updates Status Color On Card for Students
                  for (var i = 0; i < students.length; i++) {
                    students[i].statusColor = colorBasedOnStatus(students[i].status);
                  }
                  resolve(students);
              }
        }, (error) => reject(error));
    });
  }

  var returnOneStudent = function(accessKey) {
    return $q(function(resolve, reject) {
        $http.get(
            `${FIREBASE_CONFIG.databaseURL}/students/${accessKey}.json`)
        .then((data) => {
          data = data.data
          data.studentId = accessKey;
          resolve(data);
        }, (error) => reject(error));
    });
  }

  const deleteStudent = (studentId) => {
    return $q(function(resolve, reject) {
        $http.delete(
            `${FIREBASE_CONFIG.databaseURL}/students/${studentId}.json`)
        .then((data) => {
          returnAllStudents().then((students) => {
            resolve(students);
          })
        }, (error) => reject(error));
    });
  }

  return {addNewStudent: addNewStudent, returnAllStudents: returnAllStudents, returnOneStudent: returnOneStudent, updateOneStudent: updateOneStudent, deleteStudent: deleteStudent, updateOneStudentStatus: updateOneStudentStatus}

})
