import express from 'express'
export const productApp = express.Router();
let products = []

productApp.get('/products',(req,res)=>{
    // sending all the products
    res.status(200).json({message:"products",payload:products})
})

productApp.get('/products-id/:id',(req,res)=>{
    // getting the product id then find the prodcut and send as payload
    let prdId = Number(req.params.id);
    let finPrd = products.find((prd)=>prd.productId==prdId);
    if(!finPrd) return res.status(404).json({message:"product not found"})
    res.status(200).json({message:"product",payload:finPrd});
})

// getting all the products of a particular brand
productApp.get('/products-brand/:brand',(req,res)=>{
    let givenBrand = req.params.brand;
    let allProductsWithBrand = products.filter((prd)=>prd.brand===givenBrand);
    if(!allProductsWithBrand) return res.status(404).json({message:"no product found"});
    res.status(200).json({message:"products",payload:allProductsWithBrand});
})

productApp.post('/products',(req,res)=>{
    // getting the product from body
    let prd = req.body;
    products.push(prd);
    res.status(201).json({message:"product added"});
})
// updating the product with id
productApp.put('/products/:id',(req,res)=>{
    let newPrd = req.body;
    let finPrd = products.findIndex((prdt)=>Number(req.params.id)===prdt.productId);
    if(finPrd === -1) {
        return res.status(404).json({message:"product not found"});
    }
    products.splice(finPrd,1,newPrd)
    res.status(200).json({message:"product updated successfully"});
})

// delete a product by id
productApp.delete('/products/:id',(req,res)=>{
    let prdId = Number(req.params.id);
    let finPrd = products.findIndex((prd)=>prd.productId===prdId);
    if(finPrd==-1){
        return res.status(404).json({message:"product not found"});
    }
    products.splice(finPrd,1);
    res.status(200).json({message:"product deleted successfully"});
})