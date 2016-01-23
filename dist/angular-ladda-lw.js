'use strict';

angular.module('angular-ladda-lw', ['ngAnimate']).directive('ladda', function laddaDirective() {
  return {
    restrict: 'A',
    scope: {
      ladda: '='
    },
    compile: function compile(element, attrs) {
      var lLoading = attrs.ladda;

      element.addClass('ladda-lw');

      var textWrap = angular.element('\n        <div class="ladda-lw__text"\n             ng-class="{\'ladda-lw__text--up\': ' + lLoading + '}">\n        </div>\n      ');

      textWrap.append(element.contents());
      element.append(textWrap);

      var loadingWrap = angular.element('<div class="ladda-lw__loading-wrap"></div>');
      var loading = angular.element('\n        <div class="ladda-lw__loading"\n             ng-class="{\'ladda-lw__loading--up\': ' + lLoading + '}">\n        </div>\n      ');

      loadingWrap.append(loading);
      element.append(loadingWrap);

      return function link(scope, iElement) {
        scope.$watch('ladda', function laddaWatch(l) {
          iElement.attr('disabled', l ? 'disabled' : false);
        });
      };
    }
  };
});
