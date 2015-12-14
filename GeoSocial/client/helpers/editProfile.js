Template.editProfile.events({
    'submit form': function(event){
        event.preventDefault();
        var email = $('[name=email]').val();
        var username = $('[name=username]').val();
        var name = $('[name=name]').val();
        var surname = $('[name=surname]').val();
        var telegram_username = $('[name=telegram_username]').val();
        var birth = $('[name=birth]').val();
        var gender = $('[name=gender]:checked').val();
        var privacy = $('[name=privacy]').val();

        var _id = Meteor.userId();

        var oldEmail = Meteor.user().emails[0].address;
        
        // Asynchronous call with a callback on the client
        Meteor.call('changeUsername', username, function (error) {
            if(error){
                    console.log(error.reason);
            }
        });

        // Asynchronous call with a callback on the client
        Meteor.call('changeEmail', oldEmail, email, function (error) {
            if(error){
                    console.log(error.reason);
            }
        });
        
        Meteor.users.update( _id, 
            { $set: {
                    "profile.name": name,
                    "profile.surname": surname,
                    "profile.telegram_username": telegram_username,
                    "profile.birth": birth,
                    "profile.gender": gender,
                    "profile.privacy": privacy
                }
            }, 
            function(error){
               if(error){
                    console.log(error.reason);
                } else {
                    Router.go("/");
                }
            } 
        );

    },
    'keyup #email' : function() {
        Meteor.subscribe('usersEmail');

        var input = $('[name=email]').val();
        var check =  Meteor.users.findOne({'emails.address': input });

        if (Meteor.user()) { // use Meteor.user() since it's available
            var session = Meteor.user().emails[0].address;

            if (check != null && input === session) {
                console.log("Email già utilizzata.");
            }
        }
    },
    'keyup #username' : function() {  
        Meteor.subscribe('usersUsername');

        var input = $('[name=username]').val();
        var check =  Meteor.users.findOne({'username': input });

        if (Meteor.user()) { // use Meteor.user() since it's available
            var session = Meteor.user().username;

            if (check != null && input === session) {
                console.log("Nickname già utilizzato.");
            }
        }
    }
});

/* 
 * Extract the 'gender' of the current user and set 'checked' attriubute for the right radio button.
 */ 
Template.editProfile.helpers({
    isMale: function() {
        if (Meteor.user()) {  // use Meteor.user() since it's available
            var check = Meteor.user().profile.gender;
            
            if (check === "Male"){
                return 'checked';
            }
        }
    },
    isFemale: function() {
        if (Meteor.user()) {  // use Meteor.user() since it's available
            var check = Meteor.user().profile.gender;
            
            if (check === "Female"){
                return 'checked';
            }
        }
    },
    isUnknown: function() {
        if (Meteor.user()) {  // use Meteor.user() since it's available
            var check = Meteor.user().profile.gender;
            
            if (check === "Unknown"){
                return 'checked';
            }
        }
    },
    isTransgender: function() {
        if (Meteor.user()) {  // use Meteor.user() since it's available
            var check = Meteor.user().profile.gender;
            
            if (check === "Transgender"){
                return 'checked';
            }
        }
    }
});