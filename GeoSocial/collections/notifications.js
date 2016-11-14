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
	    // the user must be logged in, the document must be owned by the current user and read must be false
	    return (userId && doc.userId === userId && doc.read == false);
 	},
 	update: function (userId, doc, fields, modifier) {
	    // can only change the documents you observe and modify the field 'read'
	    return doc.observerUserId === userId && _.contains(fields, "read");
	},
	remove: function (userId, doc) {
	    // can only remove your own documents
	    return doc.userId === userId;
	},
	// fetch only the field that are actually used by your functions
	fetch: ['userId', 'observerUserId', 'read']
});

Notifications.allow({
	update: function (userId, doc, fields, modifier) {
	    // can't change the fields: postId, userId, observerUserId, anonymous, action, commentId and dateTime
	    return _.contains(fields, "postId") || _.contains(fields, "userId") || _.contains(fields, "observerUserId") || 
	    		_.contains(fields, "anonymous") || _.contains(fields, "action") || _.contains(fields, "commentId") ||
	    		_.contains(fields, "dateTime");
	}
});