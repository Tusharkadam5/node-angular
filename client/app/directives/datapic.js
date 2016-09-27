'use strict';

angular.module('app')
  .directive('datetime', [function() {
    return {
      require: 'ngModel',
      scope: {
        passwordVerify: '='
      },
      link: function(scope, element, attrs, ngModel) {
        var status = true;
		 $(function () {
                $(element).datetimepicker();
            });
			
        scope.$watch(function() {
          var combined;
         
          return combined;
        }, function(value) {
          
          
        });
      }
    };
  }]);
