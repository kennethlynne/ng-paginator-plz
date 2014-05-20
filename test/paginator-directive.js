'use strict';

describe('Directive: paginator', function () {
  var element, scope, parentScope, $compile;

  beforeEach(function () {

    module('YAngPaginator', 'foo');

    var data = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    inject(function ($rootScope, _$compile_) {
      parentScope = $rootScope.$new();
      parentScope.source = data;
      parentScope.getPageData = function(pageData) {
        parentScope.currentPageData = pageData;
      };
      $compile = _$compile_;
    });

  });

  it('pagination should init correctly', function () {
    var lis;
    element = angular.element('<paginator data="source" page-size="5" page-data="getPageData(pageData)"></paginator>');
    element = $compile(element)(parentScope);
    parentScope.$digest();
    lis = element.find('li');
    scope = element.children().scope();
    // pagination data ok
    expect(scope.paginator.data.length).toBe(9);
    expect(scope.paginator.pages.length).toBe(2);
    expect(scope.paginator.currentPage).toBe(1);
    // template rendering test
    expect(lis.length).toBe(4);
    expect(lis.eq(1).text().trim()).toBe('1')
    // parent scope page data init ok
    expect(parentScope.currentPageData.length).toBe(5);
    expect(parentScope.currentPageData[0]).toBe(1);
  });

  it('pagination should navi correctly', function () {
    element = angular.element('<paginator data="source" page-size="5" page-data="getPageData(pageData)"></paginator>');
    element = $compile(element)(parentScope);
    parentScope.$digest();
    scope = element.children().scope();
    // pagination data ok
    expect(scope.paginator.currentPage).toBe(1);
    // parent scope page data init ok
    expect(parentScope.currentPageData.length).toBe(5);
    expect(parentScope.currentPageData[0]).toBe(1);

    // nav next
    scope.paginator.next();
    expect(scope.paginator.currentPage).toBe(2);
    expect(parentScope.currentPageData.length).toBe(4);
    expect(parentScope.currentPageData[0]).toBe(6);

    // nav prev
    scope.paginator.previous();
    expect(scope.paginator.currentPage).toBe(1);
    expect(parentScope.currentPageData.length).toBe(5);
    expect(parentScope.currentPageData[0]).toBe(1);
  });
});
