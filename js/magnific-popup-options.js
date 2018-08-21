$(document).ready(function() {
  // MagnificPopup
	var magnifPopup = function() {
		$('.image-popup').magnificPopup({
			type: 'image',
			removalDelay: 300,
			mainClass: 'mfp-with-zoom',
			gallery:{
				enabled:true
			},
			zoom: {
				enabled: true, // By default it's false, so don't forget to enable it

				duration: 300, // duration of the effect, in milliseconds
				easing: 'ease-in-out', // CSS transition easing function

				// The "opener" function should return the element from which popup will be zoomed in
				// and to which popup will be scaled down
				// By defailt it looks for an image tag:
				opener: function(openerElement) {
				// openerElement is the element on which popup was initialized, in this case its <a> tag
				// you don't need to add "opener" option if this code matches your needs, it's defailt one.
				return openerElement.is('img') ? openerElement : openerElement.find('img');
				}
			}
		});
	};

	var linkMagnifPopup = function() {
		$('.image-popup-link').magnificPopup({
		  type: 'image',
			image: {
			  markup: '<div class="mfp-figure">'+
			            '<div class="mfp-close"></div>'+
			            '<div class="mfp-img"></div>'+
			            '<div class="mfp-bottom-bar">'+
			              '<div class="mfp-title"></div>'+
			              '<div class="mfp-counter"></div>'+
			            '</div>'+
			          '</div>', // Popup HTML markup. `.mfp-img` div will be replaced with img tag, `.mfp-close` by close button

			  cursor: 'mfp-zoom-out-cur', // Class that adds zoom cursor, will be added to body. Set to null to disable zoom out cursor.

			  titleSrc: function(item) {
			     return item.el.attr('title') + '<small>' + item.el.attr('content') + '</small>' + '<small><a style="color: gray" href="'+item.el.attr('link')+'">' + item.el.attr('text') + '</a></small>';
			  },

			  verticalFit: true, // Fits image in area vertically

			  tError: '<a href="%url%">The image</a> could not be loaded.' // Error message
			}
		});
	};

	var projectMagnifPopup = function() {
		$('.image-popup-project-link').magnificPopup({
			type: 'image',
			image: {
				markup: '<div class="mfp-figure">'+
									'<div class="mfp-close"></div>'+
									'<div class="mfp-img"></div>'+
									'<div class="mfp-bottom-bar">'+
										'<div class="mfp-title"></div>'+
										'<div class="mfp-counter"></div>'+
									'</div>'+
								'</div>', // Popup HTML markup. `.mfp-img` div will be replaced with img tag, `.mfp-close` by close button

				cursor: 'mfp-zoom-out-cur', // Class that adds zoom cursor, will be added to body. Set to null to disable zoom out cursor.

				titleSrc: function(item) {
					 return item.el.attr('title') +
					 	'<small style="color: white; margin-top: 5px">' + item.el.attr('content') + '</small>' +
						'<small style="margin-top: 5px">'+
							'<a style="color: grey" href="'+item.el.attr('link')+'">'
								+ item.el.attr('text') +
							'</a>'+
						'</small>';
				},

				verticalFit: true, // Fits image in area vertically

				tError: '<a href="%url%">The image</a> could not be loaded.' // Error message
			}
		});
	};

	var magnifVideo = function() {
		$('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
        disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,

        fixedContentPos: false
    });
	};


	// Call the functions
	magnifPopup();
	linkMagnifPopup();
	projectMagnifPopup();
	magnifVideo();


});

$( "#contact" ).submit(function( event ) {
  event.preventDefault();

	var email = $( "#senderemail" ).val()
	var sendername = $( "#sendername" ).val()
	var message = $( "#message" ).val()

	$( "#contact" ).addClass("loading")
	$.ajax({
     type: "POST",
     url: "https://sendemailpublic.herokuapp.com/api/email/",
     data: {
			 email: email,
			 sendername: sendername,
			 message: message,
			 source: "patricksanang.github.io"
		 },
     success: function(data){
			 	$( "#senderemail" ).text("")
				$( "#sendername" ).text("")
				$( "#message" ).text("")
				$( "#response" ).text("Message sent with success!")
				$( "#responseerror" ).text("")

     },
		 complete: function(){
			 $( "#contact" ).removeClass("loading")
			 $( "#alert" ).css("display", "block")

		 },
		 error: function(err, rx){
			 console.log(data)
			 $( "#responseerror" ).text("A problem has occured, please retry!!")
			 $( "#response" ).text("")
		 }
  });
});
