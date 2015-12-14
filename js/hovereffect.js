;(function($){

	var defaults = {
		overlayClass: "overlay",
		duration: 500,
		opacity: "0.5",
		animation: "slideLeft"	
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

		var height = $(this.element).children(":first").attr("height");
		var width = $(this.element).children(":first").attr("width");

		this[this.config.animation](overlay, height, width);
	};

	HoverEffect.prototype.slideDown = function(overlay, height, width) {
		
		var _this = this;

		$(this.element).hover(function() {	
			overlay.stop()
				.css({
					width: width,
					opacity: _this.config.opacity,
					display: "block"
				})
				.animate({
					height: height
				}, _this.config.duration)}, function() {	
			overlay.stop()
				.animate({
					height: "0px"
				}, _this.config.duration, function(){
				overlay
					.css({
						width: "0px",
						opacity: 0,
						display: "none"
					})
				})	
			}
		)
	}

	HoverEffect.prototype.slideUp = function(overlay, height, width) {
		
		var _this = this;

		$(this.element).hover(function() {	
			overlay.stop()
				.css({
					top: height,
					width: width,
					opacity: _this.config.opacity,
					display: "block"
				})
				.animate({
					top: 0,
					height: height,
				}, _this.config.duration)}, function() {	
			overlay.stop()
				.animate({
					height: "0px",
					top: height,					
				}, _this.config.duration, function(){
				overlay
					.css({
						width: "0px",
						opacity: 0,
						display: "none"
					})
				})	
			}
		)
	}

	HoverEffect.prototype.slideRight = function(overlay, height, width) {
		
		var _this = this;

		$(this.element).hover(function() {	
			overlay.stop()
				.css({
					height: height,
					opacity: _this.config.opacity,
					display: "block"
				})
				.animate({
					width: width
				}, _this.config.duration)}, function() {	
			overlay.stop()
				.animate({
					width: "0px"
				}, _this.config.duration, function(){
				overlay
					.css({
						height: "0px",
						opacity: 0,
						display: "none"
					})
				})	
			}
		)
	}

	HoverEffect.prototype.slideLeft = function(overlay, height, width) {
		
		var _this = this;

		$(this.element).hover(function() {	
			overlay.stop()
				.css({
					left: width,
					height: height,
					opacity: _this.config.opacity,
					display: "block"
				})
				.animate({
					left: 0,
					width: width
				}, _this.config.duration)}, function() {	
			overlay.stop()
				.animate({
					left: width,
					width: "0px"
				}, _this.config.duration, function(){
				overlay
					.css({
						height: "0px",
						opacity: 0,
						display: "none"
					})
				})	
			}
		)
	}


	$.fn.hovereffect = function(options) {
		return this.each(function() {
			new HoverEffect(this, options);
		})
	}
			
})(jQuery);