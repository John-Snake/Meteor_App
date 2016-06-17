Template.header.events({
    'click .logout': function(event){
        event.preventDefault();

        Session.clearPersistent();
        delete Session.keys.postId;
        delete Session.keys.commentId;

        Meteor.logout();
        Router.go('/');
        Bert.alert( 'You have been logged out!', 'success', 'growl-top-right' );
    }
});
