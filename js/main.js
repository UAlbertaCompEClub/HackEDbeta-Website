var slide = 1; //current slide

var BLUE = "#80B1F5";
var GREEN = "#94D3A3";
var RED = "#E06D6F";
var YELLOW = "#F1C37F";
var DGREEN = "#16703D";

document.addEventListener("DOMContentLoaded", function (event) {
    //do nothing?
});


function slideChange(reqSlide) {
    //when slide changes, animate the slide to the side

    console.log("reqSlide: " + reqSlide);

    //set slide's new state
    slide = reqSlide;
}

/*
Background Colours:

#80B1F5 BLUE
#94D3A3 GREEN
#E06D6F RED
#F1C37F YELLOW
#16703D DARKGREEN
    
*/
