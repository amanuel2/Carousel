var app = angular.module('LoginApp', ["firebase", "ngRoute", "ngCookies", 'ngMessages', 'satellizer'])


app.provider("Hash", function ()
{
    var UID = 0;
    var _getHash = function()
    {
        return UID;
    };
    return {
        getHash: _getHash,
        $get: function ()
        {
            return {
                setHash: function (value)
                {
                    UID = value;
                },
                getHash: _getHash
            }
        }
    }
})

app.config(function ($routeProvider, $cookiesProvider, $authProvider){
    
    $authProvider.facebook({
      clientId: '1649260971995288'
    });

    $authProvider.google({
      clientId: '568170512923-kogm5h6c0q0dj90k7dfnmlcot9h45f3o.apps.googleusercontent.com'
    });

    $authProvider.github({
      clientId: '8431237f25ce555610ee'
    });

    $authProvider.linkedin({
      clientId: '774o3qrw27jqgh'
    });

$authProvider.live({
       clientId: '0000000048185EC8'
     });
    // $authProvider.yahoo({
    //   clientId: 'Yahoo Client ID / Consumer Key'
    // });

    // 

    // $authProvider.twitch({
    //   clientId: 'Twitch Client ID'
    // });

    // $authProvider.bitbucket({
    //   clientId: 'Bitbucket Client ID'
    // });

    // // No additional setup required for Twitter

    // $authProvider.oauth2({
    //   name: 'foursquare',
    //   url: '/auth/foursquare',
    //   clientId: 'Foursquare Client ID',
    //   redirectUri: window.location.origin,
    //   authorizationEndpoint: 'https://foursquare.com/oauth2/authenticate',
    // });
    $routeProvider
      .when('/', {
         templateUrl: 'HtmlFiles/Inital/Home.html',
         controller: 'homeController'
      })
       .when('/signUp', {
         templateUrl: 'HtmlFiles/Auth/Registration/registration.html',
         controller: 'regController'
       })
     .when('/logIn', {
        templateUrl: 'HtmlFiles/Auth/Login/login.html',
        controller: 'loginController'
      })
      
      .when('/Chat', {
        templateUrl: 'HtmlFiles/User/Chat/Main/Chat.html',
        controller: 'chatController'
        
      })
      .when('/room', {
        templateUrl: 'HtmlFiles/User/Chat/Universal/room.html',
        controller: 'roomController'
      })
      .when('/userSettings', {
        templateUrl: 'HtmlFiles/User/Settings/UserSettings/userSettings.html',
        controller: 'userSettingsController'
      })
      .when('/404', {
          templateUrl: 'HtmlFiles/Error/404/404Page.html',
          controller:'fourofourController'
      })

     .when('/:Hash', {
            templateUrl: 'HtmlFiles/User/Chat/Private/privateRoom.html',
            controller: 'privateRoomController'
     })
      .otherwise({
        redirectTo: '/404'
      }); 
});

app.controller('Testing', ["$scope","roomService","Hash",function($scope, roomService, Hash){
  console.log("This is from the Controller Service: " + roomService.room.roomUID)
  console.log(Hash.getHash())
  }
])
app.factory("Auth", ["$firebaseAuth",
  function($firebaseAuth) {
    var ref = new Firebase("https://chattappp.firebaseio.com/");
    return $firebaseAuth(ref);
  }
]);
app.factory("AuthTwitter", ["$firebaseAuth",
  function($firebaseAuth) {
    var usersRef = new Firebase('https://socialappcarousel.firebaseio.com/');
    return $firebaseAuth(usersRef);
  }
]);
app.factory("AuthFaceBook", ["$firebaseAuth",
  function($firebaseAuth) {
    var usersRef = new Firebase('https://socialappcarousel.firebaseio.com/');
    return $firebaseAuth(usersRef);
  }
]);


app.factory("Ref", function(){
   var ref = new Firebase("https://chattappp.firebaseio.com/")
   return ref;
})

app.factory("PrivateRoomChat", function(){
  var ref = new Firebase("https://privateroomchat.firebaseio.com/")
  return ref;
})

app.factory("UniPosts" , function(){
  var ref = new Firebase("https://postss.firebaseio.com/")
   return ref;
});


app.service('getCookieService', ["$cookieStore", "$scope", 
          function($cookieStore, $scope){
            this.getCookie = function(name){
              $cookieStore.get(name)
            }
          }
    ])
    