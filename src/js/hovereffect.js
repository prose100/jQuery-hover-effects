;(function($){

	var defaults = {
		background_color: "#000",
		font_color: "#fff",
		duration: 500,
		opacity: 0.5,
		slidePath: ['', ''],
		wrapper_class: 'wrapper',
		hover_class: 'hover',
		base_class: 'base',
		elementWidth: '0px',
        elementHeight: '0px',
		overlayWidth: '0px',
		overlayHeight: '0px',
		zindex: 2
	};

	function HoverEffect(element, options) {
		
		settings = $.extend({}, defaults, options);
		$this = $(element);

		this.init();
	}

	HoverEffect.prototype.init = function() {

		var dimensions = this.getDimensions();
		$this.css({'width':dimensions.cWidth, 'height':dimensions.cHeight});

		var divs = this.createDivs(dimensions);
		this.setProperties(divs, dimensions);

		if (settings.slidePath[0]=='') {
			divs.hover.css(this.getCoordinates('zero', dimensions));
			divs.hover.css({'display':'none'});
			this.fade(divs);
		} else {
			var nodes = this.getNodes(dimensions);
			this.goToStart(nodes, divs);
			this.animate(nodes, divs);
		}
	};

	HoverEffect.prototype.getDimensions = function() {
		var elementWidth = parseInt(settings.elementWidth, 10);
		var elementHeight = parseInt(settings.elementHeight, 10);
		var overlayWidth = parseInt(settings.overlayWidth, 10);
		var overlayHeight = parseInt(settings.overlayHeight, 10);

		elementWidth = elementWidth > 0 ? elementWidth : $this.width();
		elementHeight = elementHeight > 0 ? elementHeight : $this.height();
		overlayWidth = overlayWidth > 0 ? overlayWidth : elementWidth;
		overlayHeight = overlayHeight > 0 ? overlayHeight : elementHeight;

		return dimensions = {
					cWidth : elementWidth,
					cHeight : elementHeight,
					oWidth : overlayWidth,
					oHeight : overlayHeight
				}
	}

	HoverEffect.prototype.createDivs = function(dimensions) {

		var $info = $this.next();
		$info.hide();

		var $wrapper = $('<div>').addClass('wrapper').addClass(settings.wrapper_class)
			.css({ 'width':dimensions.cWidth, 'height':dimensions.cHeight, 'position':'relative', 'overflow':'hidden' })
			.insertAfter($this);
		
		var $base = $('<div>').addClass(settings.base_class)
			.css({ 'width':dimensions.cWidth, 'height':dimensions.cHeight, 'position':'absolute', 'z-index':settings.zindex })
			.appendTo($wrapper);

		$this.clone().appendTo($wrapper);
		$this.hide();
		
		var $hover = $('<div>').addClass(settings.hover_class)
			.css({'width':dimensions.oWidth, 'height':dimensions.oHeight, 'position':'absolute', 'z-index':settings.zindex-1 })
			.appendTo($wrapper);

		$info.clone().show().appendTo($hover);
		
		var divs = {
			wrapper : $wrapper,
			base    : $base,
			hover   : $hover
		}

		return divs
	}

	HoverEffect.prototype.setProperties = function(divs, dimensions) {
		
		if (settings.opacity<1) { 
			divs.hover.css({'opacity': settings.opacity}); 
			}
		if (settings.background_color) { 
			divs.hover.css({'background-color': settings.background_color}); 
			}

		if (settings.font_color) { 
			divs.hover.css({'color': settings.font_color}); 
			}
	}

	HoverEffect.prototype.getNodes = function(dimensions) {
		var nodes = {
			begin : this.getCoordinates(settings.slidePath[0], dimensions),
			end   : this.getCoordinates(settings.slidePath[1], dimensions),
			base  : this.getCoordinates('base', dimensions)
		}
		return nodes
	}

	HoverEffect.prototype.getCoordinates = function(position, dimensions) {
		switch (position) {
			case 'left':
				return {top:this.locateOverlay(dimensions, 'height'), left:-dimensions.cWidth};
			case 'right':
				return {top:this.locateOverlay(dimensions, 'height'), left:(dimensions.cWidth)};
			case 'top':
				return {top:-dimensions.cHeight, left:this.locateOverlay(dimensions, 'width')};
			case 'bottom':
				return {top:dimensions.cHeight, left:this.locateOverlay(dimensions, 'width')};
			case 'topLeft':
				return {top:-dimensions.cHeight, left:-dimensions.cWidth};
			case 'topRight':
				return {top:-dimensions.cHeight, left:dimensions.cWidth};
			case 'bottomLeft':
				return {top:dimensions.cHeight, left:-dimensions.cWidth};
			case 'bottomRight':
				return {top:dimensions.cHeight, left:dimensions.cWidth};
			case 'base':
				if ((settings.slidePath[0]) == 'left') {
					return {top:this.locateOverlay(dimensions, 'height'), left:0};
				} else if ((settings.slidePath[0]) == 'right') {
					return {top:this.locateOverlay(dimensions, 'height'), left:dimensions.cWidth-dimensions.oWidth};
				} else if ((settings.slidePath[0]) == 'top') {
					return {top:0, left:console.log(this.locateOverlay(dimensions, 'width'))};
				} else if ((settings.slidePath[0]) == 'bottom') {
					return {top:dimensions.cHeight-dimensions.oHeight, left:this.locateOverlay(dimensions, 'width')};
				}
			case 'zero':
				return {top:0, left:0};
		}
	}

	HoverEffect.prototype.locateOverlay = function(dimensions, direction) {
		var locationOverlay = direction == 'height' ? (dimensions.cHeight - dimensions.oHeight)/2 : 
							   (dimensions.cWidth - dimensions.oWidth)/2;
		return locationOverlay;
	}

	HoverEffect.prototype.fade = function(divs) {
		divs.wrapper.hover(function() {
			divs.hover.stop().fadeIn(settings.duration);
			}, function() {	
				divs.hover.stop().fadeOut(settings.duration)
			}
		);		
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
			divs.hover.stop().css({'z-index':settings.zindex+1}).animate(nodes.base, settings.duration);
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