let lengthPath = [];

function swap (ar, i, j) {
    var a=ar[i];
    ar[i]=ar[j];
    ar[j]=a;
}

function generationAllPath(arr, index) {
    if (index >= arr.length)
        return;

        generationAllPath(arr, index + 1);
        for (var i = index + 1; i < arr.length; i++)
        {
            swap(arr, index, i);
            lengthPath.push(sizeCurrentPath(arr));
            generationAllPath(arr, index + 1);
            swap(arr, index, i);
        }
}

function perebor() {
    let min = 100000;
    for (let i = 0; i < lengthPath.length; i++)
        if (lengthPath[i] < min)
            min = lengthPath[i];

        console.log(min);
}
function sizeEdges(pointFirst, pointSecond){
    let length = 0;
    length = ((pointFirst.x- pointSecond.x)*(pointFirst.x- pointSecond.x) + (pointFirst.y-pointSecond.y)*(pointFirst.y-pointSecond.y));
    length = Math.pow(length, 0.5);
    return length;
}

function sizeCurrentPath(currentPath) {
    let result = 0;
    for (let i = 0; i < numberOfPoints-1; i++)
        result += sizeEdges(currentPath[i], currentPath[i+1]);
    return result;
}