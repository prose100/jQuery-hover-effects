# jQuery-Hover-Effects Plugin

The jQuery-Hover-Effects Plugin reveals hidden content on an element while hovering the mouse over it.

## Getting Started

### Downloading the latest changes

 Simply [Download](https://github.com/prose100/jQuery-hover-effects/zipball/master) or Fork this repository

### If you want to build the plugin, using Grunt's features
 1. Install [NodeJS](http://nodejs.org).
 2. Install the Grunt CLI To install by running `npm install -g grunt-cli`. More details are available on their website http://gruntjs.com/getting-started.
 3. Install the NPM dependencies by running `npm install`.
 4. The build can now be called by running `grunt`.

## Including it on your page

Here is a basic implementation. Include the shown HTML and scripts.  Call the function as shown.

```html
<img class="content" src="img/web_page.png" alt="web page">
<div class="overlay" style="display: none">Content For Overlay Goes Here!</div>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
<script src="js/hovereffect.js"></script>

<script>
	$(function() {
       	$(".content").hovereffect({
        	background_color: "#777",
          	duration: 500,
          	opacity: 0.7,
          	slidePath: ['left', 'bottomRight'],
          	contentWidth: "0px",
			contentHeight: "0px",
			overlayWidth: "0px",
			overlayHeight: "0px",
        });
    });
</script>
```

## Getting more details

Visit [paultrose.com](http://www.paultrose.com/blogDec15.html) for more details about this plugin.
