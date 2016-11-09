Notifications = new Mongo.Collection('notifications');

NotificationsSchema = new SimpleSchema({
	senderUserId: {
		type: String,
		regEx: SimpleSchema.RegEx.Id
	},
	postId: {
		type: String,
		regEx: SimpleSchema.RegEx.Id
	},
	observerUserId: {
		type: String,
		regEx: SimpleSchema.RegEx.Id
	},
	anonymous: {
		type: Number,
		min: 0,
		max: 1
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
	insert: function (senderUserId, doc) {
	    // the user must be logged in, and the document must be owned by the current user
	    return (senderUserId && doc.senderUserId === senderUserId);
 	},
	update: function (senderUserId, doc, fields, modifier) { //come setto il read=true ??
	    // can only change your own documents
	    return doc.senderUserId === senderUserId;
	},
	// fetch only the field that are actually used by your functions
	fetch: ['senderUserId']
});

Notifications.deny({
	update: function (senderUserId, doc, fields, modifier) {
	    // can't change owners and post
	    return _.contains(fields, 'senderUserId') && _.contains(fields, 'postId');
  	}
});