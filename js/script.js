var slider = document.getElementById("myRange");
var output = document.getElementById("demo23");
output.innerHTML = slider.value;

slider.oninput = function () {
    output.innerHTML = this.value;
    console.log("Cokolwiek");
}