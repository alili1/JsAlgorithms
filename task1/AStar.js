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
        this.weight = way + manhattan;
    }
    GetWeight()
    {
        this.weight = this.manhattan + this.way;
    }
}
let AInterval;
function search()
{
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
            alert("Путь найден");
            context.fillStyle = "Yellow";
            context.fillRect(SizeOfCell*StartPoint.x, SizeOfCell*StartPoint.y, SizeOfCell, SizeOfCell);

            
            let Current = new Cell(Active.x, Active.y);
            let Copy = new Cell();
            clearInterval(AInterval);
            do
            {
                console.log(Current.x, Current.y);
                //console.log(Current.y);
                context.fillStyle = "#ccccff"
                context.fillRect(SizeOfCell*Current.x, SizeOfCell*Current.y, SizeOfCell, SizeOfCell);
                Copy.x = Nodes[Current.x][Current.y].parentX;
                Copy.y = Nodes[Current.x][Current.y].parentY;
                Current=Copy;
            } while(Current.x != StartPoint.x || Current.y != StartPoint.y)

            context.fillStyle = "#e34234";
            context.fillRect(SizeOfCell*StopPoint.x, SizeOfCell*StopPoint.y, SizeOfCell, SizeOfCell);
            
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
                            Nodes[Active.x + moveX[i]][Active.y + moveY[i]].GetWeight();
                        }
                        else
                        {
                            Nodes[Active.x + moveX[i]][Active.y + moveY[i]] = new Node(Active.x + moveX[i], Active.y + moveY[i], Active.way + 1, Math.abs(StopPoint.x - Active.x) + Math.abs(StopPoint.y - Active.y), Active.x, Active.y);
                            Open.push(Nodes[Active.x + moveX[i]][Active.y + moveY[i]]);
                        }
                    }
                } 
            }
        } 
}
let Nodes = [];
let Active;  
let IsOpen = [];
let IsClosed = [];
let min, NumOfMin, temp;
let Open = [];
function A()
{
    ChangeMaze = false;
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


    Open.push(new Node(StartPoint.x, StartPoint.y, 0, Math.abs(StopPoint.x - StartPoint.x) + Math.abs(StopPoint.y - StartPoint.y)));
    IsOpen[StartPoint.x][StartPoint.y] = true;
    Nodes[StartPoint.x][StartPoint.y] = Open[0];

    //while(Open.length > 0)
    //{
        AInterval = setInterval(function()
        {
            search();
        }, 35);
    //}
}