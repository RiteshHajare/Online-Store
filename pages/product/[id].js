import { useRouter } from "next/router";
import baseUrl from "../../helpers/baseUrl"
import {parseCookies} from 'nookies' 
import { useRef,useEffect, useState } from "react";
import cookie from "js-cookie";

function id({product}) {
    const [quantity, setQuantity] = useState(1);
    const router = useRouter()
    const cookiee = parseCookies();
    const user = cookiee.user
    const modalRef = useRef(null)
    useEffect(()=>{
      M.Modal.init(modalRef.current)
    },[])
    
    if(router.isFallback){
        return(
            <h1>Loading...</h1>
        )
    }

    const getModal = ()=>{
      return(
       <div id="modal1" className="modal" ref={modalRef}>
       <div className="modal-content">
         <h4>{product.name}</h4>
         <p>Are you sure you want to delete this</p>
       </div>
       <div className="modal-footer">
       <button className="btn waves-effect waves-light #1565c0 blue darken-3">
         cancel
       </button>
       <button className="btn waves-effect waves-light #c62828 red darken-3"
       onClick={()=>deleteProduct()}
      >
         Yes
       </button>
       </div>
     </div>
             
      )
    }
 
    const deleteProduct = async ()=>{
     const res =  await fetch(`${baseUrl}/api/product/${product._id}`,{
        method:"DELETE"
      })
     await res.json()
     router.push('/')
    }

    const addToCart = async()=>{
      const res = await fetch(`${baseUrl}/api/cart`,{
        method:"PUT",
        headers:{
          'Content-Type':"application/json",
          "Authorization":cookiee.token
        },
        body:JSON.stringify({
            quantity,productId:product._id
        })
      })

      const res2 = await res.json();
      if(res2.error){
        cookie.remove("user")
        cookie.remove("token")
        router.push('/login')
      }
      M.toast({html:res2.message,classes:'green'})
    }

  return (
    <div className="container center-align">
        <h3>{product.name}</h3>
        <img src={product.mediaUrl} style={{width:"30%"}} alt="" />
        <h5>RS {product.price}</h5>
        <input type="number" value={quantity} onChange={e=>{setQuantity(Number(e.target.value))}} placeholder="Quantity" min="1" style={{width:"400px",margin:"10px"}} />
        {user?
        <button onClick={addToCart} class="btn waves-effect waves-light #1e88e5 blue darken-1" type="submit" name="action">Add
             <i class="material-icons right">add</i>
        </button>:
        <button onClick={()=>{router.push("/login")}} class="btn waves-effect waves-light #1e88e5 blue darken-1" type="submit" name="action">Login 
             <i class="material-icons right">add</i>
        </button>}
        <p className="left-align">
            {product.description}
        </p>
        {(user=='admin' || user=='root')&&
        <button data-target="modal1" className="btn modal-trigger waves-effect waves-light #c62828 red darken-3">Delete
              <i className="material-icons left">delete</i>
            </button>}

        {getModal()}
    </div>
  )
}


// export async function getServerSideProps({params:{id}}) {
//     const res = await fetch(`http://localhost:3000/api/product/${id}`)
//     const data = await res.json();
//     return {
//       props: {product:data}, 
//     }
// }

export async function getStaticPaths() {
    return {
      paths: [{ params: { id: '63d3d40cd99700b1df9f1c17' } }],
      fallback: true,
    }
  }

export async function getStaticProps({params:{id}}) {
    const res = await fetch(`${baseUrl}/api/product/${id}`)
    const data = await res.json();
    return {
      props: {product:data}, 
    }
}

export default id