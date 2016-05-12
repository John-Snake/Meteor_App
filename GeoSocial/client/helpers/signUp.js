Template.signUp.events({
    'submit form': function(event){
        event.preventDefault();
        var email = $('[name=email]').val();
        var password = $('[name=passwordConfirmation]').val();
        var username = $('[name=username]').val();
        var name = $('[name=name]').val();
        var surname = $('[name=surname]').val();
        var telegram_username = $('[name=telegram_username]').val();
        var birth = $('[name=birth]').val();
        var gender = $('[name=gender]:checked').val();
        var privacy = $('[name=privacy]').val();
        
        Accounts.createUser({
            email: email,
            password: password,
            username: username,
            profile: {
                name: name,
                surname: surname,
                telegram_username: telegram_username,
                birth: birth,
                gender: gender,
                privacy: privacy
            },
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

    //Check existing email address when a key is released.
    'keyup #email' : function() {  
        $('#alert').hide();

        Meteor.subscribe('usersEmail');

        var input = $('[name=email]').val();
        var check =  Meteor.users.findOne({'emails.address': input });

        if (check != null) {
            //console.log("Email già utilizzata.");
            $('#alert').show();
            $('#alert').html("Email già utilizzata.");
        }
    },

    //Check existing username when a key is released.
    'keyup #username' : function() {  
        $('#alert').hide();
        $('#confirmation').hide(); //Hide confirnation div

        Meteor.subscribe('usersUsername');

        var input = $('[name=username]').val();
        var check =  Meteor.users.findOne({'username': input });

        if (check != null) {
            //console.log("Nickname già utilizzato.");
            $('#alert').show();
            $('#alert').html("Nickname già utilizzato.");
        }
    },

    //Verify password confirmation when a key is released.
    'keyup #passwordConfirmation' : function() {  
        $('#alert').hide();
        $('#confirmation').hide();

        var input = $('[name=password]').val();
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

    'mouseover #privacy' : function() { 
        $('#info').show();
        $('#info').html("Select your level of privacy.");
    },

    'mouseout #privacy': function() { 
        $('#info').hide();
    }

});