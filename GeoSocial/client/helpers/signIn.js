Template.signIn.events({
    'submit form': function(event){
        event.preventDefault();
        var email = $('[name=email]').val();
        var password = $('[name=password]').val();
        Meteor.loginWithPassword(email, password, function(error){
		    if(error){
		        //console.log(error.reason);
		        //$('#alert').show();
            	//$('#alert').html(error.reason);
            	Bert.alert( error.reason, 'danger', 'growl-top-right' );
		    }
		    else {
		        Router.go("/");
		        Bert.alert( 'You are logged in!', 'success', 'growl-top-right' );
		    }
		});
    }
});