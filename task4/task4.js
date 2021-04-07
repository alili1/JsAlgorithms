var canvas;
var context;
let number = 0;
const COLOR_red = "#960912";
const COLOR_White = "#ffffff";
var el = document.getElementById('path');

class Point
{
    constructor(x, y)
    {
        this.x = x;
        this.y = y;
    }
}
let points = [];
window.onload = function()
{
    canvas = document.getElementById("pointField");
    context = canvas.getContext("2d");
    canvas.onmousedown = startDrawing;
}
var Changing = true;

function doText(x, y, number) {
    context.lineWidth = 1;
    context.fillStyle = COLOR_red;
    context.font      = "16px sans-serif";
    context.fillText(number, x-7, y+5);
}

function startDrawing(e)
{
    if (Changing == true)
    {
        context.beginPath();
        context.moveTo(e.pageX - canvas.offsetLeft, e.pageY - canvas.offsetTop);

        let x = e.pageX - canvas.offsetLeft;
        let y = e.pageY - canvas.offsetTop;
        number++;
        points.push(new Point(x, y));
        console.log(points.length);

        context.arc(x, y, 15, 0, 2*Math.PI);
        context.lineWidth = 2;
        context.strokeStyle = COLOR_red;
        context.stroke();
        context.fillStyle = COLOR_White;
        context.fill();
        doText(x, y, number);
    }
}

function getPath (best)
{
    el.value = Math.round(best);
}
