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
        $(".see-work-button").on("click", function(event) {
            event.preventDefault();
            $("html, body").animate({
              scrollTop: $(this.hash).offset().top - 70 // account for nav
            }, 500);
        });

        // swap out clear nav on front page
        if ($(".front-page-nav").length > 0) {
            $(".main-header").first().addClass("display-none");
            $(".front-page-nav").removeClass("display-none");
        }

        // set max-height for portfolio thumbnails on front page
        $(".portfolio__project__text").each(function(i) {
            var portfolioTextHeight = $(this).outerHeight();
            $(this).siblings().find(".attachment-post-thumbnail").css("max-height", portfolioTextHeight);
        });

        // show sticky nav bar on home page
        $(".see-work-button").waypoint(function(dir) {
            if (dir == "down") {
                
                $(".main-header").addClass("main-header--fixed").fadeIn(250);
            } else {
                $(".main-header").removeClass("main-header--fixed").css("display", "none");  // no fade out because of fast scroll-ups
            }
        });

        // validate contact form
        $(".wpcf7-submit").on("click", function(event) {
            var isError = false;

            if ($(".contact-form__name input").val() == "") {
                event.preventDefault();
                isError = true;
                $(".contact-form__name input").attr("placeholder", "Dont' forget your name!").addClass("form-error-background");
            }

            if ($(".contact-form__email input").val() == "") {
                event.preventDefault();
                isError = true;
                $(".contact-form__email input").attr("placeholder", "You forgot your email!").addClass("form-error-background");
            }

            if ($(".contact-form__message textarea").val() == "") {
                event.preventDefault();
                isError = true;
                $(".contact-form__message textarea").attr("placeholder", "Surely you have something to say!").addClass("form-error-background");
            }

            
            // remove form if successful
            if (!isError) {
                $(".wpcf7 div").not(".wpcf7-response-output").fadeOut(250);
            }
        });

        // take error styling away on focus
        $(".wpcf7-form").on("focus", ".form-error-background", function() {
            $(this).removeClass("form-error-background").attr("placeholder", "");
        });

    });

    $(window).scroll(function(event) {
        parallax();
    });

})(jQuery);