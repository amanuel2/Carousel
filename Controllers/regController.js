

app.controller('regController', ["$scope", "AuthService","Ref","$rootScope",
    function($scope, AuthService,Ref, $rootScope) {
        




        $scope.createUser = function() {
            if ($('#name').val() == '') {
                alert("Email cannot be empty");
            }
            if ($('#password').val() == '') {
                alert("Password cannot be empty");
            }
            if ($('#username').val() == '') {
                alert("Username cannot be empty");
            }
            
            else {

                Ref.createUser({
                    email: $scope.email,
                    password: $scope.password
                }, function(error, userData) {
                    if (error) {
                        switch (error.code) {
                            case 'EMAIL_TAKEN':
                                alert("This User is Already Created. Try Logging In");
                                break;
                            
                            case 'INVALID_EMAIL':
                                alert("The Email You Entered is Invalid");
                                break;
                                
                            case 'INVALID_PASSWORD':
                                 alert("The Password You Entered is Invalid");
                                 break;
                                 
                            default: 
                                 alert("Error Creating this user : " + error)
                                 break;
                        }
                    }
                    else{

                        AuthService.User.email = $scope.email;
                        AuthService.User.password = $scope.password;
                        AuthService.User.uid = userData.uid;
                        AuthService.User.username = $scope.username;
                        
                       Ref.child("User Info").child(AuthService.User.uid).set({
                                Username: $scope.username,
                                Email: AuthService.User.email,
                                Password: AuthService.User.password,
                                UID: AuthService.User.uid
                            });


                        swal("Good job!", "LOGGED IN!", "success")
                        window.location.hash = "/Chat"
                    }

                })  
            }


        }

    }
])