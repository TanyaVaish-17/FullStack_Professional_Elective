const number=[1,2,3];
const newNumber=number.map(function(n){
    return n*2;
});

// const newNumber=number.map(n=>n*2);
console.log(newNumber);


// filter

const newNum=number.filter((n)=>n%2==0);

const n=[...number,5]       // make changes and keep in new array but push does in same array , therefore we use spread operator


