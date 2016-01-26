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
		contentWidth: "0px",
		contentHeight: "0px",
		overlayWidth: "0px",
		overlayHeight: "0px",
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
		$this.css({'width':dimensions.cWidth, 'height':dimensions.cHeight});

		var divs = this.createDivs(dimensions);
		this.setProperties(divs, dimensions);
		var nodes = this.getNodes(dimensions);
	
		this.setProperties(divs, dimensions);
		
		this.goToStart(nodes, divs);
		this.animate(nodes, divs);
	};

	HoverEffect.prototype.getDimensions = function() {
		var contentWidth = parseInt(settings.contentWidth, 10);
		var contentHeight = parseInt(settings.contentHeight, 10);
		var overlayWidth = parseInt(settings.overlayWidth, 10);
		var overlayHeight = parseInt(settings.overlayHeight, 10);

		contentWidth = contentWidth > 0 ? contentWidth : $this.width();
		contentHeight = contentHeight > 0 ? contentHeight : $this.height();
		overlayWidth = overlayWidth > 0 ? overlayWidth : contentWidth;
		overlayHeight = overlayHeight > 0 ? overlayHeight : contentHeight;

		return dimensions = {
					cWidth : contentWidth,
					cHeight : contentHeight,
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
				return {top:0, left:-dimensions.cWidth};
			case 'right':
				return {top:0, left:dimensions.cWidth};
			case 'top':
				return {top:-dimensions.cHeight, left:0};
			case 'bottom':
				return {top:dimensions.cHeight, left:0};
			case 'topLeft':
				return {top:-dimensions.cHeight, left:-dimensions.cWidth};
			case 'topRight':
				return {top:-dimensions.cHeight, left:dimensions.cWidth};
			case 'bottomLeft':
				return {top:dimensions.cHeight, left:-dimensions.cWidth};
			case 'bottomRight':
				return {top:dimensions.cHeight, left:dimensions.cWidth};
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