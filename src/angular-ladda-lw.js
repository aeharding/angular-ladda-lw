angular.module('angular-ladda-lw', ['ngAnimate']).directive('ladda', ['$timeout', function laddaDirective($timeout) {
  return {
    restrict: 'A',
    scope: {
      ladda: '=',
    },
    compile: (element, attrs) => {
      const lLoading = attrs.ladda;

      element.addClass('ladda-lw');

      const textWrap = angular.element(`
        <div class="ladda-lw__text"
             ng-class="{'ladda-lw__text--up': ${lLoading}}">
        </div>
      `);

      textWrap.append(element.contents());
      element.append(textWrap);

      const loadingWrap = angular.element(`<div class="ladda-lw__loading-wrap"></div>`);
      const loading = angular.element(`
        <div class="ladda-lw__loading"
             ng-class="{'ladda-lw__loading--up': ${lLoading}}">
        </div>
      `);

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
              $timeout(() => {
                iElement.attr('disabled', 'disabled');
              });
            }
          });
        }
      };
    },
  };
}]);
