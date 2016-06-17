Template.deleteAccount.events({
    'click #deleteAccount': function() {
        Meteor.logoutOtherClients(function(error) {
            if (error) {
                console.log(error);
            }
        });
        
        Meteor.call('removeUserChainDeletion', function(error) {
            if (error) {
                console.log(error);
                Bert.alert( error.reason, 'danger', 'growl-top-right' );
            }
            else {
                Session.clearPersistent();
                delete Session.keys.postId;
                delete Session.keys.commentId;

                Modal.hide('deleteAccount');
                Router.go('/');
                Bert.alert( 'Account deleted.<br>You have been logged out!', 'success', 'growl-top-right' );
            }
        });
    }
});