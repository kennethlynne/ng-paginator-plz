'use strict';

describe('Directive: paginator', function () {
  var element, scope, parentScope, $compile;

  beforeEach(function () {

    module('ngPaginatorPlz', 'src/templates/paginator.html');

    inject(function ($rootScope, _$compile_) {
      parentScope = $rootScope.$new();
      $compile = _$compile_;
    });

  });

  it('should list all pages', function () {
    parentScope.data = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    parentScope.target = [];
    element = angular.element('<paginator data="data" page-size="5" export-paged-data-to="target"></paginator>');
    element = $compile(element)(parentScope);

    parentScope.$digest();
    var lis = element.find('li');

    expect(lis.length).toBe(4);
    expect(lis.eq(2).text().trim()).toBe('2');
  });

  it('should have correct internal state after initialization', function () {
    parentScope.data = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    parentScope.target = [];
    element = angular.element('<paginator data="data" page-size="5" export-paged-data-to="target"></paginator>');
    element = $compile(element)(parentScope);
    parentScope.$digest();
    scope = element.children().scope();

    expect(scope.paginator.data.length).toBe(9);
    expect(scope.paginator.pages.length).toBe(2);
    expect(scope.paginator.currentPage).toBe(1);
  });

  it('should export current page data', function () {
    parentScope.data = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    parentScope.target = [];

    parentScope.getPageData = jasmine.createSpy('getPageData');
    element = angular.element('<paginator data="data" page-size="5" export-paged-data-to="target"></paginator>');
    element = $compile(element)(parentScope);
    parentScope.$digest();
    scope = element.children().scope();

    expect(parentScope.target.length).toBe(5);
    expect(parentScope.target).toEqual([1, 2, 3, 4, 5]);
  });

  it('should be navigable', function () {
    parentScope.data = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    parentScope.target = [];

    element = angular.element('<paginator data="data" page-size="5" export-paged-data-to="target"></paginator>');
    element = $compile(element)(parentScope);
    parentScope.$digest();
    scope = element.children().scope();

    expect(scope.paginator.currentPage).toBe(1);
    expect(parentScope.target).toEqual([1, 2, 3, 4, 5]);

    scope.paginator.next();
    expect(scope.paginator.currentPage).toBe(2);
    expect(parentScope.target).toEqual([6, 7, 8, 9]);

    scope.paginator.previous();
    expect(scope.paginator.currentPage).toBe(1);
    expect(parentScope.target).toEqual([1, 2, 3, 4, 5]);
  });
});