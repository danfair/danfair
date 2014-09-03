// allow $ in wordpress jquery
(function($) {

    // functions and classes
    function parallax() {
        var scrolled = $(window).scrollTop();
        $(".parallax-bg").css("top", -(scrolled * 0.2) + "px");
    }

    function loadPosts(pageNumber) {
        $(".blog-section__loading-indicator").fadeIn(100);
        $.ajax({
            url: "../wp-admin/admin-ajax.php",
            type:'POST',
            data: "action=infinite_scroll&page_no="+ pageNumber + '&loop_file=more-posts', 
            success: function(html){
                
                $(".page-content__content-left").append(html);
                $(".blog-section__post__button.page-" + pageNumber).parents(".blog-section__post").each(function(index) {
                    var $that = $(this);
                    collapsePost($that);
                }); 
                
                // add event listeners for loaded post buttons
                $(".blog-section__post__button.page-" + pageNumber)
                    .on("click", function(event) {
                        event.preventDefault();
                        var $that = $(this);
                        togglePostView($that);
                    })
                    .hover(function(event) {
                        var $that = $(this);
                        buttonAnimate($that);
                    }, function(event) {
                        var $that = $(this);
                        buttonRemoveAnimate($that);
                    });
            }
        });
        $(".blog-section__loading-indicator").fadeOut(1000);
        return false;
    }

    function loadCarousel(postId, startAt) {
        $.ajax({
            url: "../../wp-admin/admin-ajax.php",
            type:'POST',
            data: "action=image_carousel&post_id="+ postId + '&template=images-carousel&start=' + startAt, 
            success: function(html){
                
                $("body").append(html);  
                centerCarousel();
                
                $(".carousel-button").click(function(event) {
                    event.preventDefault(); 
                    var carouselButton = $(this);
                    if (carouselButton.hasClass("previous")) {
                        if (carouselButton.siblings(".carousel-images-list").find(".current").prev().is("li")) {
                            carouselButton.siblings(".carousel-images-list").find(".current").fadeOut(0).removeClass("current").prev("li").fadeIn(150).addClass("current");
                        } else {
                            carouselButton.siblings(".carousel-images-list").find(".current").fadeOut(0).removeClass("current");
                            $(".carousel-images-list li").last().fadeIn(150).addClass("current");
                        }
                        centerCarousel();
                    } else {
                        if (carouselButton.siblings(".carousel-images-list").find(".current").next().is("li")) {
                            carouselButton.siblings(".carousel-images-list").find(".current").fadeOut(0).removeClass("current").next("li").fadeIn(150).addClass("current");
                        } else {
                            carouselButton.siblings(".carousel-images-list").find(".current").fadeOut(0).removeClass("current");
                            $(".carousel-images-list li").first().fadeIn(150).addClass("current");
                        }
                        centerCarousel();
                    }
                });

                $(".project-section__images-carousel__overlay").click(function(event) {
                    $(".project-section__images-carousel").remove();
                    $(this).remove();
                });

                $(".carousel-exit").click(function(event) {
                    event.preventDefault();
                    $(".project-section__images-carousel").remove();
                    $(".project-section__images-carousel__overlay").remove();
                });
            }
        });
        return false;
    }

    function centerCarousel() {
        windowHeight = $(window).outerHeight();
        windowWidth = $(window).outerWidth();
        imageHeight = $(".carousel-images-list li.current").outerHeight();
        imageWidth = $(".carousel-images-list li.current").outerWidth();
        $(".project-section__images-carousel").css({
            top: (windowHeight - imageHeight) / 2
        });
    }

    function buttonAnimate(that) {
        var $arrow = that.find(".btn__arrow");
            if ($arrow.hasClass("down")) {
                $arrow.addClass("bounce-down");
            } else if ($arrow.hasClass("up")) {
                $arrow.addClass("bounce-up");
            } else if ($arrow.hasClass("right")) {
                $arrow.addClass("bounce-right");
            } else if ($arrow.hasClass("btn__github-logo")) {
                $arrow.addClass("github-pulse");
            }
    }

    function buttonRemoveAnimate(that) {
        var $arrow = that.find(".btn__arrow");
            if ($arrow.hasClass("down") && !$arrow.parents(".btn").hasClass("see-work-button")) {
                $arrow.removeClass("bounce-down");
            } else if ($arrow.hasClass("up")) {
                $arrow.removeClass("bounce-up");
            } else if ($arrow.hasClass("right")) {
                $arrow.removeClass("bounce-right");
            }
    }

    function togglePostView(that) {
        
        if (that.children(".btn__arrow").hasClass("down")) {
            that.html('Close<div class="btn__arrow black"></div>').children(".btn__arrow").addClass("btn__arrow--flip up bounce-up");
            
            // change layout, then animate in
            that.siblings("p:nth-of-type(1)").css({
                    float: "none",
                    width: "100%"
                });
            that.siblings("p:not(:nth-of-type(1)), .tags-list, .attachment-post-thumbnail").animate({ 
                height: 'toggle',
                opacity: 'toggle' 
            }, 500);
        } else {
            that.html('See more<div class="btn__arrow black"></div>').children(".btn__arrow").addClass("down bounce-down");

            // animate out, then change layout
            that.siblings("p:not(:nth-of-type(1)), .tags-list, .attachment-post-thumbnail").animate({ 
                height: 'toggle', 
                opacity: 'toggle'
            }, 500, function() {
                $(this).siblings("p:nth-of-type(1)").css({
                    float: "left",
                    width: "65%"
                });
            });
        }
    }

        // initial collapse of blog posts
        function collapsePost(that) {
            that.children("p:not(:nth-of-type(1)), .tags-list, .attachment-post-thumbnail").css("display", "none");
            that.children("p:nth-of-type(1)").css({
                float: "left",
                width: "65%",
                marginBottom: 0
            });
        }

    //
    $(document).ready(function() {

        // button animations
        $(".btn").hover(function(event) {
            var $that = $(this);
            buttonAnimate($that);
        }, 
        function() {
            var $that = $(this);
            buttonRemoveAnimate($that);
        });

        // size hero area on front page
        var windowHeight = $(window).height();
        var navHeight = $(".main-nav").height();
        var heroHeight = (windowHeight - navHeight) + 70;  // 70 for nav bar offset
        $(".hero-area").css("height", heroHeight);

        var heroAreaTextHeight = $(".hero-area__text-container").height();
        $(".hero-area__text-container").css("padding-top", ((heroHeight - heroAreaTextHeight) / 2) - 70);  // little higher than half way, 70 for nav bar offset

        // smooth scroll on front page
        $(".see-work-button").on("click", function(event) {
            event.preventDefault();
            $("html, body").animate({
              scrollTop: $(this.hash).offset().top - 70 // account for nav
            }, 500);
        });

        $(".front-page-nav li.menu-item:first-child a").on("click", function(event) {
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
            if (dir === "down") {
                $(".main-header").addClass("main-header--fixed").css("opacity", ".9").fadeIn(250);
            } else {
                $(".main-header").removeClass("main-header--fixed").css("display", "none");  // no fade out because of fast scroll-ups yeah
            }
        });

        // sticky nav for non-home pages
        $(".page-sub-header__text").waypoint(function(dir) {
            if (dir === "down") {
                $(".main-header").addClass("main-header--fixed").fadeIn(250).css("opacity", ".9");
            } else {
                $(".main-header").removeClass("main-header--fixed").css("opacity", "1");  // no fade out because of fast scroll-ups
            }
        });

        // validate contact form
        $(".wpcf7-submit").on("click", function(event) {
            var isError = false;

            if ($(".contact-form__name input").val() === "") {
                event.preventDefault();
                isError = true;
                $(".contact-form__name input").attr("placeholder", "Dont' forget your name!").addClass("form-error-background");
            }

            if ($(".contact-form__email input").val() === "") {
                event.preventDefault();
                isError = true;
                $(".contact-form__email input").attr("placeholder", "You forgot your email!").addClass("form-error-background");
            }

            if ($(".contact-form__message textarea").val() === "") {
                event.preventDefault();
                isError = true;
                $(".contact-form__message textarea").attr("placeholder", "Surely you have something to say!").addClass("form-error-background");
            }
            
            // remove form if successful
            if (!isError) {
                $(".wpcf7 div").not(".wpcf7-response-output").fadeOut(250);
            }
        });

        // position background arrow exactly for submit button
        var inputWidth = $(".wpcf7-submit").outerWidth();
        var backgroundXPos = inputWidth - 38;
            // 38 = 20 padding, 18 width of arrow)
        $(".wpcf7-submit").css("background-position", backgroundXPos + "px 50%");

        // take error styling away on focus
        $(".wpcf7-form").on("focus", ".form-error-background", function() {
            $(this).removeClass("form-error-background").attr("placeholder", "");
        });

        // space down bar chart in about section
        $(".blue-bar").each(function(index) {
            switch(index) {
                case 0:
                    $(this).css("margin-top", "20px");
                    break;
                case 1: 
                    $(this).css("margin-top", "40px");
                    break;
                case 2:
                    $(this).css("margin-top", "70px");
                    break;
                case 3:
                    $(this).css("margin-top", "80px");
                    break;
            }
        });

        // initial hide of blog post body
        $(".blog-section__post").each(function(i) {
            if (i !== 0) {
                var that = $(this);
                collapsePost(that);
            }
        });

        $(".blog-section__post__button").on("click", function(event) {
            event.preventDefault();
            var that = $(this);
            togglePostView(that);
        });

        // image carousel on project pages
        $(".project-preview-image").click(function(event) {
            event.preventDefault(); 
            var startAt = $(this).data("image-no");
            var postId = $(".page-sub-header__text h1").data("post-id");
            loadCarousel(postId, startAt);
        });



        // on scroll events
        var isBlogPage = $(".blog-section").length > 0 ? true : false;
        var pageCounter = 2;
        $(window).scroll(function(event) {
            parallax();
            
            // load next batch of blog posts
            if  (isBlogPage && $(window).scrollTop() === $(document).height() - $(window).height()) {
                var hasLastPostSet = $(".blog-section__post").last().hasClass("last-set");
                if (!hasLastPostSet) {
                    loadPosts(pageCounter);
                }
                pageCounter++;
            }
        });
    });

})(jQuery);