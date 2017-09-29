var scrollPercent;
var state;

document.addEventListener("DOMContentLoaded", function(event) {
    scrollPercent = window.scrollY / window.innerHeight;
    
    
    if (scrollPercent < 1) {
        state = 0;
        document.body.style.backgroundColor = "#94D3A3";
        $(".paper").css("color", "#94D3A3");
    }else if (scrollPercent > 1 && scrollPercent < 2) {
        state = 1;
        document.body.style.backgroundColor = "#80B1F5";
        $(".paper").css("color", "#80B1F5");
    }else if (scrollPercent > 2 && scrollPercent < 3) {
        state = 2;
        document.body.style.backgroundColor = "#E06D6F";
        $(".paper").css("color", "#E06D6F");
    }else if (scrollPercent > 3) {
        state = 3;
        document.body.style.backgroundColor = "#F1C37F";
        $(".paper").css("color", "#F1C37F");
    }
});


function checkScroll(){
    scrollPercent = window.scrollY / window.innerHeight;
    console.log(scrollPercent);
    
    
    if (scrollPercent < 1 && state != 0) {
        state = 0;
        $("html body").animate({ backgroundColor: "#94D3A3" }, 300);
        $(".paper").animate({ color: "#94D3A3" }, 300);
    }else if (scrollPercent > 1 && scrollPercent < 1.95 && state != 1) {
        state = 1;
        $("html body").animate({ backgroundColor: "#80B1F5" }, 300);
        $(".paper").animate({ color: "#80B1F5" }, 300);
    }else if (scrollPercent > 1.95 && scrollPercent < 2.9 && state != 2) {
        state = 2;
        $("html body").animate({ backgroundColor: "#E06D6F" }, 300);
        $(".paper").animate({ color: "#E06D6F" }, 300);
    }else if (scrollPercent > 2.9 && state != 3) {
        state = 3;
        $("html body").animate({ backgroundColor: "#F1C37F" }, 300);
        $(".paper").animate({ color: "#F1C37F" }, 300);
    }
    
    if (state > 0) {
        $(".paper").addClass("dontMove");
        if (state == 1) {
            $("#one").animate({ height: 0.95*window.innerHeight-window.scrollY+window.innerHeight,
                                bottom: window.scrollY - window.innerHeight }, 0.1);
            
            $("#two").animate({ bottom: window.scrollY - 1.95*window.innerHeight*0.95 }, 0.1);
            $("#three").animate({ bottom: window.scrollY - 2.9*window.innerHeight*0.95 }, 0.1);
        }else if (state == 2) {
            $("#two").animate({ height: 0.95*window.innerHeight-window.scrollY+1.95*window.innerHeight,
                                bottom: window.scrollY - 1.95*window.innerHeight}, 0.1);
            
            $("#three").animate({ bottom: window.scrollY - 2.9*window.innerHeight*0.95 }, 0.1);
        }else if (state == 3) {
            $("#three").animate({ height: 0.95*window.innerHeight-window.scrollY+2.9*window.innerHeight,
                                bottom: window.scrollY - 2.9*window.innerHeight}, 0.1);
        }
    }else {
        $(".paper").removeClass("dontMove");
    }
    
}


//Background Colours:
/*

#80B1F5 BLUE
#94D3A3 GREEN
#E06D6F RED
#F1C37F YELLOW
    
*/