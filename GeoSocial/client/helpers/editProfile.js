Template.editProfile.events({
    'submit #editProfile': function(event){
        event.preventDefault();
        var name = $('[name=name]').val();
        var surname = $('[name=surname]').val();
        var telegram_username = $('[name=telegram_username]').val();
        
        var date = $('[name=birth]').val();
        var formattedBirthDate = '';
        if (date != '') {
            var birth = new Date(date);
            formattedBirthDate = moment(birth).format("YYYY-MM-DD");
        }
        var gender = $('[name=gender]:checked').val();
        var privacy = $('[name=privacy]').val();

        var _id = Meteor.userId();

        Meteor.users.update( _id, 
            { $set: {
                    "profile.name": name,
                    "profile.surname": surname,
                    "profile.telegram_username": telegram_username,
                    "profile.birth": formattedBirthDate,
                    "profile.gender": gender,
                    "profile.privacy": privacy
                }
            }, 
            function(error){
               if(error){
                    console.log(error.reason);
                } else {
                    Router.go("/profile");
                }
            } 
        );

    },
    'submit #changeEmail': function(event){
        event.preventDefault();
        var email = $('[name=email]').val().toLowerCase();
        var oldEmail = Meteor.user().emails[0].address;

        if (email != oldEmail){
            // Asynchronous call with a callback on the client
            Meteor.call('changeEmail', oldEmail, email, function (error) {
                if(error){
                        console.log(error.reason);
                }
                else {
                    Router.go("/profile");
                }
            });
        }
        else {
            //console.log("Email già utilizzata.");
            $('#alert').show();
            $('#alert').html("Email già utilizzata.");
        }
    },
    'submit #changeUsername': function(event){ 
        event.preventDefault();
        var username = $('[name=username]').val().toLowerCase();
        var oldUsername = Meteor.user().username;

        if(username != oldUsername){
            // Asynchronous call with a callback on the client
            Meteor.call('changeUsername', username, function (error) {
                if(error){
                        console.log(error.reason);
                }
                else {
                    Router.go("/profile");
                }
            });
        }
        else {
            //console.log("Nickname già utilizzato.");
            $('#alert').show();
            $('#alert').html("Nickname già utilizzato.");
        }
    },
    'submit #changePassword': function(event){
        event.preventDefault();
        var oldPassword = $('[name=oldPassword]').val();
        var newPassword = $('[name=passwordConfirmation]').val();
        
        if( oldPassword != newPassword) {
            Accounts.changePassword(oldPassword, newPassword,
                function(error){
                    if(error){
                        if(error.reason == 'Incorrect password') {
                            //console.log(error.reason);
                            //console.log("Password corrente sbagliata.")
                            $('#alert').show();
                            $('#alert').html("Password corrente sbagliata.");
                        }
                    } else {
                        Router.go("/profile");
                    }
                }
            );
        }
        else {
            //console.log("Password già utilizzata.");
            $('#alert').show();
            $('#alert').html("Password già utilizzata.");
        }
    },

    //Check existing email address when a key is released.
    'keyup #email' : function() {
        $('#alert').hide();

        Meteor.subscribe('usersEmail');

        var input = $('[name=email]').val();
        var check =  Meteor.users.findOne({'emails.address': input });

        if (Meteor.user()) { // use Meteor.user() since it's available
            var session = Meteor.user().emails[0].address;

            if (check != null || input === session) {
                //console.log("Email già utilizzata.");
                $('#alert').show();
                $('#alert').html("Email già utilizzata.");
            }
        }
    },

    //Check existing username when a key is released. 
    'keyup #username' : function() {  
        $('#alert').hide();
        $('#confirmation').hide();

        Meteor.subscribe('usersUsername');

        var input = $('[name=username]').val();
        var check =  Meteor.users.findOne({'username': input });

        if (Meteor.user()) { // use Meteor.user() since it's available
            var session = Meteor.user().username;

            if (check != null || input === session) {
                //console.log("Nickname già utilizzato.");
                $('#alert').show();
                $('#alert').html("Nickname già utilizzato.");
            }
        }
    },

    //Verify password confirmation when a key is released.
    'keyup #passwordConfirmation' : function() {
        $('#alert').hide();
        $('#confirmation').hide();

        var input = $('[name=newPassword]').val();
        var check = $('[name=passwordConfirmation]').val();

        if (input != check) {
            //console.log("Le due password devono coincidere");
            $('#alert').show();
            $('#alert').html("Le due password devono coincidere");
        }
        else {
            //console.log("Le due password coincidono");
            $('#confirmation').show();
            $('#confirmation').html("Le due password coincidono!");
        }
    },

    //Explain in the disclaimer div what you need to do in the selected input tag.
    'mouseover #email' : function() { 
        $('#info').show();
        $('#info').html("Insert your email.");
    },

    //Remove the disclaimer div if no input tag is selected.
    'mouseout #email': function() { 
        $('#info').hide();
    },

    'mouseover #oldPassword' : function() { 
        $('#info').show();
        $('#info').html("Insert your current password.");
    },

    'mouseout #oldPassword': function() { 
        $('#info').hide();
    },

    'mouseover #newPassword' : function() { 
        $('#info').show();
        $('#info').html("Insert your new password.");
    },

    'mouseout #newPassword': function() { 
        $('#info').hide();
    },

    'mouseover #passwordConfirmation' : function() { 
        $('#info').show();
        $('#info').html("Confirm your new password.");
    },

    'mouseout #passwordConfirmation': function() { 
        $('#confirmation').hide(); //Hide confirnation div
        $('#info').hide();
    },

    'mouseover #username' : function() { 
        $('#info').show();
        $('#info').html("Insert your username.");
    },

    'mouseout #username': function() { 
        $('#info').hide();
    },

    'mouseover #name' : function() { 
        $('#info').show();
        $('#info').html("Insert your name.");
    },

    'mouseout #name': function() { 
        $('#info').hide();
    },

    'mouseover #surname' : function() { 
        $('#info').show();
        $('#info').html("Insert your surname.");
    },

    'mouseout #surname': function() { 
        $('#info').hide();
    },

    'mouseover #telegram_username' : function() { 
        $('#info').show();
        $('#info').html("Insert your telegram username.");
    },

    'mouseout #telegram_username': function() { 
        $('#info').hide();
    },

    'mouseover #datePicker' : function() { 
        $('#info').show();
        $('#info').html("Insert your birth date.");
    },

    'mouseout #datePicker': function() { 
        $('#info').hide();
    },

    'mouseover #gender' : function() { 
        $('#info').show();
        $('#info').html("Choose your gender.");
    },

    'mouseout #gender': function() { 
        $('#info').hide();
    },

    'mouseover #privacy' : function() { 
        $('#info').show();
        $('#info').html("Select your level of privacy.<br>0 = low level, 2 = max level");
    },

    'mouseout #privacy': function() { 
        $('#info').hide();
    }
});

//Extract the 'gender' of the current user and set 'checked' attriubute for the right radio button. 
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