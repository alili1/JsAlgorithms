    //начало поля настройки
    let numberBut = document.getElementById('inputBut');
    let MovingX = 0; //смещение таблицы по Х
    let MovingY = 0; //смещение таблицы по Y
    //конец поля настройки
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
    function getNeighbours(cell)
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
            if(d[i].x > 0 && d[i].x < n-1 && d[i].y > 0 && d[i].y < n-1)
            {       
                if(visited[d[i].x][d[i].y] == false && status[d[i].x][d[i].y] == true)
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

    let n = document.getElementById('inputNumber').value;
    numberBut.onclick = function ()
    {
        n = document.getElementById('inputNumber').value;
    }

    console.log(n);
   let status = [];
   let visited = [];
   let unvisited = -1;
   n = Number(n);

   if(n % 2 == 0)
       n++;
   else //костыль
       n = n + 2;

   for(let i = 0; i < n; i++)
   {
       status[i] = [];
       visited[i] = [];
       for(let j = 0; j < n; j++)
       {
           visited[i][j] = false;
           if(i % 2 != 0 && j % 2 != 0 && i < n-1 && j < n-1)
           {
               unvisited++;
               status[i][j] = true;
           }
           else
               status[i][j] = false;
       }
   }

   //генерация лабиринта
   let CurrentCell = new Cell(1,1);
   let NeighbourCell = new Cell();
   let Neighbours;
   let stack = [];
   let size=0;
   visited[1][1]=true;

   do{
       Neighbours = getNeighbours(CurrentCell);

       if(Neighbours.length > 0)
       {
           stack[size]=CurrentCell;
           size++;
           NeighbourCell = Neighbours[randomInteger(0, Neighbours.length - 1)];
           DeleteWall(CurrentCell, NeighbourCell);
           CurrentCell=NeighbourCell;
       }
       else
       {
           if (size > 0)
           {
               CurrentCell=stack[size-1];
               size--;
           }
           else
           {
               alert("У нас проблемы");
           }
       }
   } while(unvisited > 0);

//поиск стартовой точки и конечной
let candidate = [];
size=0;
for(let i = 0; i < n; i++)
   for(let j = 0; j < n; j++)
   {
       if(status[i][j] == true)
       {
           candidate[size]= new Cell(i,j);
           size++;
       }
   }
   let StartPoint;
   let StopPoint;
do{
   StartPoint = candidate[randomInteger(0,size-1)];
   StopPoint = candidate[randomInteger(0,size-1)];
} while(StartPoint.x == StopPoint.x && StartPoint.y == StopPoint.y);