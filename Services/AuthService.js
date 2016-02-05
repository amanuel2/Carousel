angular.module('LoginApp')
.service('AuthService', function(){
    
   
        this.User = {
            email:null,
            password:null,
            username:null
        }
});

 // Remember that services are objects
    // Use {User} as a property of your object by "this"
    //Whats the objects name?Oh okk so like thsi?