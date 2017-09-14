document.addEventListener("DOMContentLoaded", function(event) {
    startCursorBlinking()
});

function getBackgroundColor() {
    return "white"
}

function getCursorColor() {
    return "black"
}

function startCursorBlinking() {
    var isCursorVisbile = true
    setInterval(function() {
        if (isCursorVisbile) {
            $("#cursor").css("color", getBackgroundColor())
        } else {
            $("#cursor").css("color", getCursorColor())
        }
        isCursorVisbile = !isCursorVisbile
    }, 600)
}