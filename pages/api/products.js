import initDB from "../../helpers/initDB"
import Product from "../../models/Product"

initDB()

export default async (req,res)=>{
 switch (req.method) {
  case 'GET':
    await getAllProducts(req,res);
    break
  case 'POST':
    await saveProduct(req,res);
    break
 }
 
}


const getAllProducts=async(req,res)=>{
  Product.find().then((products)=>{
    res.status(200).json(products)
  })
}

const saveProduct = async (req,res)=>{
  const {name,description,mediaUrl,price} = req.body
  console.log(name,description,mediaUrl,price);
  if(!name || !description || !mediaUrl || !price ){
    return res.status(422).json({error:"Please fill all inputs."})
  }

  const product = await new Product({name,price,description,mediaUrl}).save();
  res.status(201).json(product)
}