var schedule = require('node-schedule');
var FB = require('fb');

module.exports = function(io, socket) {
    
    socket.on('PostMeSchedule', function(message){
        var id="";
        var date = new Date(message.year, message.month, message.date, message.hour, message.minute, 0);
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
    
};