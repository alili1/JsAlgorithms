let n;
const colors = ["#000080", "#ffff00", "#008080", "#800080", "#00ff00", "#ff00ff"];
function randomInteger(min, max) 
{
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}
function GetDistance(A, B)
{
    let CurrentX = A.x - B.x;
    let CurrentY = A.y - B.y;
    return Math.sqrt(Math.pow(CurrentX, 2) + Math.pow(CurrentY, 2));
}
function DrawCenters(centers, e)
{
    for(let i = 0; i < centers.length; i++)
    { 
        context.beginPath();
        context.moveTo(centers[i].x, centers[i].y);
        
        let x = centers[i].x;
        let y = centers[i].y; 
        context.arc(x, y, 13, 0, 2*Math.PI);
        context.fillStyle = colors[i];
        context.fill();
        context.lineWidth = 1;
        context.strokeStyle = colors[i];
        context.stroke();
    }
}
function DrawClasters(point, e)
{
    context.beginPath();
    context.moveTo(point.x, point.y);
    
    let x = point.x;
    let y = point.y; 
    context.arc(x, y, 12, Math.PI/2, 3*Math.PI/2);
    context.fillStyle = colors[point.number];
    context.fill();
    context.lineWidth = 1;
    context.strokeStyle = colors[point.number];
    context.stroke();
    
}
function createNumber() {
    n = document.getElementById('inputNumber').value;
}

function algorithm()
{
   Changing = false;
   //инициализация

   let centers = []; let sum;  
   let min, NumOfMin, temp, rnd, index;
   let NumOfCenters = 1;
   //centers[0] = points[0];
   centers[0] = new Point(points[0].x, points[0].y);
   let arrmins = [];

   while(NumOfCenters < n)
   {
        sum = 0;
        for (let j = 1; j < points.length; j++)
        {
            if(points[j].center == true)
                continue;
            min = -1;

            for (let z = 0; z < NumOfCenters; z++)
            {                
                temp = Math.pow(GetDistance(points[j], centers[z]), 2);
                if (temp < min || min == -1)        
                {       
                    min = temp;
                    NumOfMin = z;
                }
            }      
            sum += min;
            arrmins[j] = NumOfMin;
        }
        rnd = Math.random()*sum;
        sum = 0; index = 1;


        while(sum < rnd)
        {
           if (points[index].center == false)
                sum += Math.pow(GetDistance(points[index], centers[arrmins[index]]), 2);
            index++;
        }

        while (points[index-1] == true)
            index--;
        //centers.push(points[index-1]);
        centers.push(new Point(points[index-1].x, points[index - 1].y));
        points[index-1].center = true;
        NumOfCenters++;
   }

   let k = 0;
   let ChangeHappened = true;
   while(k < 1000 && ChangeHappened == true)
   {
       k++;
       ChangeHappened = false;
       //основной цикл  

        for(let i = 0; i < points.length; i++)
        {
            min = GetDistance(points[i], centers[0]);
            NumOfMin = 0;
            for (let j = 1; j < n; j++)
            {
                temp = GetDistance(points[i], centers[j]);
                if (temp < min)
                {
                    min = temp;
                    NumOfMin = j;
                }
            }
            if(points[i].number != NumOfMin)
            {
                ChangeHappened = true;
                points[i].number = NumOfMin;
            }
        }

       for (let i = 0; i < n; i++)
            centers[i].GoToZero();
        
       for (let i = 0; i < points.length; i++)
       {
            centers[points[i].number].x += points[i].x;
            centers[points[i].number].y += points[i].y;
            centers[points[i].number].number++;
       }

       for(let i = 0; i < n; i++)
        {
            centers[i].x = centers[i].x / centers[i].number;
            centers[i].y = centers[i].y / centers[i].number;
        }
   }
   //DrawClasters(points);
   //DrawCenters(centers);
}