/*
	Editorial by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	skel.breakpoints({
		xlarge: '(max-width: 1680px)',
		large: '(max-width: 1280px)',
		medium: '(max-width: 980px)',
		small: '(max-width: 736px)',
		xsmall: '(max-width: 480px)',
		'xlarge-to-max': '(min-width: 1681px)',
		'small-to-xlarge': '(min-width: 481px) and (max-width: 1680px)'
	});

	$(function() {

		var	$window = $(window),
			$head = $('head'),
			$body = $('body');

		// Disable animations/transitions ...

			// ... until the page has loaded.
				$body.addClass('is-loading');

				$window.on('load', function() {
					setTimeout(function() {
						$body.removeClass('is-loading');
					}, 100);
				});

			// ... when resizing.
				var resizeTimeout;

				$window.on('resize', function() {

					// Mark as resizing.
						$body.addClass('is-resizing');

					// Unmark after delay.
						clearTimeout(resizeTimeout);

						resizeTimeout = setTimeout(function() {
							$body.removeClass('is-resizing');
						}, 100);

				});

		// Fix: Placeholder polyfill.
			$('form').placeholder();

		// Prioritize "important" elements on medium.
			skel.on('+medium -medium', function() {
				$.prioritize(
					'.important\\28 medium\\29',
					skel.breakpoint('medium').active
				);
			});

		// Fixes.

			// Object fit images.
				if (!skel.canUse('object-fit')
				||	skel.vars.browser == 'safari')
					$('.image.object').each(function() {

						var $this = $(this),
							$img = $this.children('img');

						// Hide original image.
							$img.css('opacity', '0');

						// Set background.
							$this
								.css('background-image', 'url("' + $img.attr('src') + '")')
								.css('background-size', $img.css('object-fit') ? $img.css('object-fit') : 'cover')
								.css('background-position', $img.css('object-position') ? $img.css('object-position') : 'center');

					});

		// Sidebar.
			var $sidebar = $('#sidebar'),
				$sidebar_inner = $sidebar.children('.inner');

			// Inactive by default on <= large.
				skel
					.on('+large', function() {
						$sidebar.removeClass('inactive');
					})
					.on('-large !large', function() {
						$sidebar.addClass('inactive');
					});

			// Hack: Workaround for Chrome/Android scrollbar position bug.
				if (skel.vars.os == 'android'
				&&	skel.vars.browser == 'chrome')
					$('<style>#sidebar .inner::-webkit-scrollbar { display: none; }</style>')
						.appendTo($head);

			// Toggle.
				if (skel.vars.IEVersion > 9) {

					$('<a href="#sidebar" class="toggle">Toggle</a>')
						.appendTo($sidebar)
						.on('click', function(event) {

							// Prevent default.
								event.preventDefault();
								event.stopPropagation();

							// Toggle.
								$sidebar.toggleClass('inactive');

						});

				}

			// Events.

				// Link clicks.
					$sidebar.on('click', 'a', function(event) {

						// >large? Bail.
							if (!skel.breakpoint('large').active)
								return;

						// Vars.
							var $a = $(this),
								href = $a.attr('href'),
								target = $a.attr('target');

						// Prevent default.
							event.preventDefault();
							event.stopPropagation();

						// Check URL.
							if (!href || href == '#' || href == '')
								return;

						// Hide sidebar.
							$sidebar.addClass('inactive');

						// Redirect to href.
							setTimeout(function() {

								if (target == '_blank')
									window.open(href);
								else
									window.location.href = href;

							}, 500);

					});

				// Prevent certain events inside the panel from bubbling.
					$sidebar.on('click touchend touchstart touchmove', function(event) {

						// >large? Bail.
							if (!skel.breakpoint('large').active)
								return;

						// Prevent propagation.
							event.stopPropagation();

					});

				// Hide panel on body click/tap.
					$body.on('click touchend', function(event) {

						// >large? Bail.
							if (!skel.breakpoint('large').active)
								return;

						// Deactivate.
							$sidebar.addClass('inactive');

					});

			// Scroll lock.
			// Note: If you do anything to change the height of the sidebar's content, be sure to
			// trigger 'resize.sidebar-lock' on $window so stuff doesn't get out of sync.

				$window.on('load.sidebar-lock', function() {

					var sh, wh, st;

					// Reset scroll position to 0 if it's 1.
						if ($window.scrollTop() == 1)
							$window.scrollTop(0);

					$window
						.on('scroll.sidebar-lock', function() {

							var x, y;

							// IE<10? Bail.
								if (skel.vars.IEVersion < 10)
									return;

							// <=large? Bail.
								if (skel.breakpoint('large').active) {

									$sidebar_inner
										.data('locked', 0)
										.css('position', '')
										.css('top', '');

									return;

								}

							// Calculate positions.
								x = Math.max(sh - wh, 0);
								y = Math.max(0, $window.scrollTop() - x);

							// Lock/unlock.
								if ($sidebar_inner.data('locked') == 1) {

									if (y <= 0)
										$sidebar_inner
											.data('locked', 0)
											.css('position', '')
											.css('top', '');
									else
										$sidebar_inner
											.css('top', -1 * x);

								}
								else {

									if (y > 0)
										$sidebar_inner
											.data('locked', 1)
											.css('position', 'fixed')
											.css('top', -1 * x);

								}

						})
						.on('resize.sidebar-lock', function() {

							// Calculate heights.
								wh = $window.height();
								sh = $sidebar_inner.outerHeight() + 30;

							// Trigger scroll.
								$window.trigger('scroll.sidebar-lock');

						})
						.trigger('resize.sidebar-lock');

					});

		// Menu.
			var $menu = $('#menu'),
				$menu_openers = $menu.children('ul').find('.opener');

			// Openers.
				$menu_openers.each(function() {

					var $this = $(this);

					$this.on('click', function(event) {

						// Prevent default.
							event.preventDefault();

						// Toggle.
							$menu_openers.not($this).removeClass('active');
							$this.toggleClass('active');

						// Trigger resize (sidebar lock).
							$window.triggerHandler('resize.sidebar-lock');

					});

				});

	});

//Modal

// Get the modal
var mymodal = document.getElementById('myModal');

// Get the button that opens the modal
var mybtn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var myspan = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
mybtn.onclick = function() {
    mymodal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
myspan.onclick = function() {
    mymodal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == mymodal) {
        mymodal.style.display = "none";
    }
}


// Smooth Scroll
$(document).ready(function(){
  // Add smooth scrolling to all links
  $("a").on('click', function(event) {

    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 850, function(){
   
        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      });
    } // End if
  });
});

//imba_Modal

// Get the modal
var imba_modal = document.getElementById('imba_modal');

// Get the button that opens the modal
var imba_btn = document.getElementById("imba_btn");

// Get the <span> element that closes the modal
var imba_span = document.getElementsByClassName("imba_close")[0];

// When the user clicks the button, open the modal 
imba_btn.onclick = function() {
    imba_modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
imba_span.onclick = function() {
    imba_modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == imba_modal) {
        imba_modal.style.display = "none";
    }
}

//feat_Modal

// Get the modal
var feat_modal = document.getElementById('feat_modal');

// Get the button that opens the modal
var feat_btn = document.getElementById("feat_btn");

// Get the <span> element that closes the modal
var feat_span = document.getElementsByClassName("feat_close")[0];

// When the user clicks the button, open the modal 
feat_btn.onclick = function() {
    feat_modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
feat_span.onclick = function() {
    feat_modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == feat_modal) {
        feat_modal.style.display = "none";
    }
}


//data_ex_Modal

// Get the modal
var data_ex_modal = document.getElementById('data_ex_modal');

// Get the button that opens the modal
var data_ex_btn = document.getElementById("data_ex_btn");

// Get the <span> element that closes the modal
var data_ex_span = document.getElementsByClassName("data_ex_close")[0];

// When the user clicks the button, open the modal 
data_ex_btn.onclick = function() {
    data_ex_modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
data_ex_span.onclick = function() {
    data_ex_modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == data_ex_modal) {
        data_ex_modal.style.display = "none";
    }
}

//data_stand_Modal

// Get the modal
var data_stand_modal = document.getElementById('data_stand_modal');

// Get the button that opens the modal
var data_stand_btn = document.getElementById("data_stand_btn");

// Get the <span> element that closes the modal
var data_stand_span = document.getElementsByClassName("data_stand_close")[0];

// When the user clicks the button, open the modal 
data_stand_btn.onclick = function() {
    data_stand_modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
data_stand_span.onclick = function() {
    data_stand_modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == data_stand_modal) {
        data_stand_modal.style.display = "none";
    }
}



//feat_sel_Modal

// Get the modal
var feat_sel_modal = document.getElementById('feat_sel_modal');

// Get the button that opens the modal
var feat_sel_btn = document.getElementById("feat_sel_btn");

// Get the <span> element that closes the modal
var feat_sel_span = document.getElementsByClassName("feat_sel_close")[0];

// When the user clicks the button, open the modal 
feat_sel_btn.onclick = function() {
    feat_sel_modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
feat_sel_span.onclick = function() {
    feat_sel_modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == feat_sel_modal) {
        feat_sel_modal.style.display = "none";
    }
}

//resamp_Modal

// Get the modal
var resamp_modal = document.getElementById('resamp_modal');

// Get the button that opens the modal
var resamp_btn = document.getElementById("resamp_btn");

// Get the <span> element that closes the modal
var resamp_span = document.getElementsByClassName("resamp_close")[0];

// When the user clicks the button, open the modal 
resamp_btn.onclick = function() {
    resamp_modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
resamp_span.onclick = function() {
    resamp_modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == resamp_modal) {
        resamp_modal.style.display = "none";
    }
}


})(jQuery);