app.controller("InputCtrl", function($scope){
  var storage = firebase.storage();
	var storageRef= firebase.storage().ref();

  $scope.uploadImage = (bucket, img) => {
    storageRef.child(bucket).put(img).then((data) => {
      console.log(data)
    });
  }
})
