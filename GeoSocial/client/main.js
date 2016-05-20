// Format date
Template.registerHelper('formatDate', function (date) {
	var date = new Date(date);
	var monthNames = [
	  "January", "February", "March",
	  "April", "May", "June", "July",
	  "August", "September", "October",
	  "November", "December"
	];
	var dateString = date.getDate()+" "+monthNames[date.getMonth()]+" "+date.getFullYear();
	return dateString;
})

// Auto grow text area
autoGrow = function (element) {

    element.style.height = "auto";
    element.style.height = (element.scrollHeight+5)+"px";

}