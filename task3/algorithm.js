let numberOfPoints = 0;
let startNumberOfPath = 1;
let result = 0;
let pointOfBreak = 3;
let sizeWorkgroup = 0;
let mutationChance = 50;
let watchChanges = 0;
let currentChange = 1;
let firstPath = [];
let workGroup = []; //популяция


class Edge
{
    constructor(x1, y1, x2, y2, length)
    {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this.length = length;
    }
}

function countNumberOfPoints() {
    numberOfPoints = points.length;
}

function numberOfPath() {
    for (let i = 1; i <= points.length; i++)
        startNumberOfPath = startNumberOfPath*i;
    startNumberOfPath = startNumberOfPath/2;
}

function toDoSizeWrGroup() {
    if (startNumberOfPath < 100)
        sizeWorkgroup = startNumberOfPath;  /* ищет не самый лучший путь */
    else if (startNumberOfPath < 1000000)
        sizeWorkgroup = Math.ceil(startNumberOfPath/100);
    else if (startNumberOfPath < 100000000)
        sizeWorkgroup = Math.ceil(startNumberOfPath/100000);

}

function preparations() {
    countNumberOfPoints();
    console.log(numberOfPoints);
    numberOfPath();
    console.log(startNumberOfPath);
    toDoSizeWrGroup();
    console.log(sizeWorkgroup);
    generationAllPath(points, 0); /* вызов функций из check.js для проверки */
    perebor();
    algorithm();
}

function randomInteger(min, max)
{
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}

function GetInitialPopulation()
{
    let candidates = [];
    let rnd;

    for(let i = 0; i < sizeWorkgroup; i++)
    {
        workGroup.push(new Array());
        for (let j = 0; j < numberOfPoints; j++)
            candidates[j] = points[j];

        for (let j = 0; j < numberOfPoints; j++)
        {
            rnd = randomInteger(0, candidates.length - 1);
            workGroup[workGroup.length - 1].push(candidates[rnd]);
            candidates.splice(rnd, 1);
        }
        workGroup[i][numberOfPoints] = 0;
    }
}

function sizeOfEdges(pointFirst, pointSecond){
    let length = 0;
    length = ((pointFirst.x- pointSecond.x)*(pointFirst.x- pointSecond.x) + (pointFirst.y-pointSecond.y)*(pointFirst.y-pointSecond.y));
    length = Math.pow(length, 0.5);
    return length;
}

function sizeOfCurrentPath(currentPath) {
    let result = 0;
    for (let i = 0; i < numberOfPoints-1; i++)
        result += sizeOfEdges(currentPath[i], currentPath[i+1]);
    return result;
}

function crossPartOne (father, mother, child) {

    for (let i = 0; i < pointOfBreak; i++)
    {
        child[i] = JSON.parse(JSON.stringify(father[i]));
        father[i].number = 0;
        for (let j = i; j < numberOfPoints; j++)
            if (mother[j].number == child[i].number)
                mother[j].number = 0;
    }

}

function toCreateFirstPath () {
    for (let i = 0; i < numberOfPoints; i++)
        firstPath[i] = points[i];
    firstPath[numberOfPoints] = sizeOfCurrentPath(firstPath);
}
function crossPartTwo (father, mother, child) {

    for (let i = pointOfBreak; i < numberOfPoints; i++)
    {
        if (mother[i].number != 0) {
            child[i] = JSON.parse(JSON.stringify(mother[i]));
            for (let j = pointOfBreak; j < numberOfPoints; j++)
                if (father[j].number == mother[i].number)
                {
                    father[j].number = 0;
                    break;
                }
        }
        else for (let j = pointOfBreak; j < numberOfPoints; j++)
            if (father[j].number != 0)
            {
                child[i] = JSON.parse(JSON.stringify(father[j]));
                for (let k = i; k < numberOfPoints; k++)
                    if (mother[k].number == child[i].number)
                    {
                        mother[k].number = 0;
                        break;
                    }
                father[j].number = 0;
                break;
            }
    }

}

function toMutation(child) {
    let chance = randomInteger(0, 100);

    if (chance > mutationChance)
    {
        let firstGen = randomInteger(1, numberOfPoints-1);
        let secondGen = randomInteger(1, numberOfPoints-1);

        let temp = JSON.parse(JSON.stringify(child[firstGen]));
        child[firstGen] = JSON.parse(JSON.stringify(child[secondGen]));
        child[secondGen] = temp;
    }
}

function cross(father, mother, child) {

    let tempFather = JSON.parse(JSON.stringify(father));
    let tempMother = JSON.parse(JSON.stringify(mother));

    crossPartOne(tempFather, tempMother, child);
    crossPartTwo(tempFather, tempMother, child);

    toMutation (child);

    child.push(sizeOfCurrentPath(child));
}

function insert (child){
    let i = 0;

    while (i < sizeWorkgroup && workGroup[i][numberOfPoints] < child[numberOfPoints])
        i++;

    if (i == sizeWorkgroup) {
        if (currentChange < sizeWorkgroup-1)
            currentChange++;
        else currentChange = 0;
    }
    else if (workGroup[i][numberOfPoints] == child[numberOfPoints]) /* что делать если длины путей равны?? */
    {
        workGroup.splice(sizeWorkgroup-1, 1);
        workGroup.splice(i, 0, child);
        watchChanges = 0;
        currentChange++;
    }
    else {
        workGroup.splice(sizeWorkgroup-1, 1);
        workGroup.splice(i, 0, child);
        watchChanges = 0;
        currentChange = 1;
    }
}

function algorithm()
{
    toCreateFirstPath();
    GetInitialPopulation();
    drawFirstPath(firstPath);
    for (let i = 0; i < sizeWorkgroup; i++)
        workGroup[i][numberOfPoints] = sizeOfCurrentPath(workGroup[i]);

    quick_sort(workGroup);
    console.log(workGroup[0][numberOfPoints]);
    toDoAllWork (); /* функция отрисовки setinterval не хочет работать( */
}

function toDoAllWork (){

    while (watchChanges < 100) {
        let child = [];

        if (currentChange == 0)
            cross(workGroup[0], workGroup[1], child);
        else
            cross(workGroup[0], workGroup[currentChange], child);
        insert(child);
    }

        drawPth(workGroup[0]);
        mainPath(workGroup[0]);
}




/* набрать точки в массив
определить точку остановки алгоритма
определить количество поколений
 задать порядок городов в самом первом пути
 сделать массив всех перестановок этого пути без учета порядка
 для каждого пути посчитать функцию фитнесс\
 рандомно выбрать два индекса строк матрицы с вариантами путей и скрестить эти пути
 выбрать точку разрыва, копировать в первого потомка точки от первого родитля до точки разрыва, затем - точки второго родителя после разрыва
 определяем
 */