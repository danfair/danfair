// allow $ in wordpress jquery
(function($) {

    "use strict";

    var Page = {
        
        init: function() {
            this.$win = $(window);
            this.bodyClass = $("body").data('page-id');
            this.determinePageTemplate(this.bodyClass);
        },

        determinePageTemplate: function(bodyClass) {
            switch(bodyClass) {

                case 'front-page':
                    this.isHome = true;
                    break;
                case 'blog-page':
                    this.isBlog = true;
                    break;
                case 'about-page':
                    this.isAbout = true;
                    break;
                case 'contact-page':
                    this.isContact = true;
                    break;
                case 'project-page':
                    this.isProject = true;
                    break;
                default:
                    this.isOther = true;
            }
        }

    };

    var Navigation = {

        init: function() {
            this.$mainHeader = $(".main-header");
            this.$frontPageNav = $(".front-page-nav");
            this.$mobileMenu = $(".main-nav__mobile-menu");  // more than one menu
            this.$navAnchorLink = this.$frontPageNav.find("li.menu-item:first-child a");
            this.$heroButton = $(".see-work-button");
            this.initEvents();
        },

        initEvents: function() {

            if (Page.isHome) { 
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
            console.log("fired");
            if (this.$mobileMenu.siblings(".main-header__social-icons-list").hasClass("menu-slide-in")) {
                $("#menu-menu-1, #menu-menu-2, .main-header__social-icons-list").removeClass("menu-slide-in").addClass("menu-slide-out");
            } else {
                $("#menu-menu-1, #menu-menu-2, .main-header__social-icons-list").removeClass("menu-slide-out").addClass("menu-slide-in");
            }
        }
    };

    var HeroArea = {

        init: function() {
        
            this.$heroArea = $(".hero-area");
            this.$heroAreaTextContainer = this.$heroArea.find(".hero-area__text-container");
            this.$parallaxBackground = this.$heroArea.find(".parallax-bg");
            this.initDom();
            this.initEvents();
        },

        initDom: function() {
            
            var heroHeight = Page.$win.height();
            var heroAreaTextHeight = this.$heroAreaTextContainer.height();

            this.$heroArea.css("height", heroHeight);
            this.$heroAreaTextContainer.css("padding-top", ((heroHeight - heroAreaTextHeight) / 2) - 70);
        },

        initEvents: function() {
            Page.$win.scroll(this.parallaxEffect.bind(this));
        },

        parallaxEffect: function(e) {
            var scrolled = Page.$win.scrollTop();
            this.$parallaxBackground.css("top", -(scrolled * 0.2) + "px");
        }
    };

    var Portfolio = {

        init: function() {
            // get the text heights of each project
            this.$projectText = $(".portfolio__project__text");
            this.initDom();
        },

        initDom: function() {
            this.sizeProjectImages();
        },

        sizeProjectImages: function() {
            var projectTextHeight = this.$projectText.height();
            this.$projectText.each(function() {
                $(this).siblings().find(".attachment-post-thumbnail").css("max-height", projectTextHeight);
            });
        }

    };

    var Carousel = {

        init: function() {
            this.$projectPreviewImages = $(".project-preview-image");
            this.$pageHeader = $(".page-sub-header__text h1");
            this.initEvents();
        }, 

        initEvents: function() {
            this.$projectPreviewImages.on("click", this.loadCarousel.bind(this));
        },

        loadCarousel: function(e) {
            e.preventDefault();
            var $target = $(e.target);
            var postId = this.$pageHeader.data('post-id');
            var startAt = "";
            
            if ($target.is("a")) {
                startAt = $target.data('image-no');
            } else {
                startAt = $target.parents(".project-preview-image").data('image-no');
            }

            var _this = this;

            $.ajax({
                url: "../../wp-admin/admin-ajax.php",
                type:'POST',
                data: "action=image_carousel&post_id="+ postId + '&template=images-carousel&start=' + startAt, 
                success: function(html){
                    
                    $("body").append(html);  
                    _this.centerCarousel();
                    var $carousel = $(".project-section__images-carousel");
                    var $carouselOverlay = $(".project-section__images-carousel__overlay");
                    
                    // add new event listeners
                    $(".carousel-button").click(function(e) {
                        e.preventDefault(); 
                        var $carouselButton = $(this);
                        var $imagesList = $(".carousel-images-list");
                        var $currentImage = $(".carousel-images-list").find(".current");
                        var $prevImage = $currentImage.prev();
                        var $nextImage = $currentImage.next();

                        if ($carouselButton.hasClass("previous")) {
                            if ($currentImage.prev().is("li")) {
                                $currentImage.hide().removeClass("current");
                                $prevImage.fadeIn(150).addClass("current");
                            } else {
                                $currentImage.hide().removeClass("current");
                                $(".carousel-images-list li").last().fadeIn(150).addClass("current");
                            }
                            Carousel.centerCarousel();
                        } else {
                            if ($nextImage.is("li")) {
                                $currentImage.hide().removeClass("current");
                                $nextImage.fadeIn(150).addClass("current");
                            } else {
                                $currentImage.hide().removeClass("current");
                                $(".carousel-images-list li").first().fadeIn(150).addClass("current");
                            }
                            _this.centerCarousel();
                        }
                    });

                    $carouselOverlay.click(function(e) {
                        $carousel.remove();
                        $carouselOverlay.remove();
                    });

                    $(".carousel-exit").click(function(e) {
                        e.preventDefault();
                        $carousel.remove();
                        $carouselOverlay.remove();
                    });
                }
            });
        },

        centerCarousel: function() {
            var windowHeight = Page.$win.outerHeight();
            var carousel = $(".project-section__images-carousel");
            var topValue = (windowHeight - carousel.outerHeight()) / 2;
            carousel.css("top", topValue);
        }

    };

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
            this.$blogPost = $(".blog-section__post");
            this.$postSubContent = this.$blogPost.find("p, .tags-list, .attachment-post-thumbnail");
            this.$postButton = this.$blogPost.find(".blog-section__post__button");
            this.$morePostsSection = $(".blog-section__more-posts");
            this.$morePostsButton = this.$morePostsSection.find(".more-posts-btn");
            this.$loadingSpinner = this.$morePostsSection.find(".ajax-spinner");
            this.pageNumber = 2; 
            this.initDom();
            this.initEvents();
        },

        initDom: function() {
            this.$postSubContent.addClass("close");  // CSS handles first post visiblity
        },

        initEvents: function() {
            this.$postButton.on("click", this.togglePostView.bind(this));
            this.$morePostsButton.on("click", this.loadMorePosts.bind(this));
        },

        togglePostView: function(e) {
            e.preventDefault();
            var $eTarget = $(e.target);
            var $target = $eTarget.is("a") ? $eTarget : $eTarget.parents(".btn");
            var hasDownClass = $target.children(".btn__arrow").hasClass("down");

            if (hasDownClass) {
                $target.html('Close<div class="btn__arrow black"></div>').children(".btn__arrow").addClass("btn__arrow--flip up");
                $target.siblings("p:not(:first-of-type), .tags-list, .attachment-post-thumbnail").fadeIn(200, function() {
                    $target.siblings("p, .tags-list, .attachment-post-thumbnail").removeClass("close").addClass("open");
                });
                $target.addClass("btn--right");
            } else {
                $target.html('See more<div class="btn__arrow black"></div>').children(".btn__arrow").addClass("down");

                $target.siblings("p:not(:first-of-type), .tags-list, .attachment-post-thumbnail").fadeOut(200, function() {
                    $target.siblings("p, .tags-list, .attachment-post-thumbnail").removeClass("open").addClass("close");
                });
                $target.removeClass("btn--right");
                $target.parents(".blog-section__post .open").removeClass("open").addClass("close");
            }
        },

        loadMorePosts: function(e) {
            e.preventDefault();
            
            if (Page.isBlog) {
                this.$morePostsButton.hide();
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

                        var hasLastPostSet = $(".blog-section__post").last().hasClass("last-set");
                        console.log(hasLastPostSet);
                        if (hasLastPostSet) { $(".more-posts-btn").remove(); }
                    }
                });
                this.$loadingSpinner.fadeOut(100);
                this.$morePostsButton.fadeIn(500);
                this.pageNumber++;
            }
        },

        removeMorePostsButton: function() {
            this.$morePostsButton.remove();
        }

    };

    var ContactForm = {

        init: function() {
            this.isError = false;
            this.$form = $(".wpcf7-form");
            this.$formNameInput = this.$form.find(".contact-form__name input");
            this.$formEmailInput = this.$form.find(".contact-form__email input");
            this.$formMessageTextarea = this.$form.find(".contact-form__message textarea");
            this.$submitButton = this.$form.find(".wpcf7-submit");
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
            //reset error status on each submit
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


    // //
    $(document).ready(function() {

        // all pages
        Page.init();
        Button.init();
        Portfolio.init();
        ContactForm.init();
        Blog.init();
        Carousel.init();
        Navigation.init();

        if (Page.isHome) {
            HeroArea.init();
        }
    });

})(jQuery);