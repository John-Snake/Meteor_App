/*
Meteor.publish("userData", function () {
  if (this.userId) {
    return Meteor.users.find({_id: this.userId}, {fields: {'other': 1, 'things': 1}});
  } else {
    this.ready();
  }
});
*/

Meteor.publish("usersEmail", function () {
    return Meteor.users.find({}, {fields: {"emails.address": 1}});
});

Meteor.publish("usersUsername", function () {
    return Meteor.users.find({}, {fields: {"username": 1}});
});