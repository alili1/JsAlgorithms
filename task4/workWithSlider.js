
var slider1 = document.getElementById("myRange1");
var output1 = document.getElementById("result1");
output1.innerHTML = slider1.value;

slider1.oninput = function() {
    output1.innerHTML = this.value;
    Q = this.value;
}

var slider2 = document.getElementById("myRange2");
var output2 = document.getElementById("result2");
output2.innerHTML = slider2.value;

slider2.oninput = function() {
    output2.innerHTML = this.value;
    alpha = this.value;
}

var slider3 = document.getElementById("myRange3");
var output3 = document.getElementById("result3");
output3.innerHTML = slider3.value;

slider3.oninput = function() {
    output3.innerHTML = this.value;
    beta = this.value;
}

var slider4 = document.getElementById("myRange4");
var output4 = document.getElementById("result4");
output4.innerHTML = slider4.value;

slider4.oninput = function() {
    output4.innerHTML = this.value;
    p = this.value;
}
