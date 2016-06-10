Template.editComment.helpers({
	'thisComment': function() {
		return Comments.findOne({_id: Session.get('commentId')});
	}
});

Template.editComment.events({
	'focus #commentTextarea': function() {
		var textarea = document.querySelector('textarea');
		autosize(textarea);
	},
	'click #comment_anonymous': function() {
		var anonymous = $('#comment_anonymous:checked').val();
		var icon = $('#commentProfileIcon');
		if(anonymous==1) {
			icon.removeClass('fa-user');
			icon.addClass('fa-user-secret');
		}
		else if(anonymous===undefined) {
			icon.removeClass('fa-user-secret');
			icon.addClass('fa-user');
		}
	},
	'click #editComment': function() {
		var id = Session.get('commentId');
		var dateTime = new Date();
        var text = $('#commentTextarea').val();
        var anonymous = $('#comment_anonymous:checked').val();

        if(anonymous===undefined) {
       		anonymous = 0;
       	}

       	Comments.update( { _id : id },
			{	$set: {
					anonymous: anonymous,
                    dateTime: dateTime,
                    text: text
        		}
    		},
 		    function(error){
               	if(error){
               		console.log(error.reason);
                    console.log(error.invalidKeys);
                    Bert.alert( error.reason, 'danger', 'growl-top-right' );
                }  
                else {
                	Modal.hide('editComment');
                    Bert.alert( "Comment edited successfully.", 'success', 'growl-top-right' );
                }
            }
    	);

	}
});

Template.editComment.destroyed = function() {
    delete Session.keys.commentId;

    setTimeout(function(){
        Modal.show('postDetail')
   	}, 500);
};