app.controller('userSettingsController', ["$scope", 'AuthService', "Auth", "Ref", "$rootScope", "$firebaseArray", "$firebaseObject", "UniPosts",
    function($scope, AuthService, Auth, Ref, $rootScope, $firebaseArray, $firebaseObject, UniPosts) {
        $scope.Removed = function() {
            Ref.removeUser({
                email: AuthService.User.email,
                password: AuthService.User.password
            }, function(error) {
                if (error) {
                    switch (error.code) {
                        case "INVALID_USER":
                            sweetAlert("Oops...", "Authentication failed, See the console for more details...", "error");
                            console.error("The specified user account does not exist.");
                            break;
                        case "INVALID_PASSWORD":
                            sweetAlert("Oops...", "Authentication failed, See the console for more details...", "error");
                            console.error("The specified user account password is incorrect.");
                            break;
                        default:
                            sweetAlert("Oops...", "Authentication failed, See the console for more details...", "error");
                            console.error("Error removing user:", error);
                    }
                } else {
                    alert("User account deleted successfully!");
                }
            });
        }

        $scope.changeEmail = function() {
            var newEmail = prompt("What is the new email you want to change to?")
            var newPassword = prompt("What is the new password you want to change to?")

            Ref.changeEmail({
                oldEmail: AuthService.User.email,
                newEmail: newEmail,
                password: AuthService.User.password
            }, function(error) {
                if (error) {
                    switch (error.code) {
                        case "INVALID_PASSWORD":
                            sweetAlert("Oops...", "Authentication failed, See the console for more details...", "error");
                            console.log("The specified user account password is incorrect.");
                            break;
                        case "INVALID_USER":
                            sweetAlert("Oops...", "Authentication failed, See the console for more details...", "error");
                            console.log("The specified user account does not exist.");
                            break;
                        default:
                        sweetAlert("Oops...", "Authentication failed, See the console for more details...", "error");
                            console.log("Error creating user:", error);
                    }
                } else {

                    console.log("User email changed successfully!");
                    AuthService.User.email = newEmail;
                    Ref.child("User Info").child(AuthService.User.uid).set({
                        Email: newEmail,
                        Username: AuthService.User.username,
                        Password: AuthService.User.password,
                        uid: AuthService.User.uid
                    })

                    Ref.child("User Info").child(AuthService.User.uid).on("value", function(snapshot) {

                        console.log(snapshot.val().Email)

                    }, function(errorObject) {
                        sweetAlert("Oops...", "Authentication failed, See the console for more details...", "error");
                        console.log("The read failed: " + errorObject.code);
                    })


                }
            });
        }
    }
])


/*.on("value", function(snapshot) {
                    console.log("New email var =" + newEmail)
                    console.log(snapshot.val().Email)
                  snapshot.val().Email = newEmail;
               console.log(snapshot.val().Email)
            window.location.hash = "/Chat"
            }, function (errorObject) {
              console.log("The read failed: " + errorObject.code);
            })*/