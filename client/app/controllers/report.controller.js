'use strict';

angular.module('app')
        .controller('createreport.controller', function($scope, $state, $window, $rootScope, ReportService, $stateParams, reportResolve) {

    var vm = this;
  
	$scope.report = {};
	
	reportResolve.date = new Date(reportResolve.date)
	//$scope.report = reportResolve
	vm.report = reportResolve;
	
	
	// create report
    $scope.reportFunc = function(isValid) {
	if (isValid) {
		
	  if (vm.report._id) {
        vm.report.$update(successCallback, errorCallback);
      } else {
        vm.report.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('home', {
          reportId: res._id
        });
		
      }

      function errorCallback(res) {
		  console.log(res);
        vm.error = res.data.message;
      }
	}
    };

});


