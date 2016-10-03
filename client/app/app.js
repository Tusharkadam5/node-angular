'use strict';

var app = angular.module('app', ['ui.router', 'ngStorage',
    'angular-loading-bar', 'ngMessages', 'mgcrea.ngStrap', 'ngResource', 'datatables']);

app.config( function( $stateProvider, $urlRouterProvider, $httpProvider) { 
       $urlRouterProvider.otherwise("/");
       
 $stateProvider
         .state('home', {
                url: '/',
                templateUrl: 'partials/home.html',
                controller: 'main.controller',
				controllerAs: 'vm'
				
            }).state('register', {
                url: '/register',
                templateUrl: 'partials/register.html',
                controller: 'authentication.register'
            }).state('login', {
                url: '/login',
                templateUrl: 'partials/login.html',
                controller: 'authentication.login'
            }).state('create', {
                url: '/create',
                templateUrl: 'partials/report.html',
				controller: 'createreport.controller',
				controllerAs: 'vm',
				resolve: {
				reportResolve: newReport
				}
                
            }).state('edit', {
                url: '/:reportId/edit',
                templateUrl: 'partials/report.html',
				controller: 'createreport.controller',
				controllerAs: 'vm',
				resolve: {
					reportResolve: getReports
				}
                
            });
			
		  newReport.$inject = ['ReportService'];

			  function newReport(ReportService) {
				return new ReportService();
			  }
  
		getReports.$inject = ['$stateParams', 'ReportService'];
		// getReportByid
		  function getReports($stateParams, ReportService) {
				return ReportService.get({
				  reportId: $stateParams.reportId
				}).$promise;
			  }
  
            $httpProvider.interceptors.push(['$q', '$location', '$localStorage', '$rootScope', function($q, $location, $localStorage, $rootScope) {
            return {
                'request': function (config) {
                    $rootScope.message ="";
                    config.headers = config.headers || {};
                    if ($localStorage.token) {
                        config.headers.Authorization = 'Bearer ' + $localStorage.token;

                    }
                    return config;
                },
                'responseError': function(response) {
					$rootScope.message ="";
					console.log(response)
                    if(response.status === 401 || response.status === 403) {
                       
                       $rootScope.currentUser =null;
                       $rootScope.message = response.data.message; 
                       //console.log(response.data.message);
                        delete $localStorage.token;
                        //delete $window.localStorage.token;
                        $location.path('/login');
						$rootScope.message = response.data.message; 
                    }
                    return $q.reject(response);
                }
            };
        }]);
});

app.run(function($http, $rootScope, $window){
               // add JWT token as default auth header
              //stateChangeStart
				$rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
					
                });
            });;