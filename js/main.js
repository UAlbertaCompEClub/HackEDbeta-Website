//runs the given function when the HTML document has loaded (also known as the DOM)
$(document).ready(function(){
    //start the cursor blinking
    var cursor = $("#cursor");
    setInterval(function() {
        //every 600 miliseconds, we check if our cursor
        //has the CSS class "show", if so we remove it,
        //if not we add it. This creates the blinking effect
        if (cursor.hasClass("show")) {
            cursor.removeClass("show");
        } else {
            cursor.addClass("show");
        }
    }, 600);
    
    //add the event handler to catch all click events on
    //elements of class "bubble" within elements of class "bubble-nav"
    //this has to be done within the DOM ready event since otherwise
    //the $ function won't work as elements won't be ready
    $(".bubble-nav .bubble").on("click", function() {
        //tells us which button was clicked (number, 0-3)
        var slideIndex = $(this).index();
        // when slide changes, animate the slide to the side
        var moveStr = "-" + slideIndex + "00vw";    //this makes a CSS style like -200vw or "-200% view width" to move the page over 2 view widths
        //slide the selected page over, the CSS on the element will animate it for us (see "transition")
        $(".pages-invisible-container").css("marginLeft", moveStr);
        
        //reset opacity on all bubbles
        $(".bubble-nav .bubble").removeClass("active");
        //set opacity full on selected bubble
        $(this).addClass("active");
        
        //Note about $(this): "this" is Javascript for the variable of the function you're currently in.
        //As you can see this comment is in a function / click event handler within the document ready event function,
        //and "this" here refers to the click event function. $(this) passes "this" to jQuery and it figures out which
        //element called this function (ie: which element was clicked)

        // additionally set the faq background colour as well 
        if ($(this).hasClass("redback")) {
            $(".faq").css({ background: "#E06D6F" });
            $("footer a").css({color: "#E06D6F" })
        }
        if ($(this).hasClass("blueback")) {
            $(".faq").css({ background: "#80B1F5" });
            $("footer a").css({color: "#80B1F5" })
        }
        if ($(this).hasClass("greenback")) {
            $(".faq").css({ background: "#94D3A3" });
            $("footer a").css({color: "#94D3A3" })
        }
        if ($(this).hasClass("yellowback")) {
            $(".faq").css({ background: "#F1C37F" });
            $("footer a").css({color: "#F1C37F" })
        }
    });
    
    //FAQ question accordion
    $(".faq .question").on("click", function(){
        //deselect all other questions
        $(".faq .question").removeClass("active");
        //select this question
        $(this).addClass("active");
        //hide all other answers
        $(".faq .answer").removeClass("show");
        //show our answer
        $(this).next(".answer").addClass("show");
    });
});