'use strict';

angular.module('app')
    .directive('datetime', function () {
         //var format = 'MM/DD/YYYY hh:mm A';
	 var format = 'YYYY-MM-DD';
       /* return {
            restrict: 'A',
		require: 'ngModel',
            scope: {
                'value': '='
            },
            link: function (scope, element, attributes, ctrl) {
                element.datetimepicker({
                    format: format
                });
            }
        };*/
    return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attributes, ctrl) {
                element.datetimepicker({
                    format: format
                });

               var picker = element.data("DateTimePicker");
		//var pickerd = element.data("datetimepicker").getDate();
		//console.log(picker)
                ctrl.$formatters.push(function (value) {
					
                    var date = moment(value);
					console.log(date.format(format))
                    if (date.isValid()) {
                        return date.format(format);
                    }
                    return '';
                });

                element.on('change', function (event) {
                    scope.$apply(function() {
                        var date = picker.getDate(); // element.find("input").val(); 
                        ctrl.$setViewValue(date.valueOf());
						console.log(date)
				//		 ctrl.$render();  
                           // scope.$apply(); 
                    });
                });
            }
        };
    });