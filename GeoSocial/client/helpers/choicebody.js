Template.choicebody.events({
	'click #aroundMe': function () {
		var distanceKm = $('#distance').val();
		Router.go("/allPosts/"+distanceKm);
	}
});