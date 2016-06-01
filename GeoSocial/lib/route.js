// Imposto il route principale
Router.route('/', {
    template: 'home',
});

// Imposto il layout generale di tutte le routes del progetto
Router.configure({
    layoutTemplate: 'layoutTemplate',
    notFoundTemplate: 'notFound',
});

Router.plugin('dataNotFound', {notFoundTemplate: 'notFound'});

// Blocco accesso alle pagine disponibili solo per gli utenti loggati
var requireLogin = function() { 
  if (! Meteor.user()) {
   // If user is not logged in render /signIn
   this.render('/home'); 
 } else {
   //if user is logged in render whatever route was requested
   this.next(); 
 }
}

// Per gli utenti non loggati sono disponibili solo signIn e singUp (eccezione)
Router.onBeforeAction(requireLogin, {except: ['signUp']});


// registro altre route
Router.route('/signUp');
Router.route('/profile');
Router.route('/editProfile');
Router.route('/newPost');

Router.route('/myPost', {
    // this template will be rendered until the subscriptions are ready
    loadingTemplate: 'loadingTemplate',

    waitOn: function () {
        // return one handle, a function, or an array
        return Meteor.subscribe('myPost');
    },

    action: function () {
        this.render('myPost');
    }
});

Router.route('/editPost/:_id', {
    // this template will be rendered until the subscriptions are ready
    loadingTemplate: 'loadingTemplate',

    waitOn: function () {
        // return one handle, a function, or an array
        return Meteor.subscribe('myPost');
    },

    action: function () {
        var thisPost = Post.findOne({_id: this.params._id});
        this.render('editPost', {data: thisPost});
    }
});

Router.route('/allPosts/:distanceKm', {
    // this template will be rendered until the subscriptions are ready
    loadingTemplate: 'loadingTemplate',

    waitOn: function () {
        // return one handle, a function, or an array
        return Meteor.subscribe('usersUsername');
    },
    action: function () {
        this.render('allPosts');
    }
});

Router.route('/profile/:_id', {
    // this template will be rendered until the subscriptions are ready
    loadingTemplate: 'loadingTemplate',

    waitOn: function () {
        // return one handle, a function, or an array
        return Meteor.subscribe('usersProfilesNoPrivacy', this.params._id);
    },
    action: function () {
        var usersProfile = Meteor.users.findOne({_id: this.params._id});
        this.render('usersProfiles', {data: usersProfile});
    }
});