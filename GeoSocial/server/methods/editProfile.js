Meteor.methods({
  	changeUsername : function (newUsername) {
  		// check(value, pattern) || Match.test(value, pattern) controlli server

    	if (! this.userId) {
      		throw new Meteor.Error("not-logged-in", "Must be logged in to change username.");
	    }

	    Accounts.setUsername(this.userId, newUsername);
 	},
  	changeEmail : function (oldEmail, newEmail) {
  		// check(value, pattern) || Match.test(value, pattern) controlli server

    	if (! this.userId) {
      		throw new Meteor.Error("not-logged-in", "Must be logged in to change email.");
	    }

	    Accounts.removeEmail(this.userId, oldEmail);
	    Accounts.addEmail(this.userId, newEmail); 

	    /* 
	     *  By default, an email address is added with { verified: false }.
	     *  Use Accounts.sendVerificationEmail to send an email with a link the user can use verify their email address. 
	    */
  	}
});