Template.editPost.onRendered(function() {  
    $("#img1_public_id").attr("value", $("#oldImg1_public_id").val());
    $("#img1_url").attr("value", $("#oldImg1_url").val());
    $("#img2_public_id").attr("value", $("#oldImg2_public_id").val());
    $("#img2_url").attr("value", $("#oldImg2_url").val());
    $("#img3_public_id").attr("value", $("#oldImg3_public_id").val());
    $("#img3_url").attr("value", $("#oldImg3_url").val());
});

Template.editProfile.events({
    'submit #editProfile': function(event){
        event.preventDefault();
        var _id = Meteor.userId();
        var name = $('#name').val();
        var surname = $('#surname').val();
        var telegram_username = $('#telegram_username').val();
        
        var date = $('#datePicker').val();
        var formattedBirthDate = '';
        if (date != '') {
            var birth = new Date(date);
            formattedBirthDate = moment(birth).format("YYYY-MM-DD");
        }

        var gender = $('[name=gender]:checked').val();
        var privacy = $('#user_privacy').val();

        Meteor.users.update( _id, 
            {   $set: {
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
                    Bert.alert( error.reason, 'danger', 'growl-top-right' );
                }
                else {
                    Router.go("/profile");
                    Bert.alert( 'User edited successfully.', 'success', 'growl-top-right' );
                }
            } 
        );
    },
    'submit #changeEmail': function(event){
        event.preventDefault();
        var email = $('#email').val().toLowerCase();
        var oldEmail = Meteor.user().emails[0].address;

        if (email != oldEmail){
            // Asynchronous call with a callback on the client
            Meteor.call('changeEmail', oldEmail, email, function (error) {
                if(error){
                        console.log(error.reason);
                        Bert.alert( error.reason, 'danger', 'growl-top-right' );
                }
                else {
                    Router.go("/profile");
                    Bert.alert( 'User edited successfully.', 'success', 'growl-top-right' );
                }
            });
        }
        else {
            console.log("Email già utilizzata.");
            Bert.alert( 'Email già utilizzata.', 'danger', 'growl-top-right' );
        }
    },
    'submit #changeUsername': function(event){ 
        event.preventDefault();
        var username = $('#username').val().toLowerCase();
        var oldUsername = Meteor.user().username;

        if(username != oldUsername){
            // Asynchronous call with a callback on the client
            Meteor.call('changeUsername', username, function (error) {
                if(error){
                        console.log(error.reason);
                        Bert.alert( error.reason, 'danger', 'growl-top-right' );
                }
                else {
                    Router.go("/profile");
                    Bert.alert( 'User edited successfully.', 'success', 'growl-top-right' );
                }
            });
        }
        else {
            console.log("Nickname già utilizzato.");
            Bert.alert( 'Nickname già utilizzato.', 'danger', 'growl-top-right' );
        }
    },
    'submit #changePassword': function(event){
        event.preventDefault();
        var oldPassword = $('#oldPassword').val();
        var newPassword = $('#newPassword').val();
        var newPasswordConfirm = $('#passwordConfirmation').val();

        if (newPassword != newPasswordConfirm) {
            Bert.alert( 'Le due password devono coincidere.', 'danger', 'growl-top-right' );
            return false;
        }
        else if (oldPassword != newPassword) {
            Accounts.changePassword(oldPassword, newPassword,
                function(error){
                    if(error){
                        console.log(error.reason)
                        Bert.alert( 'Password corrente errata.', 'danger', 'growl-top-right' );
                    }
                    else {
                        Router.go("/profile");
                        Bert.alert( 'User edited successfully.', 'success', 'growl-top-right' );
                    }
                }
            );
        }
        else {
            console.log("Password già utilizzata.");
            Bert.alert( 'Password già utilizzata.', 'danger', 'growl-top-right' );
        }
    },
    //Check existing email address when a key is released.
    'keyup #email' : function() {
        $('#alert').hide();

        Meteor.subscribe('usersEmail');

        var input = $('#email').val();
        var check =  Meteor.users.findOne({'emails.address': input });

        if (Meteor.user()) { // use Meteor.user() since it's available
            var session = Meteor.user().emails[0].address;

            if (check != null || input === session) {
                console.log("Email già utilizzata.");
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

        var input = $('#username').val();
        var check =  Meteor.users.findOne({'username': input });

        if (Meteor.user()) { // use Meteor.user() since it's available
            var session = Meteor.user().username;

            if (check != null || input === session) {
                console.log("Nickname già utilizzato.");
                $('#alert').show();
                $('#alert').html("Nickname già utilizzato.");
            }
        }
    },
    //Verify password confirmation when a key is released.
    'keyup #passwordConfirmation' : function() {
        $('#alert').hide();
        $('#confirmation').hide();

        var input = $('#newPassword').val();
        var check = $('#passwordConfirmation').val();

        if (input != check) {
            console.log("Le due password devono coincidere");
            $('#alert').show();
            $('#alert').html("Le due password devono coincidere");
        }
        else {
            console.log("Le due password coincidono");
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
        $('#info').html("Select your level of privacy.");
    },
    'mouseout #privacy': function() { 
        $('#info').hide();
    },
    'click #deleteAccount': function() {
        Modal.show('deleteAccount');
    },
    'change #post_uploadImage1': function (event) {
        uploadImageProfile(event, 1);
    },
    'change #post_uploadImage2': function (event) {
        uploadImageProfile(event, 2);
    },
    'change #post_uploadImage3': function (event) {
        uploadImageProfile(event, 3);
    },
    'click #delete_img1': function (event) {
        event.preventDefault();

        deleteImageProfile(1);
    },
    'click #delete_img2': function (event) {
        event.preventDefault();

        deleteImageProfile(2);
    },
    'click #delete_img3': function (event) {
        event.preventDefault();

        deleteImageProfile(3);
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
    },
    privacyColor : function(privacyValue) {
        if (privacyValue == 0) {
            return 'red';
        }
        else if (privacyValue == 1) {
            return 'orange';
        }
        else if (privacyValue == 2) {
            return 'green';
        }
    },
    privacyValue : function(privacyValue) {
        if (privacyValue == 0) {
            return 'LOW';
        }
        else if (privacyValue == 1) {
            return 'AVERAGE';
        }
        else if (privacyValue == 2) {
            return 'HIGH';
        }
    },
    privacyInfo : function(privacyValue) {
        if (privacyValue == 0) {
            return 'LOW level: Everyone can see all of your information.';
        }
        else if (privacyValue == 1) {
            return 'AVERAGE level: Everyone can see your username, name, surname, email and other contacts.';
        }
        else if (privacyValue == 2) {
            return 'HIGH level: Everyone can see only your username.';
        }
    }
});