var canvas;
var context;
let Changing = true;
const COLOR_White = "#960912";
class Point
{
    constructor(x, y)
    {
        this.x = x;
        this.y = y;
        this.number;//номер кластера
        this.center = false;
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
    canvas = document.getElementById("pointField");
    context = canvas.getContext("2d");
    canvas.onmousedown = startDrawing;
}

function startDrawing(e)
{
    if (Changing == true)
    {
        context.beginPath();
        context.moveTo((e.pageX - canvas.offsetLeft), e.pageY - canvas.offsetTop);

        //*(1920/screen.width) *(1920/screen.height)
        let x = (e.pageX - canvas.offsetLeft);
        let y = (e.pageY - canvas.offsetTop);

        points.push(new Point(x, y));

        context.arc(x, y, 8, 0, 2*Math.PI);
        context.fillStyle = COLOR_White;
        context.fill();
        context.lineWidth = 1;
        context.strokeStyle = COLOR_White;
        context.stroke();
    }
}
