// Kristin Skelton 3/13/15 Final Project
// Contact js for Contact page of Tracksuit Wedding website


//Create dialog box
$('.submit-message').dialog({
			modal: true,
			autoOpen: false,
			width: 500,
			height: 450			
});

//When form is submitted do the following
$('form').on('submit', function(event){
	event.preventDefault();

	//Get values from form elements
	var name = $('.name').val();
	var email = $('.email').val();
	if ($('.checkbox1').is(":checked"))
	{
	  // it is checked
	  var services = $('.checkbox1').val();
	} else if ($('.checkbox2').is(":checked")){
	  // it is checked
	  var services = $('.checkbox2').val();
	}

	var heard  = $('#heard').val();
	var message = $('.message').val();

	//Define url for ajax requests
	var url = "https://httpbin.org/post"

	//Ajax post request
	$.ajax({
	  url: url,
	  type: 'POST',	  
	  dataType: 'json',
	  data: {name:'name', email:'email',services:'services', heard:'heard', message:'message'},
	  }).done(function(data){		
	  	//Display form responses to the user
		$('input.name').replaceWith(name + '<br/>');
		$('input.email').replaceWith(email + '<br/>');
		$('.services').replaceWith(services + '<br/>');
		$('#heard').replaceWith(heard + '<br/>');
		$('.message').replaceWith(message + '<br/>');

		//Open the form submitted dialog box
		$('.submit-message').dialog('open');

	});

});