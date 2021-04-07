const Q = 5;
const alpha = 1;
const beta = 3;
const p = 0.5;
const start_pheromones = 0.1;
const iterations = 1000;
let iter = 1;
class Edge
{
    constructor(len, pheromones)
    {
        this.len = len;
        this.pheromones = pheromones;
    }
}
class Ant
{
    constructor()
    {
        this.len = 0;
        this.route = [];
    }
}
function GetDistance(A, B)
{
    let x = Math.pow(A.x - B.x, 2);
    let y = Math.pow(A.y - B.y, 2);
    return Math.sqrt(x + y);
}
function AntSearch()
{
    console.log(iter);
    iter++;
    ants.length = 0;
    for(let j = 0; j < points.length; j++) //номер муравья
    {
        ants[j] = new Ant();
        current = j;
        for (let z = 0; z < points.length; z++)
            visited[z] = false;
        ants[j].route.push(j);
        for (let g = 0; g < points.length - 1; g++) //число посещенных городов
        {
            visited[current] = true;
            sum = 0;
            for (let z = 0; z < points.length; z++)
                if (visited[z] == false)
                    sum += Math.pow(edges[current][z].pheromones, alpha)*Math.pow(edges[current][z].len, -1*beta);

            rnd = Math.random();
            CurrentSum = 0;
            index = -1;
            while(CurrentSum < rnd)
            {
                index++;
                if (current == index || visited[index] == true)
                    continue;
                CurrentSum += Math.pow(edges[current][index].pheromones, alpha)*Math.pow(edges[current][index].len, -1*beta)/sum;
            }
            ants[j].len += edges[current][index].len;
            current = index;
            ants[j].route.push(current);
        }
    }

    for(let z = 0; z < points.length; z++)
        for(let j = 0; j < points.length; j++)
            edges[z][j].pheromones *= p;

    for(let z = 0; z < points.length; z++)
        for(let j = 1; j < ants[z].route.length; j++)
            edges[ants[z].route[j-1]][ants[z].route[j]].pheromones += Q/ants[z].len;

    for(let z = 0; z < points.length; z++)
        if(BestRoute == -1 || ants[z].len < BestRoute)
        {
            BestRoute = ants[z].len;
            result = ants[z].route;
        }
    DrawResult(result);
}
function DrawResult(result)
{
    context.clearRect(0,0,1000,600);

    //отрисовка финального маршрута
    context.beginPath();
    context.moveTo(points[result[0]].x, points[result[0]].y);
    for(let i = 0; i < points.length; i++)
        context.lineTo(points[result[i]].x, points[result[i]].y);
    context.stroke();
    //  context.moveTo(points[0].x, points[0].y);

    for(let i = 0; i < points.length; i++)
    {
        context.moveTo(points[i].x, points[i].y);
        context.arc(points[i].x, points[i].y, 7, 0, 2*Math.PI);
        // context.fillStyle = COLOR_White;
        //context.fill();
        context.lineWidth = 1;
        context.strokeStyle = COLOR_red;
        context.stroke();
    }
        context.closePath();
}

let edges = [];
let current; //текущий город
let visited = []; //посещенные города
let sum; //сумма "желаний" муравья перейти
let chanses = []; // вероятности перехода
let temp, CurrentSum;
let rnd, index;
let ants = [];
let BestRoute = -1, result;
function algorithm()
{
    for(let i = 0; i < points.length; i++)
    {
        edges[i] = [];
        for(let j = 0; j < points.length; j++)
        {
            if (i == j)
                edges[i][j] = new Edge(0, start_pheromones);
            if (i < j)
                edges[i][j] = new Edge(GetDistance(points[i], points[j]), start_pheromones);
            if (i > j)
                edges[i][j] = new Edge(edges[j][i].len, start_pheromones);
        }
    }

    AntInterval = setInterval(
        AntSearch, 70
    )
    //alert("Итоговая дистанция");
    //alert(BestRoute);
}

function clearAlert() {
    clearInterval(AntInterval);
}