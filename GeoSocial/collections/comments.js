Comments = new Mongo.Collection('comments');

CommentsSchema = new SimpleSchema({
	postId: {
		type: String,
		regEx: SimpleSchema.RegEx.Id,
	},
	userId: {
		type: String,
		regEx: SimpleSchema.RegEx.Id,
	},
	anonymous: {
		type: Number,
		min: 0,
		max: 1
	},
	dateTime: {
		type: Date,
	},
	text: {
		type: String
	},
	like: {
		type: Number,
		min: 0,
		defaultValue: 0
	},
	dislike: {
		type: Number,
		min: 0,
		defaultValue: 0
	},
	votersLike: {
      	type: Array,
      	optional: true
  	},
  	'votersLike.$':{
      	type: String,
      	regEx: SimpleSchema.RegEx.Id,
    },
    votersDislike: {
      	type: Array,
      	optional: true
  	},
  	'votersDislike.$':{
      	type: String,
      	regEx: SimpleSchema.RegEx.Id,
    }
});

Comments.attachSchema(CommentsSchema);

Comments.allow({
	insert: function (userId, doc) {
	    // the user must be logged in, and the document must be owned by the current user
	    return (userId && doc.userId === userId);
 	},
	update: function (userId, doc, fields, modifier) { // it will only be possible to add like/dislike from server-side code
	    // can only change your own documents
	    return doc.userId === userId;
	},
	remove: function (userId, doc) { // e quando l'autore del post rimuove il post??
	    // can only remove your own documents
	    return doc.userId === userId;
	},
	// fetch only the field that are actually used by your functions
	fetch: ['userId']
});

Comments.deny({
	update: function (userId, doc, fields, modifier) {
	    // can't change owners and post
	    return _.contains(fields, 'userId') && _.contains(fields, 'postId');
  	}
});