$(document).ready(function() {
	// Display the images
	var gallery_html = "";
	var images = data.images;
	const tags = new Set();
	
	//shuffle(images);

	for (var i = 0; i < images.length; i += 1) {
		var image = images[i];
		var tags_class = image.tags.join(" ");
		for (var t = 0; t < image.tags.length; t += 1) {
			tags.add(image.tags[t]);
		}
		if (image.hidden) {
			tags_class += " hidden-image"
		}
		gallery_html += "<a data-bs-toggle='modal' data-bs-target='#imageModal' class='gallery-img'><img src='"+image.thumbnail+"' alt='"+image.alt+"' id='img"+i+"' index='"+i+"' class='"+tags_class+"'></a>";
	}
	$("#gallery").html(gallery_html);

	// Add a click listener to open a modal
	for (var i = 0; i < images.length; i += 1) {
		$("#img"+i).click(function() {
			var index = +($(this).attr("index"));
			$("#imageModalLabel").html(images[index].title);
			var src = images[index].src;
			var carousel_html = "";
			for (var j = 0; j < src.length; j += 1) {
				if (j == 0) {
					carousel_html += "<div class='carousel-item active'>";
				}
				else {
					carousel_html += "<div class='carousel-item'>";
				}

				if (src.length > 1) {
					carousel_html += "<img src='"+ src[j] +"' class='d-block img-carousel-responsive' alt='...'>";
				}
				else {
					carousel_html += "<img src='"+ src[j] +"' class='d-block img-responsive' alt='...'>";
				}
				carousel_html += "</div>"
				$("#imageModalImage").html(carousel_html);
			}
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
				$("#imageModalFooter").addClass("imageModalFooterPadding");
			}
			else {
				$(".carousel-control-prev").hide();
				$(".carousel-control-next").hide();
				$(".carousel-indicators").hide();
				$(".carousel-inner").removeClass("carousel-inner-padding");
				$("#imageModalFooter").removeClass("imageModalFooterPadding");
			}
			$("#imageModalFooter").html(getModalFooterText(images[index]));
			//enableTooltips();
		});
	}

	createTagsDropdown(tags);
});

function getModalFooterText(image) {
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
function enableTooltips() {
	var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
	var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
		return new bootstrap.Tooltip(tooltipTriggerEl)
	})
}

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

function createTagsDropdown(tags) {
	tags.delete("");
	var tags_to_show = {};
	
	$(".hooters").hide();
	$(".nsfw").hide();

	//<li><label><input type="checkbox"> Cheese</label></li>
	var tags_dropdown_HTML = "";
	tags.forEach (function(value) {
		tags_dropdown_HTML += "<li><label><input type='checkbox' value='"+value+"'> "+translateWord(value)+"</label></li>"
		tags_to_show[value] = false;
	});
	$("#tags-dropdown").html(tags_dropdown_HTML);

	$(".checkbox-menu").on("change", "input[type='checkbox']", function() {
		var tag = $(this)[0].value;

		// If the tag is "nsfw" and is unchecked, then ask for 18+ confirmation
		if (tag == "nsfw" && $(this).closest("input").prop("checked")) {
			// The checked property is set to true at this call because clicking on the checkbox causes it to flip checked at this moment
			var nsfw_confirmation = confirm("By clicking OK, you are confirming that you are 18 years or older. Click Cancel if you are not.");
			//
			if (!nsfw_confirmation) {
				$(this).closest("input").prop("checked", false);
				return false;
			}
		}

		$(this).closest("li").toggleClass("active", this.checked);
		if ($(this).closest("li").hasClass("active")) {
			tags_to_show[tag] = true;
		}
		else {
			tags_to_show[tag] = false;
		}
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