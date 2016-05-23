// Format date using Moment.js [Example: 1 Jenuary 2016]
Template.registerHelper('formatDateProfile', function (date) {
	return moment(date).format("DD MMMM YYYY");
})

// Format date using Moment.js [Example: ...]
Template.registerHelper('formatDatePost', function (date) {
	return moment(date).format("MM/DD/YYYY, hh:mm");
})

// Auto grow text area
autoGrow = function (element) {
    element.style.height = "auto";
    element.style.height = (element.scrollHeight+5)+"px";
}

// Change privacy input type range info
privacyInfoUpdate = function (inputRange) {
	document.getElementById('label_user_privacy').innerHTML='Privacy: livello '+inputRange.value;
}