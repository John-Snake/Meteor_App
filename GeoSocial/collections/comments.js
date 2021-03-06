Comments = new Mongo.Collection('comments');

CommentsSchema = new SimpleSchema({
	postId: {
		type: String,
		regEx: SimpleSchema.RegEx.Id
	},
	userId: {
		type: String,
		regEx: SimpleSchema.RegEx.Id
	},
	anonymous: {
		type: Number,
		allowedValues: [0, 1]
	},
	dateTime: {
		type: Date,
	},
	text: {
		type: String
	},
	img_public_id: {
		type: String,
		optional: true
	},
	img_url: {
		type: String,
		regEx: SimpleSchema.RegEx.Url,
		optional: true
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
  	   	autoValue: function() {
    		if (this.isInsert) {
        		return [];
        	}
     	}
  	},
  	'votersLike.$':{
      	type: String,
      	regEx: SimpleSchema.RegEx.Id,
    },
    votersDislike: {
      	type: Array,
      	autoValue: function() {
    		if (this.isInsert) {
        		return [];
        	}
     	}
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
	remove: function (userId, doc) {
	    // can only remove your own documents
	    return doc.userId === userId;
	},
	// fetch only the field that are actually used by your functions
	fetch: ['userId']
});

Comments.deny({
	update: function (userId, doc, fields, modifier) {
	    // can't change owners and post
	    return _.contains(fields, 'postId') || _.contains(fields, 'userId');
  	}
});

// Update the like and dislike counters after any update if the length of the arrays votersLike or votersDislike change, 
// the new value is based on the length of those arrays.
Comments.after.update(function (userId, doc, fieldNames, modifier, options) {
	if(this.previous.votersLike.length !== doc.votersLike.length || this.previous.votersDislike.length !== doc.votersDislike.length) {
		Comments.update({ _id: doc._id }, 
			{ 
				$set: { 
					like: doc.votersLike.length, 
					dislike: doc.votersDislike.length
				} 
			}
		);
	}
});