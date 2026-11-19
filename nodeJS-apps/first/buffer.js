const buffer=Buffer.from("Hello jeeni");
console.log(buffer);
console.log(buffer.toString());
console.log(buffer.length);
console.log(String.fromCharCode(buffer[1]));

// buffer creation by alloc

const buffer2=Buffer.alloc(10);
buffer2.fill("Hello")
console.log(buffer2.toString());
console.log(buffer.slice(0,4));