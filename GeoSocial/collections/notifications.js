Notifications = new Mongo.Collection('notifications');

NotificationsSchema = new SimpleSchema({
	postId: {
		type: String,
		regEx: SimpleSchema.RegEx.Id
	},
	userId: {
		type: String,
		regEx: SimpleSchema.RegEx.Id
	},
	observerUserId: {
		type: String,
		regEx: SimpleSchema.RegEx.Id
	},
	anonymous: {
		type: Number,
		allowedValues: [0, 1],
		defaultValue: 0
	},
	action: {
		type: String,
		allowedValues: ['commented', 'liked', 'disliked']
	},
	commentId: {
		type: String,
		regEx: SimpleSchema.RegEx.Id,
		optional: true
	},
	dateTime: {
		type: Date,
	},
	read: {
		type: Boolean,
		defaultValue: false
	}
});

Notifications.attachSchema(NotificationsSchema);

Notifications.allow({
	insert: function (userId, doc) {
	    // the user must be logged in, and the document must be owned by the current user
	    return (userId && doc.userId === userId);
 	},
	update: function (userId, doc, fields, modifier) { // it will only be possible for the observer to change read value from server-side code
	    // can only change your own documents
	    return doc.userId === userId;
	},
	// fetch only the field that are actually used by your functions
	fetch: ['userId']
});

Notifications.deny({
	update: function (userId, doc, fields, modifier) {
	    // can't change postId, userId, observerUserId and commentId
	    return _.contains(fields, 'postId') && _.contains(fields, 'userId') && _.contains(fields, 'observerUserId') 
	    		&& _.contains(fields, 'commentId');
  	}
});