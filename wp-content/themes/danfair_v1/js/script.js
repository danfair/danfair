(function($) {

    $(document).ready(function() {
        
        

        // button animations
        $(".btn").hover(function(event) {
            var $arrow = $(this).find(".btn__arrow");
            if ($arrow.hasClass("down")) {
                $arrow.addClass("bounce-down");
            } else if ($arrow.hasClass("up")) {
                $arrow.addClass("bounce-up");
            } else if ($arrow.hasClass("right")) {
                $arrow.addClass("bounce-right");
            }
        }, 
        function() {
            var $arrow = $(this).find(".btn__arrow");
            if ($arrow.hasClass("down")) {
                $arrow.removeClass("bounce-down");
            } else if ($arrow.hasClass("up")) {
                $arrow.removeClass("bounce-up");
            } else if ($arrow.hasClass("right")) {
                $arrow.removeClass("bounce-right");
            }
        });

        // size hero area on front page
        var windowHeight = $(window).height();
        var navHeight = $(".main-nav").height();
        var heroHeight = windowHeight - navHeight;
        $(".hero-area").css("height", heroHeight);

        var heroAreaTextHeight = $(".hero-area__text-container").height();
        $(".hero-area__text-container").css("padding-top", ((heroHeight - heroAreaTextHeight) / 2));

        // smooth scroll on front page
        var portfolioPosition = $(".portfolio").offset();
        $(".see-work-button").on("click", function(e) {
            e.preventDefault();
            $("html, body").animate({
              scrollTop: $(this.hash).offset().top
            }, 250);
        });

    });
})(jQuery);