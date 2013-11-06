(function (window, document, undefined) {
  var getModule = function(angular) {
    return angular.module('seo', []).run(['$rootScope', '$timeout',
      function($rootScope, $timeout) {
        $rootScope.htmlReady = function() {
          $rootScope.$evalAsync(function() { // fire after $digest
            $timeout(function() { // fire after DOM rendering
              if (typeof window.callPhantom === 'function') { 
                window.callPhantom();
              }
            }, 0);
          });
        };
        $rootScope.$on('$viewContentLoaded', $rootScope.htmlReady);
      }
    ]);
  };
  if (typeof define === 'function' && define.amd) {
    define(['angular'], getModule);
  } else {
    getModule(angular);
  }
}(window, document));
