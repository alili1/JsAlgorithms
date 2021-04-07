    const COLOR_White = "#f5f8ff";
    var canvas;
    var context;
    let numberBut = document.getElementById('inputBut');
    let Changing = true;
    let status;
    let visited;
    let unvisited;
    let StartPoint;
    let StopPoint;
    var n;
    var SizeOfCell;
    let ChangeStart = false;
    let ChangeStop = false;

    function ChangingStart()
    {
        //alert("Изменение старта");
        ChangeStart = true;
    }
    function ChangingStop()
    {
        //alert("Изменение стопа");
        ChangeStop = true;
    }

    window.onload = function()
    {
        canvas = document.getElementById("pointField");
        context = canvas.getContext("2d");
        canvas.onmousedown = startDrawing;
    }
    function startDrawing(e)
    {
        if (Changing == true)
        {
            let x = Math.floor((e.pageX - canvas.offsetLeft)/SizeOfCell);
            let y = Math.floor((e.pageY - canvas.offsetTop)/SizeOfCell);
            if(ChangeStart == true)
            {
                context.fillStyle = "White";
                status[x][y] = true;
                status[StartPoint.x][StartPoint.y] = true;
                context.fillRect(SizeOfCell*StartPoint.x, SizeOfCell*StartPoint.y, SizeOfCell, SizeOfCell);

                StartPoint.x = x;
                StartPoint.y = y;

                context.fillStyle = "Green";
                
                context.fillRect(SizeOfCell*StartPoint.x, SizeOfCell*StartPoint.y, SizeOfCell, SizeOfCell);
                ChangeStart = false;
            }
            else
            {
                if(ChangeStop == true)
                {
                    context.fillStyle = "White";
                    status[x][y] = true;
                    status[StopPoint.x][StopPoint.y] = true;
                    context.fillRect(SizeOfCell*StopPoint.x, SizeOfCell*StopPoint.y, SizeOfCell, SizeOfCell);

                    StopPoint.x = x;
                    StopPoint.y = y;

                    context.fillStyle = "#e34234";
                    context.fillRect(SizeOfCell*StopPoint.x, SizeOfCell*StopPoint.y, SizeOfCell, SizeOfCell);

                    ChangeStop = false;
                }
                else
                {
                    if (ChangeStart == false && ChangeStop == false)
                    {
                        if ((x != StartPoint.x && x != StopPoint.x) || (y != StartPoint.y && y != StopPoint.y))
                        {
                            context.beginPath();
                            context.moveTo(e.pageX - canvas.offsetLeft, e.pageY - canvas.offsetTop);
                            if(status[x][y] == true)
                            {
                                status[x][y] = false;
                                context.fillStyle = "Grey";
                            }
                            else
                            {
                                status[x][y] = true;
                                context.fillStyle = "White";
                            }

                            context.fillRect(SizeOfCell*x, SizeOfCell*y, SizeOfCell, SizeOfCell);
                        }
                    }
                }
            }
        }
    }
    function DrawMaze(n)
    {
        for(let i = 0; i < n; i++)
            for(let j = 0; j < n; j++)
            {
                if(status[i][j] == true)
                    context.fillStyle = "White";
                else
                    context.fillStyle = "Grey";
                context.fillRect(SizeOfCell*i,SizeOfCell*j,SizeOfCell,SizeOfCell);
            }
        context.fillStyle = "Green";
        context.fillRect(SizeOfCell*StartPoint.x, SizeOfCell*StartPoint.y, SizeOfCell, SizeOfCell);
        context.fillStyle = "#e34234";
        context.fillRect(SizeOfCell*StopPoint.x, SizeOfCell*StopPoint.y, SizeOfCell, SizeOfCell);
    }
    class Cell
    {
        //клетка
        constructor(x = -1, y = -1)
        {
            this.x=x;
            this.y=y;
        }
    }
    let DrawingMaze = true;
    let ChangeMaze = false;
    let Visualization = false;
    function randomInteger(min, max) 
    {
        let rand = min - 0.5 + Math.random() * (max - min + 1);
        return Math.round(rand);
    }
    function getNeighbours(cell, n)
    {        
       
        let up = new Cell(cell.x, cell.y-2);
        let dw = new Cell(cell.x, cell.y+2);
        let rt = new Cell(cell.x+2, cell.y);
        let lt = new Cell(cell.x-2, cell.y);

        let d = [dw, rt, up, lt];
        let result = [];
        let size=0;

        for(let i = 0; i < 4; i++)
        {                  
            if(d[i].x >= 0 && d[i].x < n && d[i].y >= 0 && d[i].y < n)
            {       
                if (visited[d[i].x][d[i].y] == false && status[d[i].x][d[i].y] == true)
                {                            
                    result[size] = d[i];
                    size++;
                }
            }           
        }
        return result;
    }
    function DeleteWall(CellA, CellB)
    {
        let x = (CellA.x+CellB.x)/2;
        let y = (CellA.y+CellB.y)/2;
        status[x][y]=true;
        visited[CellB.x][CellB.y]=true;
        unvisited--;
    }

   function CreateMaze()
   {
        n = document.getElementById('inputNumber').value;
        SizeOfCell = 950/n;
        status = [];
        visited = [];
        unvisited = -1;

        for(let i = 0; i < n; i++)
        {
            status[i] = [];
            visited[i] = [];
            for(let j = 0; j < n; j++)
            {
                visited[i][j] = false;
                if(i % 2 == 0 && j % 2 == 0)
                {
                    unvisited++;
                    status[i][j] = true;
                }
                else
                    status[i][j] = false;
            }
        }
    
        let CurrentCell = new Cell(0,0);
        let NeighbourCell = new Cell();
        let Neighbours;
        let stack = [];
        visited[0][0]=true;

        do {
            Neighbours = getNeighbours(CurrentCell, n);
            if (Neighbours.length > 0)
            {
                stack.push(CurrentCell);
                NeighbourCell = Neighbours[randomInteger(0, Neighbours.length - 1)];
                DeleteWall(CurrentCell, NeighbourCell);
                CurrentCell=NeighbourCell;
            }
            else
            {
                if (stack.length > 0)            
                    CurrentCell=stack.pop();
                else
                {
                    //добавить функцию
                    alert("У нас проблемы"); 
                }
            }
        } while(unvisited > 0);

        //поиск стартовой точки и конечной
        let candidate = [];
        for(let i = 0; i < n; i++)
            for(let j = 0; j < n; j++)
                if(status[i][j] == true)
                    candidate.push(new Cell(i,j));
        do {
            StartPoint = candidate[randomInteger(0,candidate.length-1)];
            StopPoint = candidate[randomInteger(0,candidate.length-1)];
        } while(StartPoint.x == StopPoint.x && StartPoint.y == StopPoint.y);
        DrawMaze(n);
   }