Template.editProfile.events({
    'submit form': function(event){
        event.preventDefault();
        var email = $('[name=email]').val();
        var password = $('[name=password]').val();
        var username = $('[name=username]').val();
        var name = $('[name=name]').val();
        var surname = $('[name=surname]').val();
        /*
        var name = Meteor.user().profile.name;
        var surname = Meteor.user().profile.surname;
        */
        Meteor.users.update({
            _id: Meteor.userId()
            }, 
            { $set: {
                /*
                    email: email,
                    password: password,
                    username: username,
                    */
                    "profile.name": name,
                    "profile.surname": surname
                }
            }, 
            function(error){
               if(error){
                    console.log(error.reason);
                } else {
                    Router.go("/");
                }
            } 
        );

    }
});