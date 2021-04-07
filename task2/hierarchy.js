function temp()
{
    alert(screen.width);
}
function hierarchy()
{
    let n = document.getElementById('inputNumber').value; // число кластеров
    let NumOfClusters = points.length;
    let centers = [];
    for (let i = 0; i < points.length; i++)
    {
        points[i].number = i;
        centers[i] = new Point(points[i].x, points[i].y);
        centers[i].number = 1;//количество точек, принадлежащих кластеру
    }

    let min, minA, minB, temp;
    while(centers.length > n)
    {
        min = GetDistance(centers[0], centers[1]);
        minA = 0; minB = 1;
        //ищем пару центроидов на наименьшем расстоянии
        for(let i = 0; i < centers.length; i++)
            for(let j = i + 1; j < centers.length; j++)
            {
                temp=GetDistance(centers[i], centers[j]);
                if(temp < min)
                {
                    min = temp;
                    minA = i;
                    minB = j;
                }    
            }

       //Объединяем два кластера в один
       for(let i = 0; i < points.length; i++)
       {
            if (points[i].number == minB)
                points[i].number = minA;
            if (points[i].number > minB)
                points[i].number--;
       }

       centers[minA].x = (centers[minA].x*centers[minA].number + centers[minB].x*centers[minB].number)/(centers[minA].number + centers[minB].number);
       centers[minA].y = (centers[minA].y*centers[minA].number + centers[minB].y*centers[minB].number)/(centers[minA].number + centers[minB].number);
       centers[minA].number += centers[minB].number;

       centers.splice(minB, 1);
    }

   // DrawClasters2(points);
   // DrawCenters(centers);
}