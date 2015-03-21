// Kristin Skelton 3/13/15 Final Project
// Flickr js for Images page of Tracksuit Wedding website

$(document).ready(function(){

	//Define url for Ajax
	url =  "https://api.flickr.com/services/rest/?";
	url += "&method=flickr.people.getPublicPhotos";
	url += "&api_key=3c7dd7c489f7162cef970abf264e84e6";
	url += "&user_id=131007550@N08&format=json";

	//Ajax request to get the Flickr photos
	$.ajax({
		url: url,
		dataType: 'jsonp',
		jsonp: 'jsoncallback',
	}).done(function jsonFlickrApi(data){
		
		$.each(data.photos.photo, function(i, item){
			//Define photo url
			var photoURL = 'https://farm' + item.farm + '.staticflickr.com/' + item.server + '/' + item.id + '_' + item.secret + '.jpg';
			
			//Display each image on the page				
			$('#lightGallery').append('<li data-src="' + photoURL + '"><img src="' + photoURL + '" width="200" height="300" /></li>');

		});

		//Call jquery plugin to display images
		$("#lightGallery").lightGallery(); 	
	});


});



