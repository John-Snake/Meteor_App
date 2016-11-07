Template.signUp.events({
    'submit form': function(event){
        event.preventDefault();
        var email = $('#email').val().toLowerCase();

        var password = $('#password').val();
        var passwordConfirmation = $('#passwordConfirmation').val();
        if (password != passwordConfirmation) {
            Bert.alert( 'Le due password devono coincidere.', 'danger', 'growl-top-right' );
            return false;
        }

        var username = $('#username').val().toLowerCase();
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
        var img1_public_id = "defaultProfile1";
        var img1_url = "http://res.cloudinary.com/geosocial/image/upload/v1477408663/defaultProfile1.jpg";
        var img2_public_id = "defaultProfile2";
        var img2_url = "http://res.cloudinary.com/geosocial/image/upload/v1477408663/defaultProfile2.jpg";
        var img3_public_id = "defaultProfile3";
        var img3_url = "http://res.cloudinary.com/geosocial/image/upload/v1477408663/defaultProfile3.jpg";
        
        Accounts.createUser({
                email: email,
                password: password,
                username: username,
                profile: {
                    name: name,
                    surname: surname,
                    telegram_username: telegram_username,
                    birth: formattedBirthDate,
                    gender: gender,
                    privacy: privacy,
                    img1_public_id: img1_public_id,
                    img1_url: img1_url,
                    img2_public_id: img2_public_id,
                    img2_url: img2_url,
                    img3_public_id: img3_public_id,
                    img3_url: img3_url
                },
            }, 
            function(error){
        	   if(error){
                	console.log(error.reason);
                    Bert.alert( error.reason, 'danger', 'growl-top-right' );
            	}
                else {
                	Router.go("/");
                    Bert.alert( 'Your registration was successful!<br>You are logged in!', 'success', 'growl-top-right' );
            	}
	        }  
	    );
    },
    //Check existing email address when a key is released.
    'keyup #email' : function() {  
        $('#alert').hide();

        Meteor.subscribe('usersEmail');

        var input = $('#email').val();
        var check =  Meteor.users.findOne({'emails.address': input });

        if (check != null) {
            console.log("Email già utilizzata.");
            $('#alert').show();
            $('#alert').html("Email già utilizzata.");
        }
    },
    //Check existing username when a key is released.
    'keyup #username' : function() {  
        $('#alert').hide();
        $('#confirmation').hide(); //Hide confirnation div

        Meteor.subscribe('usersUsername');

        var input = $('#username').val();
        var check =  Meteor.users.findOne({'username': input });

        if (check != null) {
            console.log("Nickname già utilizzato.");
            $('#alert').show();
            $('#alert').html("Nickname già utilizzato.");
        }
    },
    //Verify password confirmation when a key is released.
    'keyup #passwordConfirmation' : function() {  
        $('#alert').hide();
        $('#confirmation').hide();

        var input = $('#password').val();
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
    'mouseover #password' : function() { 
        $('#info').show();
        $('#info').html("Insert your password.");
    },
    'mouseout #password': function() { 
        $('#info').hide();
    },
    'mouseover #passwordConfirmation' : function() { 
        $('#info').show();
        $('#info').html("Confirm your password.");
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
    }
});
