Template.signIn.events({
    'submit form': function(event){
        event.preventDefault();
        var email = $('[name=email]').val();
        var password = $('[name=password]').val();
        Meteor.loginWithPassword(email, password, function(error){
		    if(error){
		        //console.log(error.reason);
		        $('#alert').show();
            	$('#alert').html(error.reason);
		    } else {
		        Router.go("/");
		    }
		});
    }
});