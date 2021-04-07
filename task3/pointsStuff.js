var canvas;
var context;
var number = 0;
const COLOR_White = "#ffffff";
const COLOR_points = "#3f4358";
const COLOR_red = "#960912";

class Point
{
    constructor(x, y, number)
    {
        this.x = x;
        this.y = y;
        this.number = number;
    }
    GoToZero()
    {
        this.x = 0;
        this.y = 0;
        this.number = 0;

    }
}

let points = [];

window.onload = function() {
    canvas = document.getElementById("graphField");
    context = canvas.getContext("2d");
    canvas.onmousedown = startDrawing;
}

function startDrawing(e) {

    context.beginPath();
    context.moveTo(e.pageX - canvas.offsetLeft, e.pageY - canvas.offsetTop);

    let x = e.pageX - canvas.offsetLeft;
    let y = e.pageY - canvas.offsetTop;
    number++;
    createCircle(x, y, number);
    points.push(new Point(x, y, number));
}
function getRadians(degrees) {
    return (Math.PI / 180) * degrees;
}

function createCircle(x, y, number) {
    context.arc(x, y, 20, 0, getRadians(360));
    context.lineWidth = 1;
    context.strokeStyle = COLOR_points;
    context.stroke();
    context.fillStyle = COLOR_White;
    context.fill();
    doText(x, y, number);
}

function doText(x, y, number) {
    context.lineWidth = 1;
    context.fillStyle = COLOR_red;
    context.font      = "20px sans-serif";
    context.fillText(number, x-5, y+5);
}
