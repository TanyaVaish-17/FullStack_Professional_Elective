const express=require(express);
const app=express();
app.use(express.json());

app.get("/square/area",(req,res)=>{
    const width=parseInt(req.query.width);
    const area=width*width;
    res.json(area);
});

app.get("/square/perimeter",(req,res)=>{
    const width=parseInt(req.query.width);
    const area=4*width;
    res.json(perimeter);
});

app.get("/rectangle/area",(req,res)=>{
    const width=parseInt(req.query.width);
    const length=req.query.length;
    const area=length*width;
    res.json(area);
});

app.get("/rectangle/perimeter",(req,res)=>{
    const width=parseInt(req.query.width);
    const length=req.query.length;
    const perimeter=2*(length+width);
    res.json(perimeter);
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});