// Imposto il route principale
Router.route('/', {
    template: 'home',
});

// Imposto il layout generale di tutte le routes del progetto
Router.configure({
    layoutTemplate: 'layoutTemplate',
    notFoundTemplate: 'notFound',
  	loadingTemplate: 'loadingTemplate'
});

Router.plugin('dataNotFound', {notFoundTemplate: 'notFound'});
//Router.onBeforeAction('loading');

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
Router.route('/myPost');