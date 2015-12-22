# jQuery-Hover-Effects Plugin

The jQuery-Hover-Effects Plugin provides a way to place overlays on to images.

## Getting Started

### Downloading the latest changes

 1. [Downloading](https://github.com/prose100/jQuery-hover-effects/zipball/master) or Forking this repository
 2. Install [NodeJS](http://nodejs.org).
 3. Install the Grunt CLI To install by running `npm install -g grunt-cli`. More details are available on their website http://gruntjs.com/getting-started.
 4. Install the NPM dependencies by running `npm install`.
 5. The build can now be called by running `grunt`.

### Including it on your page

Include jQuery and the plugin on a page.  Call the function as shown.

```html
<div class="myhovereffect">
    <img width="100px" height="100px" src="img/web_page.png" alt="web page">
    <a href=""><img width="25px" height="25px" src="img/link-green.png" alt="link"></a>
 </div>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
<script src="hovereffect.js"></script>
<script>
$(function() {
    $(".myhovereffect").hovereffect({
      overlayClass: "overlay",
      duration: 500,
      opacity: 0.5,
      animation: "slideLeft"
    });
});
</script>
```
