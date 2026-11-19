// Create a NodeJS service that records customer ratings for products. Product information is stored in memory, and the API must maintain both rating totals and the resulting average.


const express = require('express');
const app = express();
app.use(express.json());

let products = [
  { id: 1, name: "Wireless Mouse", ratingCount: 0, ratingTotal: 0, average: 0 },
  { id: 2, name: "Mechanical Keyboard", ratingCount: 0, ratingTotal: 0, average: 0 }
];
// 1. GET /api/products: Return all products with their current rating details. Respond with status 200 and "Products retrieved successfully".
app.get('/api/products',(req,res)=>{
    res.status(200).json({
        message:"Products retrieved successfully",
        products
    });
});


// 2. POST /api/rate: Accept productId and rating. Missing fields should return 400 with "productId and rating are required". An unknown product should return 404 with "Product not found". Ratings must be whole or numeric values from 1 to 5; otherwise return 400 with "Rating must be between 1 and 5". Update the product's rating count and average after a valid request.
app.post('/api/rate',(req,res)=>{
    const{productId,rating}=req.body;
    if (productId===undefined || rating===undefined){
        return res.status(400).json({message:"productId and rating are required"});
    }
    const product=products.find(p=>p.id===productId);
    if (!product){
        return res.status(404).json({message:"Product not found"});
    }
    if (typeof rating != 'number' || rating<1 || rating>5){
        return res.status(400).json({message:"Rating must be between 1 and 5"});
    }
    product.ratingCount+=1;
    product.ratingTotal+=rating;
    product.average=product.ratingTotal/product.ratingCount;
    res.status(200).json(product);
})



// 3. GET /api/ratings: Return each product's name, number of ratings, and average rating with status 200 and the message "Product ratings retrieved successfully".
app.get('/api/ratings',(req,res)=>{
    res.status(200).json({
        products:products.map(p=>({productName:p.name,ratingCount:p.ratingCount,average:p.average})),
        message:"Product ratings retrieved successfully"
    });
});


// 4. Validate request data before changing stored values and return JSON for both successful and failed requests.

app.use((req,res)=>{
    res.status(404).json({message:"Route not found"});
})