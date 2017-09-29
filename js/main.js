var scrollPercent; // Scrolled  Y / Page height
var state; // Dependent on page, 0 is no page and 3 is last page (more can be added easily)
///*
var BLUE = "#80B1F5";
var GREEN = "#94D3A3";
var RED = "#E06D6F";
var YELLOW = "#F1C37F";
var DGREEN = "#16703D";
//*/
document.addEventListener("DOMContentLoaded", function(event) {
    scrollPercent = window.scrollY / window.innerHeight; //update scroll percent
    
    // Set State and change BG colour on load/refresh
    if (scrollPercent < 1) {
        state = 0;
        $(".bg").css("backgroundColor", DGREEN);
    }else if (scrollPercent > 0.975 && scrollPercent < 1.825) {
        state = 1;
        $(".bg").css("backgroundColor", BLUE);
    }else if (scrollPercent > 1.825 && scrollPercent < 2.725) {
        state = 2;
        $(".bg").css("backgroundColor", RED);
    }else if (scrollPercent > 2.725) {
        state = 3;
        $(".bg").css("backgroundColor", YELLOW);
    }
});


function checkScroll(){
    scrollPercent = window.scrollY / window.innerHeight;
    console.log(scrollPercent);
    
    // animate change bg, set state, and animate text change
    if (scrollPercent < 0.975 && state != 0) {
        state = 0;
        $(".bg").animate({ backgroundColor: DGREEN }, 300);
        console.log(state);
    }else if (scrollPercent > 0.975 && scrollPercent < 1.9 && state != 1) {
        state = 1;
        $(".bg").animate({ backgroundColor: BLUE }, 300);
        console.log(state);
    }else if (scrollPercent > 1.9 && scrollPercent < 2.85 && state != 2) {
        state = 2;
        $(".bg").animate({ backgroundColor: RED }, 300);
        console.log(state);
    }else if (scrollPercent > 2.85 && scrollPercent < 3.8 && state != 3) {
        state = 3;
        $(".bg").animate({ backgroundColor: YELLOW }, 300);
        console.log(state);
    }
    // check when border needs to be activates
    if (state > 0) {
        $("#top").addClass("activated");
    }else {
        $("#top").removeClass("activated");
    }
    
}


//Background Colours:
/*

#80B1F5 BLUE
#94D3A3 GREEN
#E06D6F RED
#F1C37F YELLOW
#16703D DGREEN
    
*/