var canvas;
var context;
const COLOR_White = "#f5f8ff";

window.onload = function() {
    canvas = document.getElementById("pointField");
    context = canvas.getContext("2d");
    canvas.onmousedown = startDrawing;
    /* canvas.onmouseup = stopDrawing; */
}

function startDrawing(e) {
    // Создаем новый путь (с текущим цветом и толщиной линии)
    context.beginPath();

    // Нажатием левой кнопки мыши помещаем "кисть" на холст
    context.moveTo(e.pageX - canvas.offsetLeft, e.pageY - canvas.offsetTop);

    let x = e.pageX - canvas.offsetLeft;
    let y = e.pageY - canvas.offsetTop;

    context.arc(x, y, 5, 0, 2*Math.PI);
    context.fillStyle = COLOR_White;
    context.fill();
    context.lineWidth = 1;
    context.strokeStyle = COLOR_White;
    context.stroke();
}

