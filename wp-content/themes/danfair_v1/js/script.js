(function($) {

    $(document).ready(function() {
        
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


    });
})(jQuery);