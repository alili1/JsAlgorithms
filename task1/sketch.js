function sleep(milliseconds) 
{
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }

  function setup() {
      let myCanvas = createCanvas(MovingX + 50 * n, MovingY + 50 * n);
      myCanvas.parent('toDraw');
  }

function draw()
{
    if(DrawingMaze == true)
    {
        for(let i = 0; i < n; i++)
            for(let j = 0; j < n; j++)
                {
                    {
                        if (status[i][j] == 0)
                            fill("Grey");
                        else
                            fill("White");     
                        if (StartPoint.x == i && StartPoint.y == j)
                            fill("Green");
                        if(StopPoint.x == i && StopPoint.y == j)
                            fill("Red");
                    }
                    rect(MovingX+(50*i), MovingY+(50*j), 50, 50);
                }
                DrawingMaze = false;
                ChangeMaze = true;
    }

    if (ChangeMaze == true)
    {

        if (mouseIsPressed == true && mouseButton == LEFT)
        {         
            let x = Math.floor(mouseX/50);
            let y = Math.floor(mouseY/50);
            if (x < n && y < n)
            {
            if (status[x][y] == true)
            {
                fill("Grey");
                status[x][y]=false;
                sleep(200);
            }
            else
            {
                fill("White");
                status[x][y]=true;
                sleep(200);
            }
            }
            rect(x*50,y*50,50,50);
           
        }
        if(mouseIsPressed == true && mouseButton == CENTER)
        {
            let x = Math.floor(mouseX/50);
            let y = Math.floor(mouseY/50);
            if(x < n && y < n)
            {
                status[StartPoint.x][StartPoint.y] = true;
                fill("White");
                rect(StartPoint.x*50, StartPoint.y*50,50,50);
                fill("Green");
                rect(50*x,50*y,50,50);
                StartPoint.y=y;
                StartPoint.x=x;
            }
        }
        if(mouseIsPressed == true && mouseButton == RIGHT)
        {
            let x = Math.floor(mouseX/50);
            let y = Math.floor(mouseY/50);
            if(x < n && y < n)
            {
                status[StopPoint.x][StopPoint.y] = true;
                fill("White");
                rect(StopPoint.x*50, StopPoint.y*50,50,50);
                fill("Red");
                rect(50*x,50*y,50,50);
                StopPoint.y=y;
                StopPoint.x=x;
            }
        }
    }       

    let ColorOfAcrive = "Yellow";

    if(Visualization == true)
    {
        fill(ColorOfAcrive);
        rect(50*Active.x, 50*Active.y, 50, 50);
    }
}