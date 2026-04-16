// creating a promise

let promise=new Promise((resolve,reject)=>{
    let success=true;
    if (success){
        resolve("Data connected");
    }
    else{
        reject("error in connection");
    }
})

// consuming a promise

fetch("https://jsonplaceholder.typicode.com/users")
.then(response=>response.json())
.then(data=>{
    data.forEach(user=>{
        console.log(user.name);
    })
})
.catch(error=>console.log(error))