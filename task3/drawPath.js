var elFirst = document.getElementById('start');
var elSecond = document.getElementById('result');

function drawFirstPath(path) {
    let length = Math.round(path[numberOfPoints]);
    console.log(Math.round(path[numberOfPoints]));
    elFirst.value =  length;
}

function drawPth(resultPath) {
    context.beginPath();
    context.moveTo(resultPath[0].x, resultPath[0].y);

    for(let i = 0; i < points.length; i++)
        context.lineTo(resultPath[i].x, resultPath[i].y);

    context.strokeStyle = COLOR_red;
    context.stroke();
}

function mainPath(child) {
    let lengthPath = Math.round(child[numberOfPoints]);
    elSecond.value = lengthPath;
}