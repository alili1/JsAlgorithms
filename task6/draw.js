var canvas;
var context;
var isDrawing;
let number = 0;
const COLOR_red = "#000000";

class Point
{
    constructor(x, y)
    {
        this.x = x;
        this.y = y;
    }
}
let points = [];

window.onload = function() {
    canvas = document.getElementById("sketchpad");
    context = canvas.getContext("2d");

    // Подключаем требуемые для рисования события
    canvas.onmousedown = startDrawing;
    canvas.onmouseup = stopDrawing;
    canvas.onmouseout = stopDrawing;
    canvas.onmousemove = draw;
}

function startDrawing(e) {
    isDrawing = true;
    context.beginPath();
    context.moveTo(e.pageX - canvas.offsetLeft, e.pageY - canvas.offsetTop);
}

function draw(e) {
    if (isDrawing == true)
    {
        var x = e.pageX - canvas.offsetLeft;
        var y = e.pageY - canvas.offsetTop;

        context.lineWidth = 12;
        context.lineTo(x, y);
        context.strokeStyle = COLOR_red;
        context.stroke();
    }
}

function stopDrawing() {
    isDrawing = false;
}

function grayscaleImga() {
    let imgData = context.getImageData(0, 0, 280, 280);

    for (let x = 0; x < imgData.width; x++)
    {
        grayscaleImg[x] = [];
        for (let y = 0; y < imgData.height; y++)
        {
            let offset = y*4*imgData.width + 4*x;
            let alpha = imgData.data[offset + 3];
            if (alpha == 0)
            {
                imgData.data[offset] = 255;
                imgData.data[offset + 1] = 255;
                imgData.data[offset + 2] = 255;
            }
            imgData.data[offset + 3] = 255;
            grayscaleImg[x][y] = imgData.data[y*4*imgData.width + x*4]/255;
        }
    }
   return grayscaleImg;
}

function getFirstlayer() {

    for (let y = 0; y < 28; y++)
    {
        for (let x = 0; x < 28; x++)
        {
            let mean = 0;
            for (let k = 0; k < 10; k++)
                for (let l = 0; l < 10; l++)
                    mean += grayscaleImg[y * 10 + k][x * 10 + l];
            mean = 1 - mean/100;
           firstNeuronLayer[x*28+y].activateDegree = mean;
        }
    }
}

function normPixelate () {
    let copyCanvas = document.getElementById('sketchpad');
    let copyCtx = copyCanvas.getContext('2d');

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(copyCtx.canvas, 0, 0);

    for (let x = 0; x < 28; x++)
    {
        for (let y = 0; y < 28; y++)
        {
            let block = context.getImageData(x*10, y*10, 10, 10);
            let newVal = 255*(1 - firstNeuronLayer[y*28+x].activateDegree);
            /*чем ближе значение neuronFirst к 1, тем темнее пиксель; чем ближе к -1, тем пиксель светлее*/

            for (let i = 0; i < 4*10*10; i += 4)
            {
                block.data[i] = newVal;
                block.data[i+1] = newVal;
                block.data[i+2] = newVal;
                block.data[i+3] = 255;
            }
            context.putImageData(block, x*10, y*10);
        }
    }
}

function grayscaleImga_second() {
    let imgData = context.getImageData(0, 0, 280, 280);

    for (let y = 0; y < imgData.height; y++)
    {
        grayscaleImg_second[y] = [];
        for (let x = 0; x < imgData.width; x++)
        {
            let offset = y*4*imgData.width + 4*x;
            let alpha = imgData.data[offset + 3];
            if (alpha == 0)
            {
                imgData.data[offset] = 255;
                imgData.data[offset + 1] = 255;
                imgData.data[offset + 2] = 255;
            }
            imgData.data[offset + 3] = 255;
            grayscaleImg_second[y][x] = imgData.data[y*4*imgData.width + x*4 + 0]/255;
        }
    }
    return grayscaleImg_second;
}

function getFirstlayer_second() {

    for (let y = 0; y < 28; y++)
    {
        for (let x = 0; x < 28; x++)
        {
            let mean = 0;
            for (let k = 0; k < 10; k++)
                for (let l = 0; l < 10; l++)
                    mean += grayscaleImg_second[y * 10 + k][x * 10 + l];
            mean = 1 - mean/100;
            firstNeuronLayer_second[x*28+y].activateDegree = (mean - 0.5)/0.5;
        }
    }
}

function normPixelate_second () {
    let copyCanvas = document.getElementById('sketchpad');
    let copyCtx = copyCanvas.getContext('2d');

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(copyCtx.canvas, 0, 0);

    for (let y = 0; y < 28; y++)
    {
        for (let x = 0; x < 28; x++)
        {
            let block = context.getImageData(x*10, y*10, 10, 10);
            let newVal = 255*(0.5 - firstNeuronLayer_second[x*28+y].activateDegree);
            /*чем ближе значение neuronFirst к 1, тем темнее пиксель; чем ближе к -1, тем пиксель светлее*/

            for (let i = 0; i < 4*10*10; i += 4)
            {
                block.data[i] = newVal;
                block.data[i+1] = newVal;
                block.data[i+2] = newVal;
                block.data[i+3] = 255;
            }
            context.putImageData(block, x*10, y*10);
        }
    }
}

