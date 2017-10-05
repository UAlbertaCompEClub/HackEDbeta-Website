var slide = 1; //current slide

var BLUE = "#80B1F5";
var GREEN = "#94D3A3";
var RED = "#E06D6F";
var YELLOW = "#F1C37F";
var DGREEN = "#16703D";

document.addEventListener("DOMContentLoaded", function (event) {
    startCursorBlinking();
});


function slideChange(reqSlide) {
    //when slide changes, animate the slide to the side
    var moveStr = "-" + String(reqSlide - 1) + "00vw";
    
    console.log("reqSlide: " + reqSlide);
    
    $(".page").animate({
        left: moveStr
    },300);
    
    //set slide's new state
    slide = reqSlide;
}

function startCursorBlinking() {
    var isCursorVisbile = true
    setInterval(function() {
        if (isCursorVisbile) {
            $("#cursor").css("visibility", "hidden")
        } else {
            $("#cursor").css("visibility","visible")
        }
        isCursorVisbile = !isCursorVisbile
    }, 600)
}

/*
Background Colours:

#80B1F5 BLUE
#94D3A3 GREEN
#E06D6F RED
#F1C37F YELLOW
#16703D DARKGREEN
    
*/
