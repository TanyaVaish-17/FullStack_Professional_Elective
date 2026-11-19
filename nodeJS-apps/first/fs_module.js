const fs=require('fs');
const filePath='./nodeJS-apps/first/test2.txt';
const Content="Hello Tanya";
fs.writeFile(filePath,Content,(err)=>{
    if (err) throw err;
    console.log('The file has been saved!');
});

const res=fs.readFile(filePath,'utf-8',(err,data)=>{
    if (err) throw err;
    console.log(data);
});

fs.appendFileSync(filePath,'This is appended text.','utf-8');