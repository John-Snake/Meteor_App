// Format date using Moment.js [Example: 1 Jenuary 2016]
Template.registerHelper('formatDateProfile', function (date) {
	return moment(date).format("DD MMMM YYYY");
})

// Format date using Moment.js [Example: 01/01/2016, 15:00]
Template.registerHelper('formatDatePost', function (date) {
	return moment(date).format("DD/MM/YYYY, hh:mm");
})

// Auto grow text area
autoGrow = function (element) {
    element.style.height = "auto";
    element.style.height = (element.scrollHeight+5)+"px";
}

// Change privacy input type range info
privacyInfoUpdate = function (inputRange) {
	document.getElementById('label_user_privacy').innerHTML='Privacy: livello '+inputRange.value;
}

like = function(post_id, like, dislike, counter) {
	var likeButton = document.getElementById("like_"+post_id);
	var dislikeButton = document.getElementById("dislike_"+post_id);
	var temp = counter;
	var addLike = parseInt(like)+1;

	if(temp === 0) { // Add 1 like
				
		Post.update({_id : post_id}, 
			{$set: {like : addLike}},
 		    function(error){
               	if(error){
                    console.log(error.reason);
                }
            	else{
            		temp++;

            		// Like function will fail the first if and the like button is set to disabled
            		likeButton.setAttribute("onclick","like('"+post_id+"',"+addLike+","+dislike+","+temp+")");
            		likeButton.disabled = true;

        			// Dislike function will add 1 dislike and remove 1 like
            		dislikeButton.setAttribute("onclick","dislike('"+post_id+"',"+addLike+","+dislike+",-1)");
            		dislikeButton.disabled = false;
            	}    
            }
        );
	}
	else if (temp === -1) { // Add 1 like, remove 1 dislike
		var decreaseDislike = parseInt(dislike)-1;

		Post.update({_id : post_id}, 
			{$set: {like : addLike, dislike: decreaseDislike}},
 		    function(error){
               	if(error){
                    console.log(error.reason);
                }
            	else{
            		temp = 1;

            		// Like function will fail the first if and the like button is set to disabled
            		likeButton.setAttribute("onclick","like('"+post_id+"',"+addLike+","+decreaseDislike+","+temp+")");
            		likeButton.disabled = true;

            		// Dislike function will add 1 dislike and remove 1 like
            		dislikeButton.setAttribute("onclick","dislike('"+post_id+"',"+addLike+","+decreaseDislike+", -1)");
            		dislikeButton.disabled = false;
            	}    
            }
        );
	}

}

dislike = function(post_id, like, dislike, counter) {
	var dislikeButton = document.getElementById("dislike_"+post_id);
	var likeButton = document.getElementById("like_"+post_id);
	var temp = counter;
	var addDislike = parseInt(dislike)+1;

	if(temp === 0) { // Add 1 dislike

		Post.update({_id : post_id}, 
			{$set: {dislike : addDislike}},
 		    function(error){
               	if(error){
                    console.log(error.reason);
                }
            	else{
            		temp++;

            		// Dislike function will fail the first if and the dislike button is set to disabled
            		dislikeButton.setAttribute("onclick","dislike('"+post_id+"',"+like+","+addDislike+","+temp+")");
            		dislikeButton.disabled = true;

            		// Like function will add 1 like and remove 1 dislike
            		likeButton.setAttribute("onclick","like('"+post_id+"',"+like+","+addDislike+", -1)");
            		likeButton.disabled = false;
            	}    
            }
        );
	}
	else if (temp === -1) { // Add 1 dislike, remove 1 like
		var decreaselike = parseInt(like)-1;

		Post.update({_id : post_id}, 
			{$set: {like : decreaselike, dislike: addDislike}},
 		    function(error){
               	if(error){
                    console.log(error.reason);
                }
            	else{
            		temp = 1;

            		// Dislike function will fail the first if and the dislike button is set to disabled
            		dislikeButton.setAttribute("onclick","dislike('"+post_id+"',"+decreaselike+","+addDislike+","+temp+")");
            		dislikeButton.disabled = true;

            		// Like function will add 1 like and remove 1 dislike
            		likeButton.setAttribute("onclick","like('"+post_id+"',"+decreaselike+","+addDislike+", -1)");
            		likeButton.disabled = false;
            	}    
            }
        );
	}

}