// Ensure we have the token to pass into the template when it's present
if (Accounts._resetPasswordToken) {  
	Session.set('resetPasswordToken', Accounts._resetPasswordToken);
}

Template.resetPassword.helpers({  
	resetPassword: function() {
    	return Session.get('resetPasswordToken');
  	}
});

Template.resetPassword.events({
	'submit #forgotPassword': function(event) {
    	event.preventDefault();

    	var email = $('#email').val().toLowerCase();

    	if (email) { // manca controllo se email è valida..
	      	Accounts.forgotPassword({email: email}, function(error) {
	        	if (error) {
	        		console.log(error.reason);
                    Bert.alert( error.reason, 'danger', 'growl-top-right' );
	        	} 
	        	else {
	          		Bert.alert( 'Email Sent.<br>Check your mailbox.', 'success', 'growl-top-right' );
	          		Router.go("/");
	        	}
	      	});
	    }
    	return false;
  	},
  	'submit #resetPassword': function(event) {
    	event.preventDefault();
    
        var	password = $('#password').val();
        var	passwordConfirm = $('#passwordConfirmation').val();

	    if (password && passwordConfirm) { // manca controllo se pass è valida..
	    	if (password != passwordConfirm) {
	    		Bert.alert( 'Le due password devono coincidere', 'danger', 'growl-top-right' );
	    		return false;
	    	}
	    	else {
		      	Accounts.resetPassword(Session.get('resetPassword'), password, function(error) {
		        	if (error) {
		          		console.log(error.reason);
	                    Bert.alert( error.reason, 'danger', 'growl-top-right' );
		        	}
		        	else {
		        		Bert.alert( 'Your password has been changed.', 'success', 'growl-top-right' );
		        		Router.go("/");
		          		Session.set('resetPassword', null);
		          		delete Session.keys.resetPassword
		        	}
		      	});
	  		}
	    }
    	return false;
  	}
});