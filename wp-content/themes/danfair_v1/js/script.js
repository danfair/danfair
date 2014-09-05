"use strict";

// allow $ in wordpress jquery
(function($) {

    // page identifier global vars
    var page = (function() {
        var pageObj = {};

        pageObj.isHome = function() {
            return $(".hero-area").length > 0 ? true : false;
        };

        pageObj.isBlog = function() {
            return $(".blog-section").length > 0 ? true : false;
        };

        pageObj.isContact = function() {
            return $(".contact-section").length > 0 ? true : false;
        };

        pageObj.isAbout = function() {
            return $(".about-section").length > 0 ? true : false;
        };

        pageObj.isProject = function() {
            return $(".project-section").length > 0 ? true : false;
        };

        pageObj.win = $(window);

        return pageObj;

    }());

    var navigation = {
        // swap out clear nav on front page
        home: function() {
            $(".main-header").first().addClass("display-none");
            $(".front-page-nav").removeClass("display-none");
        },

        // show sticky nav bar on home page
        homeStickyNav: function() {

            $(".see-work-button").waypoint(function(dir) {
                if (dir === "down") {
                    $(".main-header").addClass("main-header--fixed").css("opacity", ".9").fadeIn(250);
                } else {
                    $(".main-header").removeClass("main-header--fixed").css("display", "none");  // no fade out because of fast scroll-ups
                }
            });

        },

        // smooth scroll on front page
        portfolioAnchorScroll: function() {
            $(".see-work-button, .front-page-nav li.menu-item:first-child a").on("click", function(event) {
            event.preventDefault();
            $("html, body").animate({
              scrollTop: $(this.hash).offset().top - 70 // account for nav
            }, 500);
            });
        },

    };

    var heroArea = {

        size: function() {
            var windowHeight = page.win.height();
            var navHeight = $(".main-nav").height();
            var heroHeight = (windowHeight - navHeight) + 70;  // 70 for nav bar offset
            var heroAreaTextHeight = $(".hero-area__text-container").height();

            $(".hero-area").css("height", heroHeight);
            $(".hero-area__text-container").css("padding-top", ((heroHeight - heroAreaTextHeight) / 2) - 70);  // little higher than half way, 70 for nav bar offset
        },

        parallax: function() {
            var scrolled = page.win.scrollTop();
            $(".parallax-bg").css("top", -(scrolled * 0.2) + "px");
        }

    };

    var portfolio = {

        // set max-height for portfolio thumbnails on front page
        sizeHomeImages: function() {
            $(".portfolio__project__text").each(function(i) {
                var portfolioTextHeight = $(this).innerHeight();
                $(this).siblings().find(".attachment-post-thumbnail").css("max-height", portfolioTextHeight);
            });
        }

    };

    var carousel = {
        
        load: function(postId, startAt) {
            $.ajax({
                url: "../../wp-admin/admin-ajax.php",
                type:'POST',
                data: "action=image_carousel&post_id="+ postId + '&template=images-carousel&start=' + startAt, 
                success: function(html){
                    
                    $("body").append(html);  
                    carousel.center();
                    
                    // add new event listeners
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
                            carousel.center();
                        } else {
                            if (carouselButton.siblings(".carousel-images-list").find(".current").next().is("li")) {
                                carouselButton.siblings(".carousel-images-list").find(".current").fadeOut(0).removeClass("current").next("li").fadeIn(150).addClass("current");
                            } else {
                                carouselButton.siblings(".carousel-images-list").find(".current").fadeOut(0).removeClass("current");
                                $(".carousel-images-list li").first().fadeIn(150).addClass("current");
                            }
                            carousel.center();
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
        }, 

        center: function() {
            var windowHeight = page.win.outerHeight();
            var imageHeight = $(".project-section__images-carousel").outerHeight();
            var topValue = (windowHeight - imageHeight) / 2;
            $(".project-section__images-carousel").css("top", topValue);
        }

    };

    var button = {

        animate: function(button) {
            var $arrow = button.find(".btn__arrow");
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

        removeAnimate: function(button) {
            var $arrow = button.find(".btn__arrow");
            if ($arrow.hasClass("down") && !$arrow.parents(".btn").hasClass("see-work-button")) {
                $arrow.removeClass("bounce-down");
            } else if ($arrow.hasClass("up")) {
                $arrow.removeClass("bounce-up");
            } else if ($arrow.hasClass("right")) {
                $arrow.removeClass("bounce-right");
            }
        },

        // position background arrow exactly for submit button
        submitArrow: function() {
            var inputWidth = $(".wpcf7-submit").outerWidth();
            var backgroundXPos = inputWidth - 38;  // 38 = 20 padding, 18 width of arrow)
            $(".wpcf7-submit").css("background-position", backgroundXPos + "px 50%");   
        }

    };

    var blogPost = {
        
        toggleView: function(postButton) {
            if (postButton.children(".btn__arrow").hasClass("down")) {
                blogPost.show(postButton);      
            } else {
                blogPost.hide(postButton);
            }
        },

        show: function(postButton) {
            postButton.html('Close<div class="btn__arrow black"></div>').children(".btn__arrow").addClass("btn__arrow--flip up");

            postButton.siblings("p:not(:first-of-type), .tags-list, .attachment-post-thumbnail").fadeIn(200, function() {
                postButton.siblings("p, .tags-list, .attachment-post-thumbnail").removeClass("close").addClass("open");
            });
            postButton.addClass("btn--right");
            $(".attachment-post-thumbnail").css("display", "block");
        },

        hide: function(postButton) {
            postButton.html('See more<div class="btn__arrow black"></div>').children(".btn__arrow").addClass("down");

            postButton.siblings("p:not(:first-of-type), .tags-list, .attachment-post-thumbnail").fadeOut(200, function() {
                postButton.siblings("p, .tags-list, .attachment-post-thumbnail").removeClass("open").addClass("close");
            });
            postButton.removeClass("btn--right");
            postButton.parents(".blog-section__post .open").removeClass("open").addClass("close");
        },

        initialCollapse: function(postButton) {
            $("blog-section__post.close").removeClass("close").addClass("open");
        },

        loadMore: function(pageNumber) {
            $(".blog-section__loading-indicator").fadeIn(100);
            $.ajax({
                url: "../wp-admin/admin-ajax.php",
                type:'POST',
                data: "action=infinite_scroll&page_no="+ pageNumber + '&loop_file=more-posts', 
                success: function(html){
                    
                    $(".page-content__content-left").append(html);
            $("p, .tags-list, .attachment-post-thumbnail").each(function(i) {
                $(this).addClass("close");
            });
                    
                    // add event listeners for loaded post buttons
                    $(".blog-section__post__button.page-" + pageNumber)
                        .on("click", function(event) {
                            event.preventDefault();
                            var $button = $(this);
                            blogPost.toggleView($button);
                        })
                        .hover(function(event) {
                            var $button = $(this);
                            button.animate($button);
                        }, function(event) {
                            var $button = $(this);
                            button.removeAnimate($button);
                        });
                }
            });
            $(".blog-section__loading-indicator").fadeOut(1000);
            return false;
        }

    };

    var contactForm = {

        validate: function() {

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
                    contactForm.success();
                }
            
        },

        removeErrorFormat: function(field) {
            field.removeClass("form-error-background").attr("placeholder", "");
        },

        success: function() {
            $(".wpcf7 div").not(".wpcf7-response-output").fadeOut(250);
        }

    };


    //
    $(document).ready(function() {

        // button animations
        $(".btn").hover(function(event) {
            var $button = $(this);
            button.animate($button);
        }, 
        function() {
            var $button = $(this);
            button.removeAnimate($button);
        });
        
        // home-specific setup
        if (page.isHome()) {

            heroArea.size();
            navigation.home();
            navigation.portfolioAnchorScroll();
            navigation.homeStickyNav();
            portfolio.sizeHomeImages();
        
        }

        // other pages setup
        if (page.isContact()) {

            button.submitArrow();
            $(".wpcf7-form").on("focus", ".form-error-background", function() {
                contactForm.removeErrorFormat($(this));
            });

            $(".wpcf7-submit").on("click", function(event) {
                
                contactForm.validate(event);
            });
        
        } else if (page.isBlog()) {

            $(".blog-section__post__button").on("click", function(event) {
                event.preventDefault();
                blogPost.toggleView($(this));
            });

            $("p, .tags-list, .attachment-post-thumbnail").each(function(i) {
                $(this).addClass("close");
            });
              
        } else if (page.isAbout()) {

            

        } else if (page.isProject()) {

            // image carousel on project pages
            $(".project-preview-image").click(function(event) {
                event.preventDefault(); 
                var startAt = $(this).data("image-no");
                var postId = $(".page-sub-header__text h1").data("post-id");
                carousel.load(postId, startAt);
            });

        }

        // on scroll events
        var pageCounter = 2;
        page.win.scroll(function(event) {
            heroArea.parallax();
            
            // load next batch of blog posts
            if  (page.isBlog() && page.win.scrollTop() === $(document).height() - page.win.height()) {
                var hasLastPostSet = $(".blog-section__post").last().hasClass("last-set");
                if (!hasLastPostSet) {
                    blogPost.loadMore(pageCounter);
                }
                pageCounter++;
            }
        });
    });

})(jQuery);