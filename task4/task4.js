var canvas;
var context;
const COLOR_White = "#960912";
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
function startDrawing(e)
{
    if (Changing == true)
    {
        context.beginPath();
        context.moveTo(e.pageX - canvas.offsetLeft, e.pageY - canvas.offsetTop);

        let x = e.pageX - canvas.offsetLeft;
        let y = e.pageY - canvas.offsetTop;

        points.push(new Point(x, y));
        console.log(points.length);

        context.arc(x, y, 7, 0, 2*Math.PI);
        context.fillStyle = COLOR_White;
        context.fill();
        context.lineWidth = 1;
        context.strokeStyle = COLOR_White;
        context.stroke();
    }
}
