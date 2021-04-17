/* это файл с нормальной нейронкой, которая должна работать, но она не работает, функция обучения не работает совершенно, видимо разобраться в математике так и не получилось
очень хочется ее доделать
 */
let set = mnist.set(8000, 2000);
let trainingSet = set.training;
let testSet = set.test;

const n = -0.1;
let b = 0;

let globalError = 1;
let firstNeuronLayer = new Array(784);
let secondNeuronLayer = new Array(16);
let thirdNeuronLayer = new Array(16);
let outputLayer = new Array(10);

let secondInVariable = new Array(16);
let thirdInVariable =  new Array(16);
let outputInVariable =  new Array(10);

let deltaWeightThirdLayer =  [];
let deltaWeightSecondLayer = [];
let deltaWeightFirstLayer = [];
let deltaOutputLayer = [];

let trueOutput = [];

let firstErrorLayer = [];
let secondErrorLayer = [];
let thirdErrorLayer = [];
let outputErrorLayer = [];

let grayscaleImg = [];

class Neuron
{
    matrixWeight = [];
    activateDegree = 0;
    bias = 0;

    constructor(activateDegree = 0, bias = 0)
    {
        this.activateDegree = activateDegree;
        this.bias = bias;
    }

    createMatrixOfWeight(n) {

        for(let i = 0; i < n; i++)
            this.matrixWeight[i] = getRand(-0.5, 0.5);
    }

    createMatrix(array) {

        this.matrixWeight = array;
    }
}

function getRand(min, max) {
    return Math.random() * (max - min) + min;
}

function toTrain() {
    letsGo();
    train();
}

function visuals() {
    for (let i = 0; i < 784; i++)
        firstNeuronLayer[i].activateDegree = trainingSet[65].input[i];
    console.log(trainingSet[65].output);
    normPixelate();
    justWalk();
    console.log(outputLayer);
    resultOutput();
}

function toGetImage() {
    grayscaleImga();
    getFirstlayer(firstNeuronLayer);
    normPixelate(firstNeuronLayer);
    justWalk();
    console.log(outputLayer);
    resultOutput();
}

function sizeByB() {
   b = 0.7*Math.pow(16, 1/784);
}

function activation_sigmoid(x) {
    let result = 1 / (1 + Math.exp(-x));
    return result;
} /* функция сигмоиды (пороговая)*/

function derivative_sigmoid(x)
{;
    return x*(1-x);
} /* производная от сигмоиды (градиентный спуск)*/

function letsGo() {

    for(let i = 0; i < 784; i++)
    {
        firstNeuronLayer[i] = new Neuron( 0, 0)
        firstNeuronLayer[i].createMatrixOfWeight(16);
        firstErrorLayer[i] = 0;
        deltaWeightFirstLayer[i] = [];
    }

    for (let i = 0; i < 16; i++)
    {
        secondNeuronLayer[i] = new Neuron(0);
        secondNeuronLayer[i].createMatrixOfWeight(16);
        secondErrorLayer[i] = 0;
        deltaWeightSecondLayer[i] = [];
    }

    for (let i = 0; i < 16; i++)
    {
        thirdNeuronLayer[i] = new Neuron(0);
        thirdNeuronLayer[i].createMatrixOfWeight(10);
        thirdErrorLayer[i] = 0;
        deltaWeightThirdLayer[i] = [];
    }

    for (let i = 0; i < 10; i++)
    {
        outputLayer[i] = new Neuron(0);
        outputErrorLayer[i] = 0;
    }
}

function justWalk() { /*нейронная сеть 1 слой прямой проход*/

    for (let i = 0; i < 16; i++)
   {
    secondInVariable[i] = 0;
    for (let temp = 0; temp < 784; temp++)
        secondInVariable[i] += firstNeuronLayer[temp].matrixWeight[i]*firstNeuronLayer[temp].activateDegree;

       secondInVariable[i] += secondNeuronLayer[i].bias;
    secondNeuronLayer[i].activateDegree = activation_sigmoid(secondInVariable[i]);
    }

    for (let i = 0; i < 16; i++)
    {
        thirdInVariable[i] = 0;
        for (let temp = 0; temp < 16; temp++)
            thirdInVariable[i] += secondNeuronLayer[temp].matrixWeight[i]*secondNeuronLayer[temp].activateDegree;

        thirdInVariable[i] += thirdNeuronLayer[i].bias;
        thirdNeuronLayer[i].activateDegree = activation_sigmoid(thirdInVariable[i]);
    }

    for (let i = 0; i < 10; i++)
    {
        outputInVariable[i] = 0;
        for (let temp = 0; temp < 16; temp++)
            outputInVariable[i] += thirdNeuronLayer[temp].matrixWeight[i]*thirdNeuronLayer[temp].activateDegree;

        outputInVariable[i] += outputLayer[i].bias;
        outputLayer[i].activateDegree = activation_sigmoid(outputInVariable[i]);
    }
}

function changeWeight() {

    for (let i = 0; i < 16; i++)
    {
        for (let j = 0; j < 10; j++)
        {
            thirdErrorLayer[i] += outputErrorLayer[j]*thirdNeuronLayer[i].matrixWeight[j];
        }
        thirdErrorLayer[i] *= derivative_sigmoid(thirdNeuronLayer[i].activateDegree);
    }

    for (let i = 0; i < 16; i++)
    {
        for (let j = 0; j < 16; j++)
        {
            secondErrorLayer[i] += thirdErrorLayer[j]*secondNeuronLayer[i].matrixWeight[j];
        }
        secondErrorLayer[i] *= derivative_sigmoid(secondNeuronLayer[i].activateDegree);
    }

    for (let i = 0; i < 784; i++)
    {
        for (let j = 0; j < 16; j++)
        {
            firstErrorLayer[i] += secondErrorLayer[j]*firstNeuronLayer[i].matrixWeight[j];
        }
        firstErrorLayer[i] *= derivative_sigmoid(firstNeuronLayer[i].activateDegree);
    }


    for (let i = 0; i < 16; i++)
        for (let j = 0; j < 10; j++)
            deltaWeightThirdLayer[i][j] = n*thirdErrorLayer[i]*derivative_sigmoid(thirdNeuronLayer[i].activateDegree);

    for (let i = 0; i < 16; i++)
        for (let j = 0; j < 16; j++)
            deltaWeightSecondLayer[i][j] = n*secondErrorLayer[i]*derivative_sigmoid(secondNeuronLayer[i].activateDegree);

    for (let i = 0; i < 784; i++)
        for (let j = 0; j < 16; j++)
            deltaWeightFirstLayer[i][j] = n*firstErrorLayer[i]*derivative_sigmoid(firstNeuronLayer[i].activateDegree);

    for (let i = 0; i < 784; i++)
        for (let j = 0; j < 16; j++)
            firstNeuronLayer[i].matrixWeight[j] += deltaWeightFirstLayer[i][j];

        for (let i = 0; i < 16; i++)
            for(let j = 0; j < 16; j++)
            secondNeuronLayer[i].matrixWeight[j] += deltaWeightSecondLayer[i][j];

    for (let i = 0; i < 16; i++)
        for(let j = 0; j < 10; j++)
            thirdNeuronLayer[i].matrixWeight[j] += deltaWeightThirdLayer[i][j];
}

function train() {
    let temp = 0;

    while (temp < 1000)
    {
        for (let i = 0; i < 784; i++)
            firstNeuronLayer[i].activateDegree = trainingSet[temp].input[i];

        trueOutput = trainingSet[temp].output;
        temp++;
        globalError = 0;
        let error = 0;
        justWalk();

        for (let i = 0; i < 10; i++)
        {
            error = trueOutput[i] - outputLayer[i].activateDegree;
            outputErrorLayer[i] = 2*error;
            globalError += Math.pow(error, 2);
        }
        globalError /= 10;
       changeWeight();
}
    console.log(globalError);
}

let element = document.getElementById('outputNumber');

function resultOutput() {
    let max = 0;
    let result = 0;

    for (let i = 0; i < 10; i++) {
        if (max < outputLayer[i].activateDegree) {
            max = outputLayer[i].activateDegree;
            result = i;
        }
    }
    element.value = result;
}

