// allow $ in wordpress jquery
(function($) {

    "use strict";

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

    var Navigation = {

        init: function() {
            this.$mainHeader = $(".main-header");
            this.$frontPageNav = $(".front-page-nav");
            this.$navAnchorLink = $(".front-page-nav li.menu-item:first-child a");
            this.$heroButton = $(".see-work-button");
            this.$mobileMenu = $(".main-nav__mobile-menu");
            this.isHomePage = $(".hero-area").length > 0 ? true : false;
            this.initEvents();
        },

        initEvents: function() {
            if (this.isHomePage) { 
                this.swapHomeMenu();
                this.$heroButton.waypoint(this.handleStickyNav.bind(this));
                this.$navAnchorLink.on("click", this.smoothScroll.bind(this)); 
                this.$heroButton.on("click", this.smoothScroll.bind(this));
            }
            this.$mobileMenu.on("click", this.toggleMobileMenu.bind(this));
        },

        swapHomeMenu: function() {
            this.$mainHeader.first().addClass("display-none");
            this.$frontPageNav.removeClass("display-none");
        },

        handleStickyNav: function(dir) {
            if (dir === "down") {
                this.$mainHeader.addClass("main-header--fixed").css("opacity", "0.9").fadeIn(250);
            } else {
                this.$mainHeader.removeClass("main-header--fixed").css("display", "none");
            }
        },

        smoothScroll: function(e) {
            e.preventDefault();
            $("html, body").animate({
                scrollTop: $(e.target.hash).offset().top - 70
            }, 500);
        },

        toggleMobileMenu: function(e) {
            e.preventDefault();
            if (this.$mobileMenu.siblings(".main-header__social-icons-list").hasClass("menu-slide-in")) {
                $("#menu-menu-1, #menu-menu-2, .main-header__social-icons-list").removeClass("menu-slide-in").addClass("menu-slide-out");
            } else {
                $("#menu-menu-1, #menu-menu-2, .main-header__social-icons-list").removeClass("menu-slide-out").addClass("menu-slide-in");
            }
        }
    };

    var HeroArea = {

        init: function() {
            this.$mainNav = $(".main-nav");
            this.$heroArea = $(".hero-area");
            this.$heroAreaTextContainer = $(".hero-area__text-container");
            this.$parallaxBackground = $(".parallax-bg");
            this.initDom();
        },

        initDom: function() {
            
            var navHeight = this.$mainNav.height();
            var heroHeight = (page.win.height() - navHeight) + 70;
            var heroAreaTextHeight = this.$heroAreaTextContainer.height();

            this.$heroArea.css("height", heroHeight);
            this.$heroAreaTextContainer.css("padding-top", ((heroHeight - heroAreaTextHeight) / 2) - 70);
        },

        parallaxEffect: function() {
            var scrolled = page.win.scrollTop();
            this.$parallaxBackground.css("top", -(scrolled * 0.2) + "px");
        }
    };

    var Portfolio = {

        init: function() {
            // get the text heights of each project
            this.$projectText = $(".portfolio__project__text");
            this.sizeProjectImages();
        },

        sizeProjectImages: function() {
            var projectTextHeight = this.$projectText.height();
            this.$projectText.each(function() {
                $(this).siblings().find(".attachment-post-thumbnail").css("max-height", projectTextHeight);
            });
        }

    };

    // image carousel on project pages
            // $(".project-preview-image").click(function(event) {
            //     event.preventDefault(); 
            //     var startAt = $(this).data("image-no");
            //     var postId = $(".page-sub-header__text h1").data("post-id");
            //     carousel.load(postId, startAt);
            // });

    var Carousel = {

        init: function() {
            this.$projectPreviewImage = $(".project-preview-image");
            this.$carousel = $(".project-section__images-carousel");
            this.$pageHeader = $(".page-sub-header__text h1");
            this.initEvents();
        }, 

        initEvents: function() {
            this.$projectPreviewImage.on("click", this.loadCarousel.bind(this));
        },

        loadCarousel: function(e) {
            console.log(e);
            var startAt = $(e.target).data('image-no');
            var postId = this.$pageHeader.data('post-id');
            console.log(startAt + "    " + postId);

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

        centerCarousel: function() {
            var windowHeight = page.win.outerHeight();
            var imageHeight = this.$carousel.outerHeight();
            var topValue = (windowHeight - imageHeight) / 2;
            this.$carousel.css("top", topValue);
        }

    };

    // var carousel = {
        
    //     // load: function(postId, startAt) {
    //     //     $.ajax({
    //     //         url: "../../wp-admin/admin-ajax.php",
    //     //         type:'POST',
    //     //         data: "action=image_carousel&post_id="+ postId + '&template=images-carousel&start=' + startAt, 
    //     //         success: function(html){
                    
    //     //             $("body").append(html);  
    //     //             carousel.center();
                    
    //     //             // add new event listeners
    //     //             $(".carousel-button").click(function(event) {
    //     //                 event.preventDefault(); 
    //     //                 var carouselButton = $(this);
    //     //                 if (carouselButton.hasClass("previous")) {
    //     //                     if (carouselButton.siblings(".carousel-images-list").find(".current").prev().is("li")) {
    //     //                         carouselButton.siblings(".carousel-images-list").find(".current").fadeOut(0).removeClass("current").prev("li").fadeIn(150).addClass("current");
    //     //                     } else {
    //     //                         carouselButton.siblings(".carousel-images-list").find(".current").fadeOut(0).removeClass("current");
    //     //                         $(".carousel-images-list li").last().fadeIn(150).addClass("current");
    //     //                     }
    //     //                     carousel.center();
    //     //                 } else {
    //     //                     if (carouselButton.siblings(".carousel-images-list").find(".current").next().is("li")) {
    //     //                         carouselButton.siblings(".carousel-images-list").find(".current").fadeOut(0).removeClass("current").next("li").fadeIn(150).addClass("current");
    //     //                     } else {
    //     //                         carouselButton.siblings(".carousel-images-list").find(".current").fadeOut(0).removeClass("current");
    //     //                         $(".carousel-images-list li").first().fadeIn(150).addClass("current");
    //     //                     }
    //     //                     carousel.center();
    //     //                 }
    //     //             });

    //     //             $(".project-section__images-carousel__overlay").click(function(event) {
    //     //                 $(".project-section__images-carousel").remove();
    //     //                 $(this).remove();
    //     //             });

    //     //             $(".carousel-exit").click(function(event) {
    //     //                 event.preventDefault();
    //     //                 $(".project-section__images-carousel").remove();
    //     //                 $(".project-section__images-carousel__overlay").remove();
    //     //             });
    //     //         }
    //     //     });
    //     // }, 

    //     center: function() {
    //         var windowHeight = page.win.outerHeight();
    //         var imageHeight = $(".project-section__images-carousel").outerHeight();
    //         var topValue = (windowHeight - imageHeight) / 2;
    //         $(".project-section__images-carousel").css("top", topValue);
    //     }

    // };

    var Button = {

        init: function() {
            this.$button = $(".btn");
            this.initEvents();
        },

        initEvents: function() {
            this.$button.hover(this.animateButton.bind(this), this.stopAnimateButton.bind(this));
        },

        animateButton: function(e) {
            var $arrow = $(e.target).find(".btn__arrow");
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

        stopAnimateButton: function(e) {
            var $arrow = $(e.target).find(".btn__arrow");
            if ($arrow.hasClass("down") && !$arrow.parents(".btn").hasClass("see-work-button")) {
                $arrow.removeClass("bounce-down");
            } else if ($arrow.hasClass("up")) {
                $arrow.removeClass("bounce-up");
            } else if ($arrow.hasClass("right")) {
                $arrow.removeClass("bounce-right");
            }
        }

    };

    var Blog = {

        init: function() {
            this.$postSubContent = $("p, .tags-list, .attachment-post-thumbnail");
            this.$postButton = $(".blog-section__post__button");
            this.$loadingSpinner = $(".blog-section__loading-indicator");
            this.$documentHeight = $(document).height();
            this.pageNumber = 2; 
            this.initDom();
            this.initEvents();
        },

        initDom: function() {
            this.$postSubContent.addClass("close");  // CSS handles first post visiblity
        },

        initEvents: function() {
            this.$postButton.on("click", this.togglePostView.bind(this));
            page.win.scroll(this.loadMorePosts.bind(this));    // should this be here?
        },

        togglePostView: function(e) {
            e.preventDefault();
            var hasDownClass = $(e.target).children(".btn__arrow").hasClass("down");

            if (hasDownClass) {
                $(e.target).html('Close<div class="btn__arrow black"></div>').children(".btn__arrow").addClass("btn__arrow--flip up");
                $(e.target).siblings("p:not(:first-of-type), .tags-list, .attachment-post-thumbnail").fadeIn(200, function() {
                    $(e.target).siblings("p, .tags-list, .attachment-post-thumbnail").removeClass("close").addClass("open");
                });
                $(e.target).addClass("btn--right");
            } else {
                $(e.target).html('See more<div class="btn__arrow black"></div>').children(".btn__arrow").addClass("down");

                $(e.target).siblings("p:not(:first-of-type), .tags-list, .attachment-post-thumbnail").fadeOut(200, function() {
                    $(e.target).siblings("p, .tags-list, .attachment-post-thumbnail").removeClass("open").addClass("close");
                });
                $(e.target).removeClass("btn--right");
                $(e.target).parents(".blog-section__post .open").removeClass("open").addClass("close");
            }
        },

        loadMorePosts: function(pageNumber) {

            var hasLastPostSet = $(".blog-section__post").last().hasClass("last-set");
            if (!hasLastPostSet && ($(window).scrollTop() === $(document).height() - page.win.height())) {
                this.$loadingSpinner.fadeIn(100);
                $.ajax({
                    url: "../wp-admin/admin-ajax.php",
                    type:'POST',
                    data: "action=infinite_scroll&page_no="+ this.pageNumber + '&loop_file=more-posts', 
                    success: function(html){
                        $(".page-content__content-left").append(html);
                        $("p, .tags-list, .attachment-post-thumbnail").each(function(i) {
                            $(this).addClass("close");
                        });
                                
                        // add event listeners for loaded post buttons
                        $(".blog-section__post__button")
                            .on("click", function(e) {
                                e.preventDefault();
                                Blog.togglePostView(e);
                            })
                            .hover(function(e) {
                                Button.animateButton(e);
                            }, function(e) {
                                Button.stopAnimateButton(e);

                            });   
                    }
                });
                this.$loadingSpinner.fadeOut(1000);
                this.pageNumber++;
                return false;
            }
        }

    };

    var ContactForm = {

        init: function() {
            this.isError = false;
            this.$form = $(".wpcf7-form");
            this.$formNameInput = $(".contact-form__name input");
            this.$formEmailInput = $(".contact-form__email input");
            this.$formMessageTextarea = $(".contact-form__message textarea");
            this.$submitButton = $(".wpcf7-submit");
            this.initDom();
            this.initEvents();
        },

        initDom: function() {
            var buttonWidth = this.$submitButton.outerWidth();
            var backgroundXPos = buttonWidth - 38;  // 38 = 20 padding, 18 width of arrow image
            this.$submitButton.css("background-position", backgroundXPos + "px 50%");
        },

        initEvents: function() {
            this.$form.on("focus", this.removeErrorFormatting.bind(this));
            this.$form.on("focus", ".form-error-background", this.removeErrorFormatting.bind(this));
            this.$submitButton.on("click", this.validateForm.bind(this));
        },

        validateForm: function(e) {
            //reset error status each submit
            this.isError = false;

            if (this.$formNameInput.val() === undefined || this.$formNameInput.val() === "") {
                e.preventDefault();
                this.isError = true;
                this.$formNameInput.attr("placeholder", "Don't forget your name!").addClass("form-error-background");
            }

            if (this.$formEmailInput.val() === null || this.$formEmailInput.val() === "") {
                e.preventDefault();
                this.isError = true;
                this.$formEmailInput.attr("placeholder", "You forgot your email!").addClass("form-error-background");
            }

            if (this.$formMessageTextarea.val() === null || this.$formMessageTextarea.val() === "") {
                e.preventDefault();
                this.isError = true;
                this.$formMessageTextarea.attr("placeholder", "Surely you have something to say!").addClass("form-error-background");
            }
            
            // remove form if successful
            if (!this.isError) {
                this.removeForm();
            }
        },

        removeErrorFormatting: function(e) {
            $(e.target).removeClass("form-error-background").attr("placeholder", "");
        },

        removeForm: function() {
            this.$form.find("div").not(".wpcf7-response-output").fadeOut(250);
        }

    };


    //
    $(document).ready(function() {

        Button.init();
        Navigation.init();
        
        // home-specific setup
        if (page.isHome()) {

            HeroArea.init();
            Portfolio.init();
            
        }

        // other pages setup
        if (page.isContact()) {

            ContactForm.init();
        
        } else if (page.isBlog()) {

            Blog.init();
              
        } else if (page.isAbout()) {

            

        } else if (page.isProject()) {

            // image carousel on project pages
            // $(".project-preview-image").click(function(event) {
            //     event.preventDefault(); 
            //     var startAt = $(this).data("image-no");
            //     var postId = $(".page-sub-header__text h1").data("post-id");
            //     carousel.load(postId, startAt);
            // });

            Carousel.init();

        }
    });

})(jQuery);