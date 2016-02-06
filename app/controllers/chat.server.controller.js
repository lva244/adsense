var schedule = require('node-schedule');
var FB = require('fb');

module.exports = function(io, socket) {   
    socket.on('PostMeSchedule', function(message){
        var id="";
        console.log("Default time: "+new Date());
        var date = new Date(Date.UTC(message.year, message.month, message.date, message.hour, message.minute, 0));
        console.log("Change time: "+date);
        var job = schedule.scheduleJob(date, function(){
            FB.api(
              '/me/feed',
              'POST',
              {"message": message.text},
              function(response) {
                  if(!response.error)
                  {
                      id = {
                          id: response,
                          success: "successed"
                      };      
                      console.log(id);
                  }
                  else {
                      id = response.error;
                  }
                  io.emit('PostMeSchedule', id);
              }
            );
        });  
    });
    
    socket.on('PostMe', function(message){
        var id="";
            FB.api(
              '/me/feed',
              'POST',
              {"message": message.text},
              function(response) {
                  if(!response.error)
                  {
                      id = {
                          id: response,
                          success: "successed"
                      };          
                      console.log(id);  
                  }
                  else {
                      id = response.error;
                  }
                  io.emit('PostMe', id);
              }
            ); 
    });
    
     socket.on('PostGroup', function(message){
        var id="";
        var groupsID = message.groups;
        for(var group in groupsID)
        {
            FB.api(
              '/'+groupsID[group]+'/feed',
              'POST',
              {"message": message.text},
              function(response) {
                  if(!response.error)
                  {
                      id = {
                          id: response,
                          success: "successed"
                      };          
                      console.log(id);  
                  }
                  else {
                      id = response.error;
                  }
                  console.log(response);
                  io.emit('PostGroup', id);
              }
            ); 
        }
    });
    
     socket.on('PostGroupSchedule', function(message){
        var id="";
        var groupsID = message.groups;
        var date = new Date(Date.UTC(message.year, message.month, message.date, message.hour, message.minute, 0));
        for(var group in groupsID)
        {
            var job = schedule.scheduleJob(date, function(){
                FB.api(
                '/'+groupsID[group]+'/feed',
                'POST',
                {"message": message.text},
                function(response) {
                    if(!response.error)
                    {
                        id = {
                            id: response,
                            success: "successed"
                        };      
                        console.log(id);
                    }
                    else {
                        id = response.error;
                    }
                    io.emit('PostGroupSchedule', id);
                }
                );
            });  
        }
    });
};