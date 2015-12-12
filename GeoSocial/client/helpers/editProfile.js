Template.editProfile.events({
    'submit form': function(event){
        event.preventDefault();
        /*
        var email = $('[name=email]').val();
        var password = $('[name=password]').val();
        var username = $('[name=username]').val();
        */
        var name = $('[name=name]').val();
        var surname = $('[name=surname]').val();
        var telegram_username = $('[name=telegram_username]').val();
        var birth = $('[name=birth]').val();
        var gender = $('[name=gender]:checked').val();
        var privacy = $('[name=privacy]').val();

        Meteor.users.update({
            _id: Meteor.userId()
            }, 
            { $set: {
                    /*
                    email: email,
                    password: password,
                    username: username,
                    */
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