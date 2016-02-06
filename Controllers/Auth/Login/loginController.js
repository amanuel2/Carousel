app.controller('loginController', ["$scope", "AuthService", "Ref", "$rootScope", "AuthTwitter", "$cookies", "$cookieStore", "AuthFaceBook", "Auth", "$auth",

    function($scope, AuthService, Ref, $rootScope, AuthTwitter, $cookies, $cookieStore, AuthFaceBook, Auth, $auth) {

        var authTwitter = new Firebase('https://socialappcarousel.firebaseio.com/');
        var authFacebook = new Firebase('https://socialappcarousel.firebaseio.com/');
        var authGoogle = new Firebase('https://socialappcarousel.firebaseio.com/');
        var authGithub = new Firebase('https://socialappcarousel.firebaseio.com/');
        var authFacebook = new Firebase('https://socialappcarousel.firebaseio.com/');


        $scope.facebookAuth = function() {
            authFacebook.authWithOAuthPopup("facebook", function(error, authData) {
                if (error) {
                    if (error.code === "TRANSPORT_UNAVAILABLE") {
                        // fall-back to browser redirects, and pick up the session
                        // automatically when we come back to the origin page
                        authFacebook.authWithOAuthRedirect("facebook", function(error, authData) {
                            /* ... */
                            if (error) {
                                console.error(error)
                            }
                            else {
                                console.log(authData)
                                console.log(authData.facebook.accessToken);
                                AuthService.User.uid = authData.auth.uid
                                AuthService.User.username = authData.facebook.cachedUserProfile.first_name
                                Ref.child("User Info").child(AuthService.User.uid).set({
                                    Username: AuthService.User.username,
                                    UID: AuthService.User.uid
                                });
                                $cookies.putObject("user", {
                                    name: AuthService.User.username,
                                    uid: AuthService.User.uid,
                                });

                                swal("Good job!", "LOGGED IN!", "success")
                                window.location.hash = "/Chat"
                            }

                        });
                    }

                    console.log("Login Failed!", error);
                }
                else {
                    console.log(authData)
                    console.log(authData.facebook.accessToken);
                    AuthService.User.uid = authData.auth.uid
                    AuthService.User.username = authData.facebook.cachedUserProfile.first_name
                    Ref.child("User Info").child(AuthService.User.uid).set({
                        Username: AuthService.User.username,
                        UID: AuthService.User.uid
                    });
                    $cookies.putObject("user", {
                        name: AuthService.User.username,
                        uid: AuthService.User.uid,
                    });

                    swal("Good job!", "LOGGED IN!", "success")
                    window.location.hash = "/Chat"

                }
            }, {
                scope: "email,user_likes" // the permissions requested
            })



        };
        ////////////////////////////////////////////////GOOGLE///////////////////////////////
        $scope.googleAuth = function() {
            authGoogle.authWithOAuthPopup("google", function(error, authData) {
                if (error) {
                    if (error.code === "TRANSPORT_UNAVAILABLE") {
                        // fall-back to browser redirects, and pick up the session
                        // automatically when we come back to the origin page
                        authGoogle.authWithOAuthRedirect("google", function(error, authData) {
                            /* ... */
                            if (error)
                                console.error(error)
                            else {
                                AuthService.User.username = authData.google.cachedUserProfile.given_name
                                AuthService.User.uid = authData.auth.uid
                                Ref.child("User Info").child(AuthService.User.uid).set({
                                    Username: AuthService.User.username,
                                    UID: AuthService.User.uid
                                });
                                $cookies.putObject("user", {
                                    name: AuthService.User.username,
                                    uid: AuthService.User.uid,
                                });
                                swal("Good job!", "LOGGED IN!", "success")
                                window.location.hash = "/Chat"
                            }
                        });
                    }
                    console.log("Login Failed!", error);
                }
                else {
                    AuthService.User.username = authData.google.cachedUserProfile.given_name
                    AuthService.User.uid = authData.auth.uid
                    Ref.child("User Info").child(AuthService.User.uid).set({
                        Username: AuthService.User.username,
                        UID: AuthService.User.uid
                    });
                    $cookies.putObject("user", {
                        name: AuthService.User.username,
                        uid: AuthService.User.uid,
                    });
                    swal("Good job!", "LOGGED IN!", "success")
                    window.location.hash = "/Chat"

                }
            })


        };



        ///////////////////////////////////////////////////////////////////////////////////////////

        $scope.githubAuth = function() {
            authGithub.authWithOAuthPopup("github", function(error, authData) {
                if (error) {
                    if (error.code === "TRANSPORT_UNAVAILABLE") {
                        // fall-back to browser redirects, and pick up the session
                        // automatically when we come back to the origin page
                        authGithub.authWithOAuthRedirect("google", function(error) {
                            /* ... */
                            if (error)
                                console.error(error)
                            else {
                                AuthService.User.username = authData.github.displayName
                                AuthService.User.uid = authData.auth.uid
                                console.log(authData)
                                Ref.child("User Info").child(AuthService.User.uid).set({
                                    Username: AuthService.User.username,
                                    UID: AuthService.User.uid
                                });
                                $cookies.putObject("user", {
                                    name: AuthService.User.username,
                                    uid: AuthService.User.uid,
                                });
                                swal("Good job!", "LOGGED IN!", "success")
                                window.location.hash = "/Chat"
                            }
                        });
                    }
                    console.log("Login Failed!", error);
                }
                else {
                    AuthService.User.username = authData.github.displayName
                    AuthService.User.uid = authData.auth.uid
                    console.log(authData)
                    Ref.child("User Info").child(AuthService.User.uid).set({
                        Username: AuthService.User.username,
                        UID: AuthService.User.uid
                    });
                    $cookies.putObject("user", {
                        name: AuthService.User.username,
                        uid: AuthService.User.uid,
                    });
                    swal("Good job!", "LOGGED IN!", "success")
                    window.location.hash = "/Chat"
                }
            });
        }




        $scope.twitterAuth = function() {
            var auth = new FirebaseSimpleLogin(authTwitter, function(err, user) {
                if (err)
                    console.log(err)
                else if (user) {
                    console.log("Username : " + user.displayName);
                    AuthService.User.uid = user.id;
                    AuthService.User.username = user.displayName;
                    Ref.child("User Info").child(AuthService.User.uid).set({
                        Username: AuthService.User.username,
                        UID: AuthService.User.uid
                    });
                    $cookies.putObject("user", {
                        name: AuthService.User.username,
                        uid: AuthService.User.uid,
                    });
                    swal("Good job!", "LOGGED IN!", "success")
                    window.location.hash = "/Chat"

                }
                else {
                    console.log("Not Logged In")
                }
            })

            auth.login('twitter', {
                rememberMe: true,
            })

        };



        $scope.signIn = function() {



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
                }, function(errorObject) {
                    console.log("The read failed: " + errorObject.code);
                });




            }).catch(function(error) {
                console.error("Authentication failed:", error)
                sweetAlert("Oops...", "Authentication failed, See the console for more details...", "error");
            });


        }


    }
])
