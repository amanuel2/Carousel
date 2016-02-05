


app.controller('loginController' , ["$scope",'AuthService', "Auth", "Ref","$cookies","$cookieStore",

    function( $scope,AuthService, Auth, Ref, $cookies,$cookieStore){
    
    $scope.signIn = function(){
      

        
    Auth.$authWithPassword({
      email: $scope.logInemail,
      password: $scope.logInpassword
    }).then(function(authData) {
      
      AuthService.User.username = null;
        
            Ref.child("User Info").child(authData.uid).on("value", function(snapshot) {
              console.log(snapshot.val().Username)
            AuthService.User.username = snapshot.val().Username
            AuthService.User.email = $scope.logInemail;
        AuthService.User.password = $scope.logInpassword;
        AuthService.User.uid = authData.uid
       
       

      swal("Good job!", "LOGGED IN!", "success")
      $cookies.putObject("user", {
            name: AuthService.User.username,
            email: AuthService.User.email,
            uid: AuthService.User.uid,
        });
            window.location.hash = "/Chat"
            }, function (errorObject) {
              console.log("The read failed: " + errorObject.code);
            });

        
      
      
    }).catch(function(error) {
      console.error("Authentication failed:", error)
      sweetAlert("Oops...", "Authentication failed, See the console for more details...", "error");
    });
           
       
    }
    
    
    }]
)


      