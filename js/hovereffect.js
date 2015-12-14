;(function($){


	var defaults = {
		overlayClass: "overlay"
	};

	function HoverEffect(element, options) {
		
		this.config = $.extend({}, defaults, options);
		this.element = element;
		this.init();
	}

	HoverEffect.prototype.init = function() {
		
		$(this.element)
			.css({
				"position": "relative",
				"display": "inline-block"
			})

		var overlay = $('<div>').addClass(this.config.overlayClass).appendTo(this.element);

		overlay
			.css({
				"position": "absolute",
				"left": 0,
				"top": 0,
				"display": "none",
				"opacity": 0,
				"height": "0px",
				"width": "0px"
			})
		};


	$.fn.hovereffect = function(options) {
		return this.each(function() {
			new HoverEffect(this, options);
		})
	}
			
})(jQuery);