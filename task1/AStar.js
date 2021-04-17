class Node
{
    constructor(x, y, way, manhattan, parentX = -1, parentY = -1)
    {
        this.x = x;
        this.y = y;
        this.parentX = parentX;
        this.parentY = parentY;
        this.way = way;
        this.manhattan = manhattan;
    }
}
function GoBack()
{
    console.log(Current.parentX, Current.parentY);
    context.fillStyle = "#ccccff"
    context.fillRect(SizeOfCell*Current.x, SizeOfCell*Current.y, SizeOfCell, SizeOfCell);
    Current = Nodes[Current.parentX][Current.parentY];
    if (Current.x == StartPoint.x && Current.y == StartPoint.y)
        clearInterval(DrawInterval);
}
function ClearMaze()
{
    context.fillStyle = "White";
    for(let i = 0; i < n; i++)
        for(let j = 0; j < n; j++)
        {
            status[i][j] = true;
            if(!((i == StartPoint.x && j == StartPoint.y)||(i == StopPoint.x && j == StopPoint.y)))
                context.fillRect(SizeOfCell*i, SizeOfCell*j, SizeOfCell, SizeOfCell);
        }
}
let AInterval;
let DrawInterval;
let Current;
function search()
{
    if(Open.length == 0)
    {
        alert("Пути нет");
        clearInterval(AInterval);         
        return;    
    }
    min = Open[0].manhattan;
    NumOfMin = 0;
    for(let i = 1; i < Open.length; i++)
    {
        if(Open[i].manhattan < min)
        {
            min = Open[i].manhattan;
            NumOfMin = i;
        }
    }
    
    Active = Open[NumOfMin];
    if (Active.x == StopPoint.x && Active.y == StopPoint.y)
    {            
        context.fillStyle = "Yellow";
        context.fillRect(SizeOfCell*StartPoint.x, SizeOfCell*StartPoint.y, SizeOfCell, SizeOfCell);
        Current = Nodes[Active.parentX][Active.parentY];
        clearInterval(AInterval);

        DrawInterval = setInterval(function()
        {
            GoBack();
        }, 20);
        context.fillStyle = "#e34234";
        context.fillRect(SizeOfCell*StopPoint.x, SizeOfCell*StopPoint.y, SizeOfCell, SizeOfCell);
        Changing = true;
        return;
    }
    Open.splice(NumOfMin, 1);
    IsClosed[Active.x][Active.y] = true;
    context.fillStyle = "#98ff98";
    context.fillRect(SizeOfCell*Active.x, SizeOfCell*Active.y, SizeOfCell, SizeOfCell);

    let moveX = [1, -1, 0, 0];
    let moveY = [0, 0, 1, -1];
    for(let i = 0; i < 4; i++)
    {
        if(Active.x + moveX[i] >= 0 && Active.x + moveX[i] < n && Active.y + moveY[i] >= 0 && Active.y + moveY[i] < n)
        {
            if(status[Active.x + moveX[i]][Active.y + moveY[i]] == true)
            {
                temp = Active.way + 1;
                if (IsClosed[Active.x + moveX[i]][Active.y + moveY[i]] == false || temp < Nodes[Active.x + moveX[i]][Active.y + moveY[i]].way) //добавить условие перезаписи
                {
                    if(IsOpen[Active.x + moveX[i]][Active.y + moveY[i]] == true)
                    {
                        Nodes[Active.x + moveX[i]][Active.y + moveY[i]].parentX = Active.x;
                        Nodes[Active.x + moveX[i]][Active.y + moveY[i]].parentY = Active.y;
                        Nodes[Active.x + moveX[i]][Active.y + moveY[i]].way = Active.way + 1;
                        Nodes[Active.x + moveX[i]][Active.y + moveY[i]].manhattan = Math.abs(StopPoint.x - Active.x) + Math.abs(StopPoint.y - Active.y);
                    }
                    else
                    {
                        IsOpen[Active.x + moveX[i]][Active.y + moveY[i]] = true;
                        Nodes[Active.x + moveX[i]][Active.y + moveY[i]] = new Node(Active.x + moveX[i], Active.y + moveY[i], Active.way + 1, Math.abs(StopPoint.x - Active.x) + Math.abs(StopPoint.y - Active.y), Active.x, Active.y);
                        Open.push(Nodes[Active.x + moveX[i]][Active.y + moveY[i]]);
                    }
                }
            } 
        }
    } 
}
let Nodes;
let Active;  
let IsOpen;
let IsClosed;
let min, NumOfMin, temp;
let Open;
function A()
{
    Changing = false;
    for(let i = 0; i < n; i++)
    {
        IsOpen[i]=[];
        IsClosed[i]=[];
        for(let j = 0; j < n; j++)
        {
            IsOpen[i][j] = false;
            IsClosed[i][j] = false;
        }
        Nodes[i] = [];
    }

    IsOpen[StartPoint.x][StartPoint.y] = true;
    Nodes[StartPoint.x][StartPoint.y] = new Node(StartPoint.x, StartPoint.y, 0, Math.abs(StopPoint.x - StartPoint.x) + Math.abs(StopPoint.y - StartPoint.y));
    Open.push(Nodes[StartPoint.x][StartPoint.y]);
    AInterval = setInterval(function()
    {
        search();
    }, 35);
}