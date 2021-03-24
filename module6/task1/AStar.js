let Active;
function A()
{
    ChangeMaze = false;
    Visualization = true;
    alert("Алгоритм начал работу");   
    class Node
    {
        constructor(x, y, parentX = -1, parentY = -1)
        {
            this.x = x;
            this.y = y;
            this.ParentY = parentY;
            this.parentX = parentX;
        }
    }
    Active = new Node(StartPoint.x, StartPoint.y);
    let OpenList = [];
    let OpenSize = 0;
    let moveX = [1, -1, 0, 0];
    let moveY = [0, 0, 1, -1];

    let temp = 0;
    while(temp < 100)//поменять
    {
        for (let i = 0; i < 4; i++)
        {

        }
        temp++;
    }
}