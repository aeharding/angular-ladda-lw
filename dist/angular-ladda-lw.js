angular.module('ladda-lw', ['ngAnimate']).directive('ladda', function() {
  return {
    restrict: 'A',
    scope: {
      ladda: '='
    },
    compile: function(element, attrs) {
      var lLoading = attrs['ladda'];

      element.addClass('ladda-lw');

      var textWrap = angular.element('<div class="ladda-lw__text" ng-class="{\'ladda-lw__text--up\': ' + lLoading + '}"></div>');

      textWrap.append(element.contents());
      element.append(textWrap);

      var loadingWrap = angular.element('<div class="ladda-lw__loading-wrap"></div>');
      var loading = angular.element('<div class="ladda-lw__loading" ng-class="{\'ladda-lw__loading--up\': ' + lLoading + '}"></div>');

      loadingWrap.append(loading);
      element.append(loadingWrap);

      return function link(scope, iElement, iAttrs) {
        scope.$watch('ladda', function(l) {
          iElement.attr('disabled', l ? 'disabled' : false);
        });
      }
    }
  }
});
