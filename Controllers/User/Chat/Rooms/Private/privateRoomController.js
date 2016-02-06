
app.controller('privateRoomController', ["$scope", "Auth", "Ref", "AuthService", "roomService","$http", "Hash","$routeParams","$timeout","PrivateRoomChat","$cookieStore",
        function($scope, Auth, Ref, AuthService, roomService, $http,Hash,$routeParams, $timeout,PrivateRoomChat, $cookieStore) {
    
  function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
    }
    
    function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
}
roomService.room.roomName = getCookie('roomName')
  $scope.roomNamePrivate = roomService.room.roomName
    console.log(roomService.room.roomName)
   
   
   PrivateRoomChat.push({
     RoomNames: $scope.roomNamePrivate
   })
    }
])






