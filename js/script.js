$(document).ready(function() {
	// Display the images
	var gallery_html = "";

	// The gallery images from data.js
	var images = data.images;

	// Set of tags collected from the images
	const tags = new Set();
	
	// Shuffle the images for a random order every time the page is loaded
	//shuffle(images);

	// For every image, display it in the gallery
	for (var i = 0; i < images.length; i += 1) {
		var image = images[i];
		var tags_class = image.tags.join(" ");	// CSS classes for tags
		// Add tag to the tags set
		for (var t = 0; t < image.tags.length; t += 1) {
			tags.add(image.tags[t]);
		}
		// If image is hidden, then don't show it
		if (image.hidden) {
			tags_class += " hidden-image"
		}
		gallery_html += "<a data-bs-toggle='modal' data-bs-target='#imageModal' class='gallery-img'><img src='"+image.thumbnail+"' alt='"+image.alt+"' id='img"+i+"' index='"+i+"' class='"+tags_class+"'></a>";
	}
	$("#gallery").html(gallery_html);

	// Add a click listener to open a modal when an image in the gallery is clicked
	for (var i = 0; i < images.length; i += 1) {
		$("#img"+i).click(function() {
			// The index number is the number assigned when the gallery was created (corresponds to the index of the images array in data.js)
			var index = +($(this).attr("index"));
			$("#imageModalLabel").html(images[index].title);

			// Create the carousel for the image(s)
			var src = images[index].src;
			var carousel_html = "";
			for (var j = 0; j < src.length; j += 1) {

				// The first image in the carousel is active
				if (j == 0) {
					carousel_html += "<div class='carousel-item active'>";
				}
				else {
					carousel_html += "<div class='carousel-item'>";
				}

				// If there are multiple images, then have the carousel images be a bit small to show the controls
				// Otherwise, have the carousel image span across the entire width available
				if (src.length > 1) {
					carousel_html += "<img src='"+ src[j] +"' class='d-block img-carousel-responsive' alt='...'>";
				}
				else {
					carousel_html += "<img src='"+ src[j] +"' class='d-block img-responsive' alt='...'>";
				}
				carousel_html += "</div>"
				$("#imageModalImage").html(carousel_html);
			}
			// If there are multiple images, then show the carousel controls and indicators and make the image slightly smaller
			// Otherwise, hide them
			if (src.length > 1) {
				$(".carousel-control-prev").show();
				$(".carousel-control-next").show();
				$(".carousel-indicators").show();
				var indicator_html = "";
				for (var j = 0; j < src.length; j += 1) {
					if (j == 0) {
						indicator_html += "<button type='button' data-bs-target='#modal-carousel' data-bs-slide-to='"+j+"' class='active' aria-current='true' aria-label='Slide "+(j+1)+"'></button>";
					}
					else {
						indicator_html += "<button type='button' data-bs-target='#modal-carousel' data-bs-slide-to='"+j+"' aria-label='Slide "+(j+1)+"'></button>";
					}
				}
				$(".carousel-indicators").html(indicator_html);
				$(".carousel-inner").addClass("carousel-inner-padding");
				$("#imageModalDesc").addClass("imageModalDescPadding");
			}
			else {
				$(".carousel-control-prev").hide();
				$(".carousel-control-next").hide();
				$(".carousel-indicators").hide();
				$(".carousel-inner").removeClass("carousel-inner-padding");
				$("#imageModalDesc").removeClass("imageModalDescPadding");
			}
			$("#imageModalDesc").html(getModalDescText(images[index]));
			//enableTooltips();
		});
	}

	createTagsDropdown(tags);
});

// Create the gallery image modal description section
function getModalDescText(image) {
	text = "";
	if (image.src.length == 1) {
		text += "1 image<br/><br/>";
	}
	else {
		text += ""+image.src.length+" images<br/>";
	}
	text += "<strong>Artist:</strong> "+image.artist+"<br/>";

	if (image.artist_url == null) {
		text += "";
	}
	else {
		text += "<strong><a href='"+image.artist_url+"' data-bs-toggle='tooltip' data-bs-placement='right' title='"+image.artist_url+"' target='_blank'>Artist's Page</a></strong><br/>";
	}

	if (image.art_url == null) {
		text += "Artwork was not posted publicly.<br/>";
	}
	else {
		text += "<strong><a href='"+image.art_url+"' data-bs-toggle='tooltip' data-bs-placement='right' title='"+image.art_url+"' target='_blank'>Art Source</a></strong><br/>";
	}

	text += "<br/><strong>Description:</strong><br/>" + image.desc + "<br/>";

	text += "<br/>[" + image.date_str + "]<br/>";

	return text;
}

// Enable tooltips
function enableTooltips() {
	var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
	var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
		return new bootstrap.Tooltip(tooltipTriggerEl)
	})
}

// Shuffle an array (Fisher-Yates [aka Knuth] Shuffle)
function shuffle(array) {
	var currentIndex = array.length,  randomIndex;
	// While there remain elements to shuffle...
	while (currentIndex != 0) {
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;
		// And swap it with the current element.
		[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
	}

	return array;
}

// Map a string to another string
function translateWord(word) {
	var translations = {
		hooters: "Hooters 🦉",
		nsfw: "NSFW 🔞"
	};
	if (word in translations) {
		return translations[word];
	}
	else {
		return word;
	}
}

// Create the tags dropdown menu
function createTagsDropdown(tags) {
	// Delete the empty string tag
	tags.delete("");

	var tags_to_show = {};
	
	// By default, hide images with these tags
	$(".hooters").hide();
	$(".nsfw").hide();

	// Create the dropdown options
	var tags_dropdown_HTML = "";
	tags.forEach (function(value) {
		tags_dropdown_HTML += "<li><label><input type='checkbox' value='"+value+"'> <strong>"+translateWord(value)+"</strong></label></li>"
		tags_to_show[value] = false;
	});
	$("#tags-dropdown").html(tags_dropdown_HTML);

	// When a checkbox is checked/unchecked in the dropdown menu...
	$(".checkbox-menu").on("change", "input[type='checkbox']", function() {
		var tag = $(this)[0].value;

		// If the tag is "nsfw" and is checked, then ask for 18+ confirmation
		if (tag == "nsfw" && $(this).closest("input").prop("checked")) {
			// The checked property is set to true at this call because clicking on the checkbox causes it to flip checked at this moment
			var nsfw_confirmation = confirm("By clicking OK, you are confirming that you are 18 years or older. Click Cancel if you are not.");
			// Set the checkbox to unchecked if Cancel was selected instead of OK
			if (!nsfw_confirmation) {
				$(this).closest("input").prop("checked", false);
				return false;
			}
		}

		// Mark the tag in the map to true if checked and false if unchecked
		$(this).closest("li").toggleClass("active", this.checked);
		if ($(this).closest("li").hasClass("active")) {
			tags_to_show[tag] = true;
		}
		else {
			tags_to_show[tag] = false;
		}

		// Go through the map and show/hide the images
		// Might need to rework this part by iterating over each image and checking their tags
		for (let key in tags_to_show) {
			if (tags_to_show[key]) {
				$("."+key).show();
			}
			else {
				$("."+key).hide();
			}
		}
	});
}