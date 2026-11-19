import fs from 'fs';

const readStream=fs.createReadStream("./nodeJS-apps/first/sample.txt");
const writeStream=fs.createWriteStream("./nodeJS-apps/first/output.txt");
// readStream.on('data',(chunk)=>{
//     console.log(chunk);
//     writeStream.write(chunk);
// });
// readStream.on('end',()=>{
//     console.log("EOF");
//     writeStream.close();
// })

readStream.pipe(writeStream);
writeStream.on("finish",()=>{
    console.log("End of stream");
})