app.controller('roomController', ["$scope", "Auth", "Ref", "AuthService", "roomService","$http", "Hash","$routeParams","$timeout",
        function($scope, Auth, Ref, AuthService, roomService, $http,Hash,$routeParams, $timeout) {
            console.log("I was here..")
    // Sweet Alert :)
     
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

     function generateRandomStringToken(length) {
            var string = "";
            var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            for (var i = 0; i < length; i++){
                string += characters.charAt(Math.floor(Math.random() * characters.length));
            }
            return string;
        }

        swal({
            title: "Room",
            text: "What do you want your room name to be?",
            type: "input",
            showCancelButton: true,
            closeOnConfirm: false,
            animation: "slide-from-top",
            inputPlaceholder: "Write something"
        }, function(inputValue) {
            if (inputValue === false) return false;
            if (inputValue === "") {
                swal.showInputError("You need to write something!");
                return false
            }
            swal("Nice!", "You wrote: " + inputValue, "success");
             $scope.$apply(function () {
            $scope.roomNameModel = inputValue
            });

           console.log($scope.roomNameModel)
           setCookie('roomName', $scope.roomNameModel, 111111342423423111115)
           
    var redirectPage = generateRandomStringToken(10)
     console.log("User gets redirected to : " + redirectPage + " ...")
     roomService.setRoomUID(redirectPage);
     console.log(roomService.room.roomUID);
     Hash.setHash(redirectPage);
     console.log("From Provider : " + Hash.getHash())
     $routeParams.hash = Hash.getHash()
     
     $timeout(function(){
        window.location.hash = "/" + Hash.getHash()
     }, 1000)
   
        });
        
        
     
   
    }
])



