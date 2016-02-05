var app = angular.module('LoginApp', ["firebase", "ngRoute", "ngCookies", 'ngMessages'])


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

app.config(function ($routeProvider, $cookiesProvider){
    $routeProvider
      .when('/', {
         templateUrl: 'HtmlFiles/Home.html',
         controller: 'homeController'
      })
       .when('/signUp', {
         templateUrl: 'HtmlFiles/registration.html',
         controller: 'regController'
       })
     .when('/logIn', {
        templateUrl: 'HtmlFiles/login.html',
        controller: 'loginController'
      })
      
      .when('/Chat', {
        templateUrl: 'HtmlFiles/Chat.html',
        controller: 'chatController'
        
      })
      .when('/room', {
        templateUrl: 'HtmlFiles/room.html',
        controller: 'roomController'
      })
      .when('/userSettings', {
        templateUrl: 'HtmlFiles/userSettings.html',
        controller: 'userSettingsController'
      })

     .when('/:Hash', {
            templateUrl: 'HtmlFiles/privateRoom.html',
            controller: 'privateRoomController'
     })
      .otherwise({
        redirectTo: '/'
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
    