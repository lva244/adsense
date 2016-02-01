var FB = require('fb');

exports.render = function(req, res){
    if(req.session.lastVisit){
        console.log(req.session.lastVisit);
    }
    
    req.session.lastVisit = new Date();
    
    res.render('index', {
        title: 'Adsense',
        content: 'Welcome to Adsense'   
    });
};

exports.verifyAccessToken = function(req, res){
    var accessToken = req.body.accessToken;
    FB.setAccessToken(accessToken);
    var message = "";
    FB.api(
              '/me',
              'GET',
              {"fields":"name,link,picture{url},groups{name}"},
              function(response) {
                  if(!response.error)
                  {
                    var profile = response;
                    id = profile.id;
                    message = {
                        url: profile.picture.data.url,
                        link: profile.link,
                        name: profile.name,
                        groups: response.groups.data
                    };
                    console.log(response.groups.data);
                  }
                  else {
                      message = response;
                  }
                  res.send({
                      message
                  });
              }
            );        
};