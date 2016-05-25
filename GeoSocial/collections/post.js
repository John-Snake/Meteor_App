Post = new Mongo.Collection('post');

PostSchema = new SimpleSchema({
	userId: {
		type: String,
		regEx: SimpleSchema.RegEx.Id,
		autoValue: function () {
			return this.userId
		}
	},
	anonymous: {
		type: Number,
		min: 0,
		max: 1
	},
	dateTime: {
		type: Date,
	},
	latitude: {
		type: Number,
		decimal: true
	},
	longitude: {
		type: Number,
		decimal: true
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
      	type:Array,
      	optional: true
  	},
  	'votersLike.$':{
      	type:String,
      	regEx: SimpleSchema.RegEx.Id,
    },
    votersDislike: {
      	type:Array,
      	optional: true
  	},
  	'votersDislike.$':{
      	type:String,
      	regEx: SimpleSchema.RegEx.Id,
    }
});

Post.attachSchema(PostSchema);

Post.allow({
	// Allow insert function for Post collection if userId exist
	insert: function(userId) {
		return !!userId;
	},
	update: function(userId) {
		return !!userId;
	}

});