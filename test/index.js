/* global describe, it, beforeEach, expect, inject */
/* eslint func-names:0 */

describe('angular-ladda-lw', function() {
  let $compile;
  let $rootScope;
  let $timeout;

  beforeEach(module('angular-ladda-lw'));

  beforeEach(inject(function(_$compile_, _$rootScope_, _$timeout_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $timeout = _$timeout_;
  }));

  it('transcludes contents of button', function() {
    const scope = $rootScope.$new();
    const element = $compile("<button ladda='l'>My button text</button>")(scope);
    scope.$apply();
    expect(element.find('.ladda-lw__text').length).toBe(1);
    expect(element.find('.ladda-lw__text').text().trim()).toBe('My button text');
  });

  it('transcludes contents of button with HTML', function() {
    const scope = $rootScope.$new();
    const element = $compile("<button ladda='l'>My <strong>BUTTON</strong> text</button>")(scope);
    scope.$apply();
    expect(element.find('.ladda-lw__text strong').length).toBe(1);
  });

  it('injects spinner wrapper', function() {
    const scope = $rootScope.$new();
    const element = $compile("<button ladda='l'>My <strong>BUTTON</strong> text</button>")(scope);
    scope.$apply();
    expect(element.find('.ladda-lw__loading-wrap').length).toBe(1);
  });

  it('injects spinner', function() {
    const scope = $rootScope.$new();
    const element = $compile("<button ladda='l'>My <strong>BUTTON</strong> text</button>")(scope);
    scope.$apply();
    expect(element.find('.ladda-lw__loading-wrap .ladda-lw__loading').length).toBe(1);
  });

  describe('with l = true', function() {
    it('has --up modifier on __text', function() {
      const scope = $rootScope.$new();
      scope.l = true;
      const element = $compile("<button ladda='l'>My <strong>BUTTON</strong> text</button>")(scope);
      scope.$apply();
      expect(element.find('.ladda-lw__text.ladda-lw__text--up').length).toBe(1);
    });

    it('has --up modifier on __loader', function() {
      const scope = $rootScope.$new();
      scope.l = true;
      const element = $compile("<button ladda='l'>My <strong>BUTTON</strong> text</button>")(scope);
      scope.$apply();
      expect(element.find('.ladda-lw__loading.ladda-lw__loading--up').length).toBe(1);
    });
  });

  describe('ngDisabled', function() {
    it('preserved with ngDisabled = true, ladda = false', function() {
      const scope = $rootScope.$new();
      scope.l = false;
      scope.d = true;
      const element = $compile("<button ladda='l' ng-disabled='d'>My <strong>BUTTON</strong> text</button>")(scope);
      scope.$apply();
      expect(element.prop('disabled')).toBe(true);
    });

    it('preserved with ngDisabled = true, ladda toggled', function() {
      const scope = $rootScope.$new();
      scope.l = false;
      scope.d = true;
      const element = $compile("<button ladda='l' ng-disabled='d'>My <strong>BUTTON</strong> text</button>")(scope);
      scope.$apply();
      expect(element.prop('disabled')).toBe(true);
      scope.l = true;
      scope.$apply();
      expect(element.prop('disabled')).toBe(true);
      scope.l = false;
      scope.$apply();
      expect(element.prop('disabled')).toBe(true);
    });

    it('preserved with ngDisabled toggled, ladda = true', function() {
      const scope = $rootScope.$new();
      scope.l = true;
      scope.d = false;
      const element = $compile("<button ladda='l' ng-disabled='d'>My <strong>BUTTON</strong> text</button>")(scope);
      scope.$apply();
      expect(element.prop('disabled')).toBe(true);
      scope.d = true;
      scope.$apply();
      expect(element.prop('disabled')).toBe(true);
      scope.d = false;
      scope.$apply();
      $timeout.flush();
      expect(element.prop('disabled')).toBe(true);
    });
  });
});
