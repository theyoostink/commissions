# commissions

## About

This is a webpage for my art commissions. Check it out! [https://theyoostink.github.io/commissions/](https://theyoostink.github.io/commissions/)

For any questions about the gallery site or how to use the template, contact Yoostink.

I can also provide support for customized functionality like a danbooru-style tag selection feature instead of a filter, one-and-done age verification prompt, default display based on tag combinations, a mode for showing all entries, row-by-row display instead of column-by-column display, disabling permalinks, etc.

Sites that use my template:
- https://talkingdinosaur.github.io/commissions/
- https://eebyverse.github.io/commissions/
- https://theashenjedi.github.io/commissions/
- https://violetblade.github.io/violetverse/
- https://urbydizzy.github.io/urbyverse/

## Customization

I made this website from scratch, but I designed the code so that it can be used as a template by anyone who wants to copy it and customize it to make it their own. You just need some working knowledge of HTML, CSS, and JavaScript along with Bootstrap and jQuery. And obviously, you'll need knowledge of git and GitHub since you're already here. Once all of the setup is done, you just need to alter the JSON file to add entries. I have written a more in-depth guide, so please let me know if you would like a copy.

Files to modify:

- `index.html` (content of the About Me modal, social links, titles, etc.)
	- Also modify or remove the Google Analytics script in the `head` section
- `css/styles.css` (the colors and fonts and other styles)
- `js/script.js` (translateWord function will map tag names to a fancier display string in the filter menu)
- `js/data.js` (the JSON data about the commissions themselves)

You can then deploy the website for free with GitHub Pages, but it will use a `github.io` domain. With GitHub Pages, the URL will be in the format `https://<YOUR_GITHUB_USERNAME>.github.io/<YOUR_REPOSITORY_NAME>/`. You can also buy your own domain name and have it point to this site. Look up instructions online. Or you can opt to host the site on something like AWS S3, but it will cost money. And you're probably using this template to avoid having to pay for hosting. If you want to spend money, you might as well use a service like WordPress or Squarespace so that you can use a CMS and cool fancy designs.

Image hosting should be done on another site or app. GitHub has size limits for the overall repository and for individual files. For ease of use, images should be hosted on a site like imgur, catbox.moe, or imgchest that will provide a permanent URL for the hosted image's location for free. That URL should be used to populate `data.js` fields: `src` and `thumbnail`.

An explanation of the `data.js` object fields:

- `src`: An array of URL strings for the full resolution images. If there are multiple URLs in the array, then it will display the images in a carousel.
- `thumbnail`: A URL string for the thumbnail image. The thumbnail image should be a small and compressed version of the source image to help with page load time.
- `title`: A string for the title which will be displayed at the top of the modal.
- `artist`: A string for the artist's name.
- `artist_url`: A string for the artist's social media page URL. I usually use the artist's Twitter or pixiv for this field.
- `art_url`: A string for the URL of the public post of the artwork. If there is no public post, then you can set this to `null`.
- `desc`: A string for the description.
- `date_str`: A string for the date. I usually use the month and year.
- `tags`: A list of strings for the tags attached to this image. This dictates the tags that will show up in the Filter as well as how it will be displayed when tags are selected in the Filter.
- `hidden`: A boolean for whether or not you want this post to be visible. This overrides the Filter display rule.

## Features

Regarding tags:

- Tags should be lowercase (and are also case-sensitive)
- The order of the tags is dictated by the order in which they appear in `data.js`.
- I recommend having a placeholder hidden entry as the first entry in `data.js` with the tag order you desire in the `tags` field
- Having the placeholder hidden entry also allows your actual first entry to have an index of 1 since arrays are zero-indexed
- Special logic is in place for the `nsfw` tag: selecting it in the Filter dropdown will ask the user to confirm their age where clicking OK will reveal NSFW images and Cancel will prevent them from enabling the tag

Regarding the search bar and filter:

- The Filter dropdown uses AND logic: the image must have exactly the tags that are specified by the filter
- The search bar also uses AND logic on top of the Filter dropdown
- The search bar checks the `title`, `desc`, and `artist` fields
- An entry with an empty `tags` array or an array with just an empty string element will show up by default with an empty Filter and search bar

Regarding series links:

- Series links is a feature I implemented that allows you to link to another entry within an entry to immediately open its modal
- Clicking on a series link will close the current entry's modal and then open the modal for the next entry
- This can be used to chain together entries in a series with one leading to the next without having to close the modal, look for the next entry in the gallery, and then open the next modal
- The `desc` field supports HTML, so you can insert a series link using the following format:
	- `<span class='series-link' index='XXXXX'>click this link</span>`
	- The class needs to be `series-link`
	- The `index` attribute should be equal to the string of the index number of the entry in `data.js`
	- There isn't an easy way to find the index number of any given entry; you can use the browser's Inspect Element on the thumbnail and see the index number there

Regarding entry permalinks:

- You can share the permalink for an entry by opening the entry on the page and copying the URL
- The URL will be in the format: `https://<YOUR_GITHUB_USERNAME>.github.io/<YOUR_REPOSITORY_NAME>/#XXXXX` where `XXXXX` is the index number of the entry
- It looks like an anchor link, and opening the URL on the browser will cause the page to automatically open the corresponding entry's modal when it loads

Regarding other features:

- Other than clicking the X icon, you can close a modal by clicking the back button or hitting the escape key
- The shuffle button next to the Filter dropdown will randomize the order of the entries on display
- The default order of the entries on display are top to bottom within a column and then left to right between columns while balancing column heights
- The website is responsive and mobile-friendly
- I may add new features to or fix bugs on the site over time, so check back every so often to see if I made any functional changes