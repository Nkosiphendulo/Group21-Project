//Color fuctions
function bgchange(color) {
    let colorarray = ["#f0ffff", "#f9b4ab", "#B1FB17", "#78e08f", "#fd79a8"];
    document.body.style.background = colorarray[color];
}

var colorarray = ["#f0ffff", "#f9b4ab", "#B1FB17", "#78e08f", "#fd79a8"];

var colorbox = document.getElementById("colorbox");

colorarray.forEach(function (color, index) {
    let span = document.createElement("span");
    span.style.backgroundColor = color;
    span.addEventListener("click", function () {
        bgchange(index);
    });
    colorbox.appendChild(span);
});

