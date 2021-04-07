function quick_sort (workArray, first, second)
{
    let x = 0;
    let i = 0;
     let j = 0;
     let c = first;
     let d = second;

     while (c < d)
     {
         let m = (c+d)/2;
         if (workArray[c][numberOfPoints] > workArray[d][numberOfPoints] && workArray[c][numberOfPoints] < workArray[m][numberOfPoints])
             x = workArray[c][numberOfPoints];
         else if (workArray[d][numberOfPoints] > workArray[c][numberOfPoints] && workArray[d][numberOfPoints] < workArray[m][numberOfPoints])
             x = workArray[d][numberOfPoints];
         else x = workArray[m][numberOfPoints];

         i = c;
         j = d;

         while (i < j)
         {
             while (workArray[i][numberOfPoints] < x)
                 i++;
             while (workArray[j][numberOfPoints] > x)
                 j--;

             if (i <= j)
             {
                 for (let k = 0; k < numberOfPoints; k++)
                 {
                     let temp = JSON.parse(JSON.stringify(workGroup[j][k]));
                     workGroup[j][k] = JSON.parse(JSON.stringify(workGroup[i][k]));
                     workGroup[i][k] = temp;
                 }
                 i++;
                 j--;
             }
         }

         if (j-c < d-i)
         {
             if (c < j)
                 quick_sort(workArray, c, j);
             c = i;
         }
         else
         {
             if (i < d)
                 quick_sort(workArray, i, d);
             d = j;
         }
     }
}
