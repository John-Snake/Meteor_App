/* Imposto il template principale */
Router.route('/', {
    template: 'home',
});

/* Imposto il layout generale di tutte le routes del progetto */
Router.configure({
    layoutTemplate: 'layout'
});

Router.route('/register');
Router.route('/login');