angular.module('main').controller('MainController', ['$scope', '$http', 'Socket', function($scope, $http, Socket){
    $scope.name = '';
    $scope.content = "Welcome to Adsense";
    $scope.groups = [];
    $scope.accessToken = "";
    $scope.havePermission = "";
    $scope.errors = "";
    $scope.groupID = [];
    $scope.checkTimeSchedule = false;
    $scope.postMe = false;
    $scope.postGroup = false;
    $scope.sendAccessToken = function() {
        $scope.loading = "true";
        $http.post('/', JSON.stringify({
                accessToken: $scope.accessToken
            })).then(function successCallback(response)  {
            $scope.loading="";
            if(response.data.message.error)
            {
                $scope.errors = response.data.message.error;
            }
            else{
                $scope.havePermission = "true";
                $scope.name = response.data.message.name;   
                $scope.link = response.data.message.link;
                $scope.url = response.data.message.url;
                $scope.groups = response.data.message.groups;
            }
        }
        ,function errorCallback(response) {
            $scope.errors = "failure message: " + JSON.stringify({data: response.data}); 
            $scope.havePermission = '';
        });
    }
    
    Socket.on('PostMeSchedule', function(message){

        if(message.success === 'successed')
        {
            $scope.postSuccess = 'success';
        }else {
            $scope.postError = 'error';
        }
    })
    
    Socket.on('PostMe', function(message){

        if(message.success === 'successed')
        {
            $scope.postSuccess = 'success';
        }else {
            $scope.postError = 'error';
        }
    })
    
    $scope.sendMessage = function() {
        console.log(this.groupID);
        $scope.postSuccess = '';
        $scope.postError = '';
        var time = new Date(this.timeSchedule);
        var message = {
            text: this.messageText,
            year: time.getUTCFullYear(),
            month: time.getUTCMonth(),
            date: time.getUTCDate(),
            hour: time.getUTCHours(),
            minute: time.getUTCMinutes()
        };
        
        if(this.postMe || this.postMeSchedule)
        {
            if(this.checkTimeSchedule)
            {
                Socket.emit('PostMeSchedule', message);
            } else {
                Socket.emit('PostMe', message);
            }
        }else {
            $scope.postError = 'error';
        }
        
        this.messageText = '';
        this.timeSchedule = '';
    };
    
    $scope.$on('$destroy', function(){
        Socket.removeListener('PostMe');
    });
}]);

