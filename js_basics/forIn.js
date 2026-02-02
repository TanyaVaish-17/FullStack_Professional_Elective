// const color=["Red","Green","Blue"];
// color.forEach((i)=>console.log(i));
// for (const i in color){
//     console.log(i,color[i]);
// }

const arr=[1,2,3];
for (const i in arr){
    arr[i]=arr[i]+3;
}
console.log(arr);