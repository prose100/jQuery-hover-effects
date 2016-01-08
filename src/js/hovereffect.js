;(function($){

	var defaults = {
		overlayClass: "overlay",
		background_color: "#000",
		duration: 500,
		opacity: "0.5",
		path: ['left', 'topRight'],
		wrapper_class: 'wrapper',
		hover_class: 'hover',
		base_class: 'base',
		width: "300px",
		height: "300px",
		zindex: 2,
		onshow: function(){}	
	};

	function HoverEffect(element, options) {
		
		settings = $.extend({}, defaults, options);
		$this = $(element);

		this.init();
	}

	HoverEffect.prototype.init = function() {

		var dimensions = this.getDimensions();
		
		var divs = this.createDivs(dimensions);
	
		this.setProperties(divs);

		var nodes = this.getNodes(dimensions);

		this.goToStart(nodes, divs);

		this.animate(nodes, divs);
	};

	HoverEffect.prototype.getDimensions = function() {
		var width = $this.width() ?  $this.width(): settings.width;
		var height = $this.height() ? $this.height() : settings.height;

		return dimensions = {
					width : width,
					height : height
				}
	}

	HoverEffect.prototype.createDivs = function(dimensions) {

		var $info = $this.next();
		$info.hide();

		var $wrapper = $('<div>').addClass('wrapper').addClass(settings.wrapper_class).css({ 'width':dimensions.width, 'height':dimensions.height, 'position':'relative', 'overflow':'hidden' }).insertAfter($this);
		
		var $base = $('<div>').addClass(settings.base_class).css({ 'width':dimensions.width, 'height':dimensions.height, 'position':'absolute', 'z-index':settings.zindex }).appendTo($wrapper);
		$this.clone().appendTo($wrapper);
		$this.hide();
		
		var $hover = $('<div>').addClass(settings.hover_class).css({ 'width':dimensions.width, 'height':dimensions.height, 'position':'absolute', 'z-index':settings.zindex-1 }).appendTo($wrapper);
		$info.clone().show().appendTo($hover);
		
		var divs = {
			wrapper : $wrapper,
			base    : $base,
			hover   : $hover
		}

		return divs
	}


	HoverEffect.prototype.setProperties = function(divs) {
		if (settings.opacity<1) { 
			divs.hover.css({'opacity': settings.opacity}); 
			}
		if (settings.background_color) { 
			divs.hover.css({'background-color': settings.background_color}); 
			}
	}

	HoverEffect.prototype.getNodes = function(dimensions) {
		var nodes = {
			begin : this.getCoordinates(settings.path[0], dimensions),
			end   : this.getCoordinates(settings.path[1], dimensions),
			base  : {top:0, left:0}
		}
		return nodes
	}

	
	HoverEffect.prototype.getCoordinates = function(position, dimensions) {
		console.log(position)
		switch (position) {
			case 'left':
				return {top:0, left:-dimensions.width};
			case 'right':
				return {top:0, left:dimensions.width};
			case 'top':
				return {top:-dimensions.height, left:0};
			case 'bottom':
				return {top:dimensions.height, left:0};
			case 'topLeft':
				return {top:-dimensions.height, left:-dimensions.width};
			case 'topRight':
				return {top:-dimensions.height, left:dimensions.width};
			case 'bottomLeft':
				return {top:dimensions.height, left:-dimensions.width};
			case 'bottomRight':
				return {top:dimensions.height, left:dimensions.width};
		}
	}

	HoverEffect.prototype.goToStart = function(nodes, divs) {

		divs.hover.css({'z-index':settings.zindex-1, 'display':'none'})
			 .animate(nodes.begin, 0,
				function() {
			  		divs.hover.css({'display':'block'})
			  	}
			);
	}
	
	HoverEffect.prototype.animate = function(nodes, divs) {

		var _this = this;

		divs.wrapper.hover(function() {
			divs.hover.stop().css({'z-index':settings.zindex+1}).animate(nodes.base, settings.duration, settings.onshow());
			}, function() {	
				divs.hover.stop().animate(nodes.end, settings.duration,
					function() {
						_this.goToStart(nodes, divs);
					}
				)
			}		 
		)
	}	
	
	$.fn.hovereffect = function(options) {
		return this.each(function() {
			new HoverEffect(this, options);
		})
	}
			
})(jQuery);