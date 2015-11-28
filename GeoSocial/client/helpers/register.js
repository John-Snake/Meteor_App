Template.register.events({
    'submit form': function(event){
        event.preventDefault();
        var email = $('[name=email]').val();
        var password = $('[name=password]').val();
        var nome = $('[name=nome]').val();
        var cognome = $('[name=cognome]').val();
        var nickname = $('[name=nickname]').val();

        Accounts.createUser({
            email: email,
            password: password,
            nome: nome,
            cognome: cognome,
            nickname: nickname
        });

        Router.go('/');
    }
});
