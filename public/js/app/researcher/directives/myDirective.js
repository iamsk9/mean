
myapp.filter('showDate', function() {
    return function(input) {
        return moment(input).format("DD-MM-YYYY");
    }
});

myapp.directive('dateFix', function() {
    return {
        require: 'ngModel',
        link: function(scope, elem, attrs, ngModel) {
            var toView = function(val) {
                return val;
            };

            var toModel = function(val) {
                var offset = moment(val).utcOffset();
                var date = new Date(moment(val).add(offset, 'm'));
                return date;
            };

            ngModel.$formatters.unshift(toView);
            ngModel.$parsers.unshift(toModel);
        }
    };
});
