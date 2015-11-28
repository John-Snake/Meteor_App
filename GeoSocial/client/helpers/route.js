/* Imposto il layout generale di tutte le routes del progetto */
Router.configure({
    layoutTemplate: 'layoutTemplate'
});

/* Imposto il template principale */
Router.route('/', {
    template: 'home',
});

Router.route('/register');
Router.route('/login');