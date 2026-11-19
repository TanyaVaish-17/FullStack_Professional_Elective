const http=require("http");
const server=http.createServer((req,res)=>{
    if (req.url=='/' && req.method=='GET'){
        res.end("At home page");
    }
    else if (req.url==='\About' && req.method==='GET'){
        res.end("Code is about request and response");
    }
    else if (req.url==="/Contact" && req.method==='GET'){
        
    }
    res.end("hello http server")
});
server.listen(3000,()=>{
    console.log("Server Started");
})