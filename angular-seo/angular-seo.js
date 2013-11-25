(function (window, document, angular, undefined) {
  angular.module('seo', []).run(['$rootScope', '$timeout',
    function($rootScope, $timeout) {
      if (typeof window.callPhantom === 'function') {
        $rootScope.htmlReady = function() {
          $rootScope.$evalAsync(function() { // fire after $digest
            $timeout(function() { // fire after DOM rendering
              window.callPhantom();
            }, 0);
          });
        };
        $rootScope.$on('$viewContentLoaded', $rootScope.htmlReady);
      }
    }
  ]);
}(window, document, angular));
