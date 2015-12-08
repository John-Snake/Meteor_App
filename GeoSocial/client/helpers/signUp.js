Template.signUp.events({
    'submit form': function(event){
        event.preventDefault();
        var email = $('[name=email]').val();
        var password = $('[name=password]').val();
        var username = $('[name=username]').val();
        var name = $('[name=name]').val();
        var surname = $('[name=surname]').val();

        Accounts.createUser({
            email: email,
            password: password,
            username: username,
            profile: {
                name: name,
                surname: surname
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