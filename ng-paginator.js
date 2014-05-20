'use strict';

angular.module('ngPaginator', [])
  .directive('paginator', ['Paginator', function (Paginator) {
    return {
      restrict: 'E',
      scope: {
        data: '=',
        pageSize: '@',
        pageData: '&' //export paginated data to parent scope
      },
      templateUrl: 'paginator.html',
      controller: ['$scope', function ($scope) {
        // set page size
        $scope.pageSize = Number($scope.pageSize || 20);

        function _pagination() {
          $scope.paginator = new PG({
            data: $scope.data,
            pageSize: $scope.pageSize
          });
          // update current page data in parent scope
          $scope.$watch('paginator.currentPageData', function () {
            $scope.pageData({pageData: $scope.paginator.currentPageData})
          });
        }

        $scope.$watch('data', _pagination);
      }]
    };
  }])
  .factory('Paginator', function () {
    function Paginator(cfg) {
      this.data = [];
      this.pages = [];
      this.currentPageData = [];
      this.pageSize = cfg && cfg.pageSize ? cfg.pageSize : 20;
      this.currentPage = 1;
      this.setData(cfg && cfg.data || []);
    }

    Paginator.prototype.next = function () {
      var paginator = this;
      if (paginator.hasNext()) {
        paginator.setPage(paginator.currentPage + 1);
      }
    };

    Paginator.prototype.previous = function () {
      var paginator = this;
      if (paginator.hasPrevious()) {
        paginator.setPage(paginator.currentPage - 1);
      }
    };

    Paginator.prototype.setPage = function (page) {
      var paginator = this;
      paginator.currentPage = page;
      paginator.getPaginatedData();
    };

    Paginator.prototype.getCurrentPageNumber = function () {
      var paginator = this;
      return paginator.currentPage;
    };

    Paginator.prototype.getNumberOfPages = function () {
      var paginator = this;
      return Math.ceil(paginator.data.length / paginator.pageSize);
    };

    Paginator.prototype.getPaginatedData = function () {
      var paginator = this;
      paginator.currentPageData.length = 0;
      var pagedItems = paginator.data.slice((paginator.currentPage - 1) * paginator.pageSize, paginator.currentPage * paginator.pageSize);
      Array.prototype.push.apply(paginator.currentPageData, pagedItems);
      return paginator.currentPageData;
    };

    Paginator.prototype.setData = function (data) {
      var paginator = this,
        nrOfPages;

      paginator.data.length = 0;
      paginator.pages.length = paginator.getNumberOfPages();

      if (angular.isArray(data)) {
        Array.prototype.push.apply(paginator.data, data);
      }
      paginator.getPaginatedData();

      nrOfPages = paginator.getNumberOfPages();
      for (var i = 0; i < nrOfPages; i++) {
        paginator.pages.push({});
      }
    };

    Paginator.prototype.hasPrevious = function () {
      var paginator = this;
      return paginator.getCurrentPageNumber() > 1;
    };

    Paginator.prototype.hasNext = function () {
      var paginator = this;
      return paginator.getCurrentPageNumber() < paginator.getNumberOfPages();
    };

    return Paginator;
  });
