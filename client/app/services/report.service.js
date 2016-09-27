angular.module('app')
  .factory('ReportService', function($http, $resource, $location, $rootScope, $alert, $window, $state, $localStorage) {
   
   return $resource('api/reports/:reportId', {
      reportId: '@_id'
    }, {
      update: {
        method: 'PUT'
      },
	  deleteReort: {
            method: 'DELETE'
        }
    });
	
  });
  
  