Template.changePassword.events({
    'submit form': function(event){
        event.preventDefault();
        var oldPassword = $('[name=oldPassword]').val();
        var newPassword = $('[name=passwordConfirmation]').val();

        console.log(oldPassword);
        console.log(newPassword);
        /*
        var digest = Package.sha.SHA256(oldPassword);

        Meteor.call('checkPassword', digest, function(error, result) {
            if (error) {
                console.log(error.reason);
            }
            else if(result){
                
                
            }
        }); 
        */
        Accounts.changePassword(oldPassword, newPassword,
            function(error){
               if(error){
                    console.log(error.reason);
                } else {
                    Router.go("/");
                }
            }
        );
 
    },
    'keyup #passwordConfirmation' : function() {
        var input = $('[name=newPassword]').val();
        var check = $('[name=passwordConfirmation]').val();

        if (input != check) {
            console.log("Le due password devono coincidere");
        }
        else {
            console.log("Le due password coincidono");
        }
    }
});