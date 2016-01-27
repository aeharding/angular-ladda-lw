'use strict';

angular.module('angular-ladda-lw', ['ngAnimate']).directive('ladda', function laddaDirective($timeout) {
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

      return function link(scope, iElement, iAttrs) {
        scope.$watch('ladda', function laddaWatch(l) {
          if (!angular.isDefined(l)) return;

          iElement.attr('disabled', l ? 'disabled' : false);

          // When the button also have the ng-disabled directive it needs to be
          // re-evaluated since the disabled attribute is removed
          if (!l && iAttrs.ngDisabled && scope.$parent.$eval(iAttrs.ngDisabled)) {
            iElement.attr('disabled', 'disabled');
          }
        });

        if (iAttrs.ngDisabled) {
          scope.$parent.$watch(iAttrs.ngDisabled, function ngDisabledWatch(d) {
            if (d === false && scope.ladda) {
              // We have to wait for ngDisabled to propagate. I wish there was a
              // better way to do this. Ideas?
              $timeout(function () {
                iElement.attr('disabled', 'disabled');
              });
            }
          });
        }
      };
    }
  };
});
