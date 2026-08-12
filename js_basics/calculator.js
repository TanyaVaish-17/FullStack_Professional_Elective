// Javascript calculator

let a=parseFloat(prompt("Enter first number : "))
let b=parseFloat(prompt("Enter second number : "))
let op = prompt("Enter your operation:");
let ans;
switch(op){
    case '+':
        ans=a+b;
        break;

    case '-':
        ans=a-b;
        break;

    case '*':
        ans=a*b;
        break;

    case '/':
        ans=a/b;
        break;
}
console.log(ans);
