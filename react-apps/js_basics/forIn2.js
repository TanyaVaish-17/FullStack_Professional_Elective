const user={name:"Tanya",age:20,Hobby:"Sleeping"};
for (const index in user){
    console.log(index,user[index]);   // user.index will give error since they are not pointing to actual keya in the user array
}