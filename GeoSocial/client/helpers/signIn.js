Template.signIn.events({
    'submit form': function(event){
        event.preventDefault();
        var email = $('#email').val();
        var password = $('#password').val();
        Meteor.loginWithPassword(email, password, function(error){
		    if(error){
		        console.log(error.reason);
            	Bert.alert( error.reason, 'danger', 'growl-top-right' );
		    }
		    else {
		        Router.go("/");
		        Bert.alert( 'You are logged in!', 'success', 'growl-top-right' );
		    }
		});
    }
});