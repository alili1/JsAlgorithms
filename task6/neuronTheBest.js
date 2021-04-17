/* тут нейронная сеть не обучается, а принимает готовые веса и смещения найденные на просторах интернета и как ни странно работает, если рисовать ей понятные цифры */

let firstNeuronLayer_second = new Array(784);
let secondNeuronLayer_second = new Array(200);
let outputLayer_second = new Array(10);
let grayscaleImg_second = [];
let res = 0;

function toStartCopy () {
    changWeight();
    grayscaleImga_second();
    getFirstlayer_second();
    normPixelate_second();
    Walk();
    console.log(outputLayer_second);
    result();
}

function activation(x) {
    let result = 1 / (1 + Math.exp(-x));
    return result;
} /* функция сигмоиды (пороговая)*/


function changWeight() {

    for (let i = 0; i < 784; i++)
    {
        firstNeuronLayer_second[i] = new Neuron(0, 0);
    }

    for (let i = 0; i < 200; i++)
    {
        secondNeuronLayer_second[i] = new Neuron(0, bias2[i]);
        secondNeuronLayer_second[i].createMatrix(w12[i]);
    }

    for (let i = 0; i < 10; i++) {
        outputLayer_second[i] = new Neuron(0, bias3[i]);
        outputLayer_second[i].createMatrix(w23[i]);
    }
}

function Walk() {

    for (let i = 0; i < 200; i++)
    {
        for (let temp = 0; temp < 784; temp++)
            res += secondNeuronLayer_second[i].matrixWeight[temp]*firstNeuronLayer_second[temp].activateDegree;

        res += secondNeuronLayer_second[i].bias;
        secondNeuronLayer_second[i].activateDegree = activation(res);
        res = 0;
    }


    for (let i = 0; i < 10; i++)
    {
        for (let temp = 0; temp < 200; temp++)
            res += outputLayer_second[i].matrixWeight[temp]*secondNeuronLayer_second[temp].activateDegree;

        res += outputLayer_second[i].bias;
        outputLayer_second[i].activateDegree = activation(res);
        res = 0;
    }
}

let element_second = document.getElementById('outputNumber');

function result() {
    let max = 0;
    let result = 0;
console.log(firstNeuronLayer_second);
    for (let i = 0; i < 10; i++) {
        if (max < outputLayer_second[i].activateDegree) {
            max = outputLayer_second[i].activateDegree;
            result = i;
        }
    }
    element_second.value = result;
}

