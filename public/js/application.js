var mainApplicationModuleName = 'adsense';
var mainApplicationModule = angular.module(mainApplicationModuleName, ['ngResource', 'ngRoute', 'main', 'users']);

mainApplicationModule.config(['$locationProvider',
        function($locationProvider) {
        $locationProvider.hashPrefix('!');
 }
]);

if (window.location.hash === '#_=_') window.location.hash = '#!';

angular.element(document).ready(function() {
    angular.bootstrap(document, [mainApplicationModuleName]);
});