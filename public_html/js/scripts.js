(function($){
  // wrslider plugin - slide items to the left with looping
  $.fn.wrslider = function(options){
    // With this syntax, there is no separate init() method.
    console.log("wrslider init started...");
    // Place all initialisation code in this main function.
    
    // The element that called this function.
    var $this = $(this);
    var $container = $this.children().eq(0);
    var $slides = function(){ return $container.children(); } // because wrapping changes $slides
    
    console.log ("slider element (this): "); console.log($this);
    console.log ("slide container: "); console.log($container);
    console.log ("slides: "); console.log($slides());
    
    // First, define defaults and override with user input.
    var settings = $.extend({
      /* The slider elements and their classes. */
      // mainSliderClass: $this.attr('class'),
      // slideContainerClass: $container.attr('class'),
      /* CSS Prefix for slider elements. */
      cssPrefix: 'wrs-',
      slideClass: function(){return this.cssPrefix + 'slide'}, // remember to call with ()
      /* Whether to wrap slides, and with what. */
      slideWrap: false,
      slideWrapWith: 'div', //@TODO: handle 'div.class'
    }, options);
    
    /* SETUP */
    // Wrap slides?
    if (settings.slideWrap === true) {
      //console.log('slideWrap is true; wrapping slides with '); console.log(settings.slideWrapWith);
      $slides().wrap("<" + settings.slideWrapWith + " class=\"" + settings.slideClass() + "\"></" + settings.slideWrapWith + ">");
      //console.log('done wrapping');
    }

    // Set container width equal to the total width of the slides.
    $container.css('width',function(){
      var totalWidth = 0, slides = $slides();      
      slides.each(function(){ 
        totalWidth += parseInt($(this).css('width'));
      });
      return "" + totalWidth + "px";
    });

    
     // Animate w/ Callback
    function animateSlider() {
      $container.animate({left: "-=200px"},4000,'linear', wrapSlides);
    }
    // Animation Callback
    function wrapSlides() {
      // handle the case when the end of the slider has been reached
      animateSlider();
    }
    

    // End of the initialisation!
    console.log("wrslider init done.");

    // Start the animation 1.5 second after page load.
    setTimeout(animateSlider,1500);
    
  };
}( jQuery ));

/////////////////////////////////////////////

$(function(){
  $(".clients-slider").wrslider({
    slideWrap: true,
  });
});


