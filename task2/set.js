function DrawClasters2(point, color)
{
    context.beginPath();
    context.moveTo(point.x, point.y);
    
    let x = point.x;
    let y = point.y; 
    context.arc(x, y, 12, 3*Math.PI/2, Math.PI/2);
    context.fillStyle = colors[color];
    context.fill();
    context.lineWidth = 1;
    context.strokeStyle = colors[color];
    context.stroke();
}
function Start()
{
    algorithm();
    let result = [];
    for (let i = 0; i < points.length; i++)
    {
        result[i] = [];
        result[i].push(points[i].number);
    }
    hierarchy();
    for (let i = 0; i < points.length; i++)   
        result[i].push(points[i].number);
    let temp = []; 
    let max, NumOfMax;
    let matches = []; 

    for(let i = 0; i < colors.length; i++) //поменять на n
    {
        for(let j = 0; j < points.length; j++)
            temp[j]= 0;

        for (let j = 0; j < points.length; j++)
            if (result[j][0] == i)
                temp[result[j][1]]++;

        max = temp[0]; NumOfMax = 0;
        for (let j = 1; j < points.length; j++)
            if(temp[j] > max && matches.indexOf(j) == -1)//возможно, позже поменять
            {
                max = temp[j];
                NumOfMax = j;
            }

        matches.push(NumOfMax);
    }

    alert(matches);
    for(let i = 0; i < points.length; i++)
    { 
        context.beginPath();
        context.moveTo(points[i].x, points[i].y);
        
        let x = points[i].x;
        let y = points[i].y; 
        if(result[i][1] == matches[result[i][0]])
        {
            context.arc(x, y, 8, 0, 2*Math.PI);
            context.fillStyle = colors[points[i].number];
            context.fill();
            context.lineWidth = 1;
            context.strokeStyle = colors[points[i].number];
            context.stroke();
        }
        else
        {
            DrawClasters(points[i]);
            DrawClasters2(points[i], matches.indexOf(result[i][1]));
            /*
            console.log("Different");
            context.arc(x, y, 12, 0, 2*Math.PI);
            context.fillStyle = colors[result[i][0]];
            context.fill();
            context.lineWidth = 5;
            context.strokeStyle = colors[matches.indexOf(result[i][1])];
            context.stroke();
            
            console.log("!");
            context.arc(x, y, 8, Math.PI/2, 3*Math.PI/2);
            context.fillStyle = colors[result[i][0]];
            context.fill();
            context.lineWidth = 1;
            context.strokeStyle = colors[result[i][0]];
            context.stroke(); 

            context.arc(x, y, 8, 3*Math.PI/2, Math.PI/2);
            context.fillStyle = colors[result[i][1]];
            context.fill();
            context.lineWidth = 1;
            context.strokeStyle = colors[result[i][1]];
            context.stroke(); 
            */
        }
    }
    console.log(matches);
}