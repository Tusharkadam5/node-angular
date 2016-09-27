'use strict';

angular.module('app')
        .controller('navbarContr', function($scope, $rootScope, $localStorage, $window, Auth){
   // $rootScope.loginstatus =false;
        $scope.athmenu = [{
          "title": "Login",
          "link": "login"
        },{
          "title": "Register",
          "link": "register"
        }];

    $scope.logout = function() {
     Auth.logout();
    };

});