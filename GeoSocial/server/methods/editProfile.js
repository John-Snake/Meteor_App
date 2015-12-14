Meteor.methods({
  	changeUsername : function (newUsername) {
  		// check(value, pattern) || Match.test(value, pattern) controlli server
    	check(newUsername, String);

    	if (! this.userId) {
      		throw new Meteor.Error("not-logged-in", "Must be logged in to change username.");
	    }

	    Accounts.setUsername(this.userId, newUsername);
 	},
  	changeEmail : function (oldEmail, newEmail) {
  		// check(value, pattern) || Match.test(value, pattern) controlli server
		check(oldEmail, String);
		check(newEmail, String);

    	if (! this.userId) {
      		throw new Meteor.Error("not-logged-in", "Must be logged in to change email.");
	    }

	    Accounts.removeEmail(this.userId, oldEmail);
	    Accounts.addEmail(this.userId, newEmail); 

	    /* 
	     *  By default, an email address is added with { verified: false }.
	     *  Use Accounts.sendVerificationEmail to send an email with a link the user can use verify their email address. 
	    */
  	},
  	checkPassword: function(digest) {
	    check(digest, String);

    	if (! this.userId) {
      		throw new Meteor.Error("not-logged-in", "Must be logged in to change email.");
	    }
  		
  		var user = Meteor.user();
      	var password = {digest: digest, algorithm: 'sha-256'};
  		var result = Accounts._checkPassword(user, password);
  		
  		return result.error == null;

  		/*
  		 * Note that Accounts._checkPassword always returns a result object, but success is determined by the absence of an error value. 
  		*/
  	}	
});