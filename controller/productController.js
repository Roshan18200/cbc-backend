import Product from "../models/product.js";

export function createProduct(req,res){
    if (req.user == null){
        res.status(403).json({
            message : "You need to login frist"
        })
        return;
    }

    if(req.user.role != "admin"){
        res.status(403).json({
            
            message : "You are not authrized to create a product"
        })
        return;
    }
    

    const product = new Product(req.body);

    product.save().then(
        ()=>{
        res.json({
            message : "Product save successfully"
        })
    }
).catch(
        (err)=>{
            console.log(err);
            res.status(500).json({
                message : "Product not saved"
            })
        }
    )

}

export function getProduct(req,res){
    Product.find().then(
        (products)=>{
            res.json(products)
        }
    ).catch(
        (err)=>{
            res.status(500).json({
                message : "Product not found"
            })
        }
    )
}

export async function getProductById(req,res){
const productId = req.params.id
console.log(productId)
const product = await Product.findOne({productId : productId})
if(product ==null){
    res.status(404).json({
        message : "Product not found"
    })
    return
} 
res.json({
    product : product
})
}

export function deleteProduct(req,res){
    if (req.user == null){
        res.status(403).json({
            message : "You need to login frist"
        })
        return;
    }

    if(req.user.role != "admin"){
        res.status(403).json({
            message : "You are not authrized to delete a product"
        })
        return;
    }
    Product.findOneAndDelete({
        productId : req.params.productId
    }).then(
        ()=>{
            res.json({
                message : "Product deleted succesfully"
            })
        }
    ).catch(
        (err)=>{
            res.status(500).json({
                message : "Product not deleted"
            })
        }
    )
}

export function updateProduct(req,res){
    if (req.user == null){
        res.status(403).json({
            message : "You need to login frist"
        })
        return;
}
if(req.user.role != "admin"){
    res.status(403).json({
        message : "You are not authrized to update a product"
    })
    return;

}
Product.findOneAndUpdate({
    productId : req.params.productId
},req.body).then(
    ()=>{
        res.json({
            message : "Product updated successfully"
        })
    }
).catch(
(err)=>{
    res.status(500).json({
        message : "Product not updated"
    })
}
)

}

// changing the code 4