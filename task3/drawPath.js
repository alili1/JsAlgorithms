var elFirst = document.getElementById('start');
var elSecond = document.getElementById('rezult');

function drawFirstPath(path) {
    let result = Math.round(path[numberOfPoints]);
    console.log(Math.round(path[numberOfPoints]));
    elFirst.value =  result;
}

function drawPth(result) {
    context.beginPath();
    context.moveTo(result[0].x, result[0].y);

    for(let i = 0; i < points.length; i++)
        context.lineTo(result[i].x, result[i].y);

    context.strokeStyle = COLOR_red;
    context.stroke();
}

function mainPath(child) {
    let result = Math.round(child[numberOfPoints]);
    elSecond.value = result;
}