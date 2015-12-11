Template.signUp.events({
    'submit form': function(event){
        event.preventDefault();
        var email = $('[name=email]').val();
        var password = $('[name=password]').val();
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
        
    }
});