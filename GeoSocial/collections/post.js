Post = new Mongo.Collection('post');

LocationSchema = new SimpleSchema({
	type : {
		type : String,
		autoValue: function() {
		  return "Point";
		}
	},
	coordinates: {
		type: [Number],
	    decimal: true,
	    minCount: 2,
	    maxCount: 2
	}
});

PostSchema = new SimpleSchema({
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
	location: {
		type: LocationSchema,
		index: '2dsphere',
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

Post.attachSchema(PostSchema);

Post.allow({
	insert: function (userId, doc) {
	    // the user must be logged in, and the document must be owned by the current user
	    return (userId && doc.userId === userId);
 	},
	update: function (userId, doc, fields, modifier) { // it will only be possible to add like/dislike from server-side code
	    // can only change your own documents
	    return doc.userId === userId;
	},
	remove: function (userId, doc) {
	    // can only remove your own documents
	    return doc.userId === userId;
	},
	// fetch only the field that are actually used by your functions
	fetch: ['userId']
});

Post.deny({
  update: function (userId, doc, fields, modifier) {
    // can't change owners
    return _.contains(fields, 'userId');
  }
});