Template.signUp.events({
    'submit form': function(event){
        event.preventDefault();
        var email = $('[name=email]').val();
        var password = $('[name=password_confirmation]').val();
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
    'change #email' : function() {  
        Meteor.subscribe('usersEmail'); // vulnerabilità ?

        var input = $('[name=email]').val();
        var check =  Meteor.users.findOne({'emails.address': input });

        if (check != null) {
            console.log("Email già utilizzata.");
        }
    },
    'change #password_confirmation' : function() {  

        var input = $('[name=password]').val();
        var check = $('[name=password_confirmation]').val();

        if (input != check) {
            console.log("Le due password devono coincidere");
        }
    },
    'change #username' : function() {  
        Meteor.subscribe('usersUsername'); // vulnerabilità ?

        var input = $('[name=username]').val();
        var check =  Meteor.users.findOne({'username': input });

        if (check != null) {
            console.log("Nickname già utilizzato.");
        }
    }
});