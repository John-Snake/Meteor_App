Template.smallSpinner.onRendered(function(){
    var options = _.extend({}, Meteor.smallSpinner.options, this.data);

    this.spinner = new Spinner(options);
    this.spinner.spin(this.firstNode);
});


Template.smallSpinner.onDestroyed(function(){
    this.spinner && this.spinner.stop();
});


Meteor.smallSpinner = {
    options: {
        lines: 13, // The number of lines to draw
        length: 10, // The length of each line
        width: 5, // The line thickness
        radius: 15, // The radius of the inner circle
        scale: 0.5, // The scale of the spinner
        corners: 0.7, // Corner roundness (0..1)
        rotate: 0, // The rotation offset
        direction: 1, // 1: clockwise, -1: counterclockwise
        color: 'white', // #rgb or #rrggbb
        speed: 1, // Rounds per second
        trail: 60, // Afterglow percentage
        shadow: true, // Whether to render a shadow
        hwaccel: false, // Whether to use hardware acceleration
        className: 'spinner', // The CSS class to assign to the spinner
        top: 'auto', // Top position relative to parent in px
    }
};