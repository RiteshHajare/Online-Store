import Link from 'next/link'
import baseUrl from "../helpers/baseUrl"

function index({products}) {
    console.log(products);
    const productList = products.map((product)=>{
      return(
        <div className="card pcard" key={product._id}>
        <div className="card-image">
          <img src={product.mediaUrl} />
          <span className="card-title">{product.name}</span>
        </div>
        <div class="card-content">
          <p>{product.price}</p>
        </div>
        <div className="card-action">
          <Link href={`/product/${product._id}`}>View Product</Link> 
        </div>
      </div>
      )
    })


  return (
    <div className="rootcard">
       {productList}
    </div>
  )
}


export async function getStaticProps(context) {
    const res = await fetch(`${baseUrl}/api/products`);
    const data = await res.json();
    return {
      props: {products:data}, // will be passed to the page component as props
    }
  
}

export default index
