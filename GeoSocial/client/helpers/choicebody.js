Template.choicebody.events({
	'click #aroundMe': function () {
		event.preventDefault();
		var distanceKm = $('#distance').val();
		Router.go("/allPosts/"+distanceKm);
	}
});