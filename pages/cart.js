import cookie from "js-cookie"
import Link from "next/link"
import { useRouter } from "next/router"
import { parseCookies } from "nookies"
import { useState } from "react"
import baseUrl from "../helpers/baseUrl"
import StripeCheckout from 'react-stripe-checkout';

function cartPage({error,products}) {
  const {token} = parseCookies()
  const router = useRouter()
  const [cProducts, setCartProducts] = useState(products)
  var price=0;

  if(!token){
    return(
      <div className="center-align">
        <h3>please login to view cart</h3>
        <Link className="btn #1e88e5 blue darken-1" href="/login">Login</Link>
      </div>
    )
  }
  if(error){
    M.toast({html:error,classes:"red"})
    cookie.remove("user")
    cookie.remove("token");
    router.push("/login")
  }

 

  const TotalPrice = () =>{
    return(
      <div className="container" style={{display:"flex",justifyContent:"space-between"}}>
          <h5>TotalPrice ₹ {price}</h5>
          <StripeCheckout
          name="My store"
          amount={price * 100}
          image={products.product && products[0].product.mediaUrl}
          currency="INR"
          shippingAddress={true}
          billingAddress={true}
          zipcode={true}
          >
          <button className="btn #1e88e5 blue darken-1">Checkout</button>
          </StripeCheckout>
      </div>
    )
  }

  const handleRemove = async(pid)=>{
    const res = await fetch(`${baseUrl}/api/cart`,{
      method:"DELETE",
      headers:{
        "Content-Type":"application/json",
        "Authorization":token
      },
       body:JSON.stringify({productId:pid})
    })

    const res2 = await res.json();
    setCartProducts(res2);
  }
  return (
    <div className="container">
      {cProducts.map(item=>{
         console.log(price,item.quantity,item.product.price)
         price = price + item.quantity * item.product.price
         
        return(
          <div style={{display:"flex",margin:"20px"}}>
            <img src={item.product.mediaUrl} style={{objectFit: "cover",width:"200px",height:"200px"}} />
            <div style={{marginLeft:"20px"}}>
              <h6>{item.product.name}</h6>
              <h6>{item.quantity} × {item.product.price}  </h6>
              <button className="btn red" onClick={()=>{handleRemove(item.product._id)}}>remove</button>
            </div>
          </div>
        )
      })}
      <TotalPrice />
    </div>
  )
}

export async function getServerSideProps(ctx){
  const {token} = parseCookies(ctx)
  if(!token){
    return {
      props:{products:[]}
    }
  }
  const res = await fetch(`${baseUrl}/api/cart`,{
    headers:{
      "Authorization":token
    }
  })
  const products = await res.json()
  
  console.log(products);
  if(products.error){
    return{
      props:{error:products.error}
    }
  }
 
  return{
    props:{products}
  }
}
export default cartPage