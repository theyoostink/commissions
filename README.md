# commissions

## Intro

This is a webpage for my art commissions. Check it out! [https://theyoostink.github.io/commissions/](https://theyoostink.github.io/commissions/)

## Customization

I made this website from scratch, but I designed the code so that it can be used as a template by anyone who wants to copy it and customize to make it their own. You just need some working knowledge of HTML, CSS, and JavaScript along with Bootstrap and jQuery.

Files to modify:

- `index.html` (content of the About Me modal, social links, titles, etc.)
- `css/styles.css` (the colors and fonts and other styles)
- `js/script.js` (translateWord function will map tag names to a fancier display string in the filter menu)
- `js/data.js` (the JSON data about the commissions themselves)

You can then deploy the website for free with GitHub Pages, but it will use a `github.io` domain. You can also buy your own domain name and have it point to this site. Look up instructions online.

Image hosting should be done on another site or app. GitHub has size limits for the overall repository and for individual files. For ease of use, images should be hosted on a site like imgur, catbox.moe, or imgchest that will provide a URL for the hosted image's location. That URL should be used to populate `data.js` fields: `src` and `thumbnail`.

An explanation of the `data.js` object fields:

- `src`: An array of URL strings for the full resolution image. If there are multiple URLs in the array, then it will display the images in a carousel.
- `thumbnail`: A URL string for the thumbnail image. The thumbnail image should be a small and compressed version of the source image to help with page load time.
- `title`: A string for the title which will be displayed at the top of the modal.
- `artist`: A string for the artist's name
- `artist_url`: A string for the artist's social media page URL. I usually use the artist's Twitter or pixiv for this field.
- `art_url`: A string for the URL of the public post of the artwork. If there is not public post, then you can set this to `null`.
- `desc`: A string for the description.
- `date_str`: A string for the date. I usually use the month and year.
- `tags`: A list of strings for the tags attached to this image. This dictates the tags that will show up in the Filter as well as how it will be displayed when tags are selected in the Filter.
- `hidden`: A boolean for whether or not you want this post to be visible. This overrides the tag Filter display rule.