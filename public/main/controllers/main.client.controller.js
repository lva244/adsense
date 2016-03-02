angular.module('main').controller('MainController', ['$scope', '$http', 'Socket', function($scope, $http, Socket){
    $scope.name = '';
    $scope.content = "Welcome to Adsense";
    $scope.selection = [];
    $scope.groups = [];
    $scope.accessToken = "";
    $scope.havePermission = "";
    $scope.errors = "";
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
                $scope.url = "";
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
    });
    
    Socket.on('PostMe', function(message){

        if(message.success === 'successed')
        {
            $scope.postSuccess = 'success';
        }else {
            $scope.postError = 'error';
        }
    });
    
    Socket.on('PostGroup', function(message){
        if(message.success === 'successed')
        {
            $scope.postSuccess = 'success';
        }else {
            $scope.postError = 'error';
        }
    });
    
     Socket.on('PostGroupSchedule', function(message){
        if(message.success === 'successed')
        {
            $scope.postSuccess = 'success';
        }else {
            $scope.postError = 'error';
        }
    });
    
    $scope.sendMessage = function() {
        $scope.postSuccess = '';
        $scope.postError = '';
        var time = new Date(this.timeSchedule);
        console.log("Default time: "+time.getUTCHours());
        time.setUTCHours(time.getUTCHours() - 7);
        console.log("Change time: "+time.getUTCHours());
        var message = {
            text: this.messageText,
            year: time.getUTCFullYear(),
            month: time.getUTCMonth(),
            date: time.getUTCDate(),
            hour: time.getUTCHours(),
            minute: time.getUTCMinutes(),
            groups: $scope.selection
        };
        
        if(this.postMe || this.postSchedule || this.postGroup)
        {
            //Post profile
            if(this.checkTimeSchedule)
            {
                if(this.postMe)
                {
                    Socket.emit('PostMeSchedule', message);
                }
                if(this.postGroup)
                {
                    Socket.emit('PostGroupSchedule', message);
                }
            } else {
                if(this.postMe)
                {
                    Socket.emit('PostMe', message);
                }
                if(this.postGroup)
                {
                    Socket.emit('PostGroup', message);
                }
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
    
    //Toggle Selection
    // toggle selection for a given fruit by name
    $scope.toggleSelection = function toggleSelection(groupID) {
        var idx = $scope.selection.indexOf(groupID);

        // is currently selected
        if (idx > -1) {
            $scope.selection.splice(idx, 1);
        }

        // is newly selected
        else {
            $scope.selection.push(groupID);
        }
    };
}]);

