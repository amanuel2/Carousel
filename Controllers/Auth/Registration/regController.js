app.controller('regController', ["$scope", "AuthService", "Ref", "$rootScope", "AuthTwitter", "$cookies", "$cookieStore", "AuthFaceBook",
    function($scope, AuthService, Ref, $rootScope, AuthTwitter, $cookies, $cookieStore, AuthFaceBook) {

        var authTwitter = new Firebase('https://socialappcarousel.firebaseio.com/');
        var authFacebook = new Firebase('https://socialappcarousel.firebaseio.com/');
        var authGoogle = new Firebase('https://socialappcarousel.firebaseio.com/');
        var authGithub = new Firebase('https://socialappcarousel.firebaseio.com/');
        var authFacebook = new Firebase('https://socialappcarousel.firebaseio.com/');
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




        $scope.facebookAuth = function() {
            authFacebook.authWithOAuthPopup("facebook", function(error, authData) {
                if (error) {

                    if (error.code === "TRANSPORT_UNAVAILABLE") {
                        // fall-back to browser redirects, and pick up the session
                        // automatically when we come back to the origin page
                        authFacebook.authWithOAuthRedirect("facebook", function(error) {
                            /* ... */
                            if (error)
                                throw error
                            else {
                                console.log(authData)
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
            })


        };
        ////////////////////////////////////////////////GOOGLE///////////////////////////////
        $scope.googleAuth = function() {
            authGoogle.authWithOAuthPopup("google", function(error, authData) {
                if (error) {

                    if (error.code === "TRANSPORT_UNAVAILABLE") {
                        // fall-back to browser redirects, and pick up the session
                        // automatically when we come back to the origin page
                        authGoogle.authWithOAuthRedirect("google", function(error) {
                            /* ... */
                            if (error)
                                throw error;
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
                        authGithub.authWithOAuthRedirect("github", function(error) {
                            /* ... */
                            if (error)
                                throw error
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
                    else {

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
                        $cookies.putObject("user", {
                            name: AuthService.User.username,
                            email: AuthService.User.email,
                            uid: AuthService.User.uid,
                        });

                        swal("Good job!", "LOGGED IN!", "success")
                        window.location.hash = "/Chat"
                    }

                })
            }


        }

    }
])
