'use strict';

angular.module('app')
        .controller('authentication.login', function($scope, $rootScope, Auth) {  //$http, $location, $window, $localStorage,
// This object will be filled by the form
$scope.user = {};

    $scope.loginfun = function() {
        Auth.login({ 
            email: $scope.user.email,
            password: $scope.user.password
        });
    };
    
    
}).controller('authentication.register', function($scope, $rootScope,  Auth) {

  $scope.register = {};

  // Register the login() function
  $scope.registerfunc = function(){
      console.log($scope.register);
   Auth.signup($scope.register);

  };
});


