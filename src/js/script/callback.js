(function () {
    $(window).resize(function() {
            let width = $("body").css("width");
            let widthValue = parseInt(width);
            if(widthValue < 481) {
                $(".callback__title").text("Subscribe To Stay  In Touch");
                $(".callback__info-field--button").text("Subscribe");
            } else {
                $(".callback__title").text("Order callbak");
                $(".callback__info-field--button").text("call me!");
            }
        });
}) ();