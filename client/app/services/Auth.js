angular.module('app')
  .factory('Auth', function($http, $location, $rootScope, $alert, $window, $state, $localStorage) {
    var token = $localStorage.token;
    if (token){
      var payload = parseJwt(token); //JSON.parse($window.atob(token.split('.')[1]));
      $rootScope.currentUser = payload.user;
    }
	
// parsing token
 function parseJwt(token) {

        return JSON.parse($window.atob(token.split('.')[1]));
      }


    return {
        isLoggedIn: function(){
          var token = $localStorage.token;

          if(token){
            var payload = parseJwt(token);
            //console.log(payload.exp > Date.now() / 1000);
           // console.log(payload.exp +' > '+ Date.now() / 1000);
            return payload.exp > Date.now() / 1000;
            $rootScope.currentUser = payload.user;
          } else {
            $rootScope.currentUser =null;
            return false;
          }
        },
      login: function(user) {
        return $http.post('/login', user)
          .success(function(data) {
            //  console.log(data)
            $localStorage.token = data.token;
  
           // var payload = JSON.parse($window.atob(data.token.split('.')[1]));
            var payload = parseJwt(data.token);
            $rootScope.currentUser = payload.user;
            $location.path('/home');
           // $state.go('home');
            $rootScope.message = data.message;
            $alert({
              title: 'Cheers!',
              content: data.message, //'You have successfully logged in.',
              animation: 'fadeZoomFadeDown',
              type: 'material',
              duration: 3
            });
          })
          .error(function(err) {
            delete $localStorage.token;
            delete $window.localStorage.token;
            $rootScope.message = err.message;
            $rootScope.currentUser =null;
            $alert({
              title: 'Error!',
              content: err.message, //'Invalid username or password.',
              animation: 'fadeZoomFadeDown',
              type: 'material',
              duration: 3
            });
          });
      },
      
      signup: function(user) {
		 // console.log(user)
        return $http.post('/register', user)
          .success(function(data) {
            $location.path('/login');
            $rootScope.message = data.message;
            $alert({
              title: 'Congratulations!',
              content:data.message, // 'Your account has been created.',
              animation: 'fadeZoomFadeDown',
              type: 'material',
              duration: 3
            });
          })
          .error(function(response) {
			  console.log(response)
            $rootScope.message = response.message;
            $rootScope.currentUser =null;
            $alert({
              title: 'Error!',
              content: response.message,
              animation: 'fadeZoomFadeDown',
              type: 'material',
              duration: 3
            });
          });
      },
      

      logout: function() {
        delete $localStorage.token;
        delete $window.localStorage.token;
       
        $rootScope.currentUser = null;
        $state.go('login');
       // $location.path('/')
        $rootScope.message = 'You have been logged out.';
        $alert({
          content: 'You have been logged out.',
          animation: 'fadeZoomFadeDown',
          type: 'material',
          duration: 3
        });
      }
    };
  });
  
  