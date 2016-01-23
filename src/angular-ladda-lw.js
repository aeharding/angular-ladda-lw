angular.module('angular-ladda-lw', ['ngAnimate']).directive('ladda', function laddaDirective() {
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

      return function link(scope, iElement) {
        scope.$watch('ladda', function laddaWatch(l) {
          iElement.attr('disabled', l ? 'disabled' : false);
        });
      };
    },
  };
});
