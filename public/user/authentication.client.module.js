angular.module('users').factory('Authentication', [
    function() {
        this.user = window.name;
        
        return {
            user: this.user
        };
    }
]);