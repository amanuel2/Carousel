angular.module('LoginApp')
.service('roomService', function($rootScope){
        this.room = {
            roomName:'',
            roomUID: ''
            
        }
        this.setRoomUID = function(UID){
            this.room.roomUID = UID;
        }
        
        this.setRoomNAme = function(message){
            var name = prompt(message);
            this.room.roomName = name;
            $rootScope.$broadcast('room:nameset', this.room.roomName);
        }
});

 // Remember that services are objects
    // Use {User} as a property of your object by "this"
    //Whats the objects name?Oh okk so like thsi?