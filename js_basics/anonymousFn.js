const factorial=function(n){
    if (n==0 || n==1)
        return 1;
    else return n*factorial(n-1);
}
console.log(factorial(7));


// npx create -react -app app_name ---> slower and heavier --> traditional
// npx create vite@latest