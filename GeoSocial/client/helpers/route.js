/* Imposto il layout generale di tutte le routes del progetto */
Router.configure({
    layoutTemplate: 'layoutTemplate'
});

/* Imposto il route principale */
Router.route('/', {
    template: 'home',
});

Router.route('/signUp');
Router.route('/signIn');
Router.route('/editProfile');