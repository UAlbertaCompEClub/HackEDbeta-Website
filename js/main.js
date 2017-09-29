document.addEventListener("DOMContentLoaded", function(event) {
    chooseBackgroundColour();
    
    
});


function checkScroll(){
    var scrollPercent = window.scrollY / window.innerHeight;
    console.log(scrollPercent);
    if (window.scrollY > 100) {
        document.body.style.background = "#80B1F5";
    }
}


function chooseBackgroundColour() {
    /*var colour = Math.floor(Math.random() * (5 - 1) + 1); // four colours
    console.log(colour); 
    switch (colour) {
        case 1: 
            $("body").css("backgroundColor", "#80B1F5"); 
            break; 
        case 2: 
            $("body").css("backgroundColor", "#94D3A3"); 
            break; 
        case 3: 
            $("body").css("backgroundColor", "#E06D6F"); 
            break; 
        case 4: 
            $("body").css("backgroundColor", "#F1C37F"); 
            break; 
    } */
}
