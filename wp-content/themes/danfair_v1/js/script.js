// allow $ in wordpress jquery
(function($) {

    // functions and classes
    function parallax() {
        var scrolled = $(window).scrollTop();
        $(".parallax-bg").css("top", -(scrolled * 0.25) + "px");
    }

    //
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
            } else if ($arrow.hasClass("btn__github-logo")) {
                $arrow.addClass("github-pulse");
            }
        }, 
        function() {
            var $arrow = $(this).find(".btn__arrow");
            if ($arrow.hasClass("down") && !$arrow.parents(".btn").hasClass("see-work-button")) {
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
        var heroHeight = (windowHeight - navHeight) + 70;  // 70 for nav bar offset
        $(".hero-area").css("height", heroHeight);

        var heroAreaTextHeight = $(".hero-area__text-container").height();
        $(".hero-area__text-container").css("padding-top", ((heroHeight - heroAreaTextHeight) / 2) - 70);  // little higher than half way, 70 for nav bar offset

        // smooth scroll on front page
        var portfolioPosition = $(".portfolio").offset();
        $(".see-work-button").on("click", function(e) {
            e.preventDefault();
            $("html, body").animate({
              scrollTop: $(this.hash).offset().top
            }, 250);
        });

        // swap out clear nav on front page
        if ($(".front-page-nav").length > 0) {
            $(".main-nav").first().addClass("display-none");
            $(".front-page-nav").removeClass("display-none");
        }

        // set max-height for portfolio thumbnails on front page
        $(".portfolio__project__text").each(function(i) {
            var portfolioTextHeight = $(this).outerHeight();
            $(this).siblings().find(".attachment-post-thumbnail").css("max-height", portfolioTextHeight);
        });

    });

    $(window).scroll(function(e) {
        parallax();
    });

})(jQuery);