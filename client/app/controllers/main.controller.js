'use strict';
angular.module('app')
        .controller('main.controller',function($scope, $window,  $state, $rootScope, $http, $location, Auth,  ReportService ) {
		var vm = this;

		//ReportService.getReportList();
		if(Auth.isLoggedIn){
		//$state.go('home')
		
		 vm.reports = ReportService.query();
		 vm.reports.date = new Date(vm.reports.date)
		// $rootScope.reports = vm.reports;
		
		$rootScope.removeItem = function(report){
		
		report.$deleteReort(function(ids){
		var del_index = vm.reports.findIndex(function(d){
			return d._id == ids._id
			});
			
			//if index of the id to be removed found
			if(del_index>=0)
			vm.reports.splice(del_index, 1);

			},function(err){
			  // error
			  console.log(err);
			})

		}
		}else{
			$state.go('login')
		}
        // console.log(Auth.isLoggedIn());
});

