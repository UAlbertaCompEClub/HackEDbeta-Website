document.addEventListener("DOMContentLoaded", function(event) {
    startCursorBlinking()
    chooseBackgroundColour()
});

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

function chooseBackgroundColour() {
    var colour = Math.floor(Math.random() * (5 - 1) + 1); // four colours
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
    } 
}