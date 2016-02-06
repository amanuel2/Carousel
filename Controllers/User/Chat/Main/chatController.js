
app.controller('chatController', ["$scope", 'AuthService', "Auth", "Ref", "$rootScope", "$firebaseArray", "$firebaseObject", "UniPosts","$cookieStore",
    function($scope, AuthService, Auth, Ref, $rootScope, $firebaseArray, $firebaseObject, UniPosts,$cookieStore) {
         
       var cookie =  $cookieStore.get("user")
        function isEmptyObject(obj) {
          for(var prop in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, prop)) {
              return false;
            }
          }
          return true;
        }

        var result = isEmptyObject(cookie);
       
       if(result){
           console.log("...No Cookies...")
          
       }
       else{
           function randomIndexArray(){
               var index = Math.floor(Math.random() * (16 - 1) + 1);
               return index;
           }
           
            
            AuthService.User.email = cookie.email;
            AuthService.User.username = cookie.name;
            AuthService.User.uid = cookie.uid;
            
             var postsArray = {}                                                                                                                                   |
        console.log(AuthService.User.email)                                                                                  
        console.log(AuthService.User.uid) 
        console.log(AuthService.User.username) 
        some = $firebaseArray(Ref.child("Posts").child(AuthService.User.username));

        var postsFirebase = $firebaseObject(Ref)
        var username = AuthService.User.username
        var messages = {}
$scope.messagess = $firebaseArray(UniPosts);

        $scope.submit = function() {
            if (!($scope.textValue)) {
alert("No Value...")
            }
            else {

        UniPosts.push({
             'name' : AuthService.User.username,
             'textValue': $scope.textValue
          });
          $scope.textValue = ''

            }

        }
   $scope.ChatRoom = function(){
       window.location.hash = "/room"
   }
       }
        
  
}
]);




                
/////////////////////////////////////////////////////////NEEDED AFTER I FIX THE CONTROLLER PROBLEM/////////////////////////////////////////////////////////////
 //                                                                                                                                                           |
 /*                                                                                                                                                           |
        
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////        
        
        
        
        
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////**MAYBE NEEDED DATA**///////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

               /* some.$add({
                    Posts: $scope.textValue
                }).then(function(authData) {
                    console.log(authData.path)
                    Ref.child("Posts").child(username).child(authData.path.o[2]).on("value", function(snapshot) {
                        console.log(snapshot.val().Posts)
                           messages.push(snapshot.val().Posts)
                       
                    }, function(errorObject) {
                        console.log("The read failed: " + errorObject.code);
                    });


                }).catch(function(errorObject){
                    alert("See the console for more details")
                    console.error(errorObject.code)
                })*/