import { parseCookies } from "nookies"
import {  useState } from "react"
import baseUrl from "../helpers/baseUrl"

function create({val}) {
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [media, setMedia] = useState("")
  const [description, setDescription] = useState("")

  
  

  async function handleSubmit(e){
    e.preventDefault();
    const mediaUrl =  await imageupload();
    const res = await fetch(`${baseUrl}/api/products`,{
      method:'POST',
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({name,price,description,mediaUrl})
    })

    const res2 = await res.json();

    if(res2.error){
      console.log(res2.error);
      M.toast({html: res2.error,classes:'red'})
    }else{
      M.toast({html: "product saved",classes:'green'});
      setName("");
      setDescription("");
      setMedia("");
      setPrice('');
    }
  }

  const imageupload=async()=>{
    const data = new FormData();
    data.append('file',media);
    data.append('upload_preset',"next-shopping-site");
    data.append('cloud_name','dgz1wimeg');
    const res = await fetch(`https://api.cloudinary.com/v1_1/${val}/image/upload`,{
      method:"POST",
      body:data
    })
    const res2 = await res.json();
    return res2.url;

  }
  return (
      <form className="container" onSubmit={e=>{handleSubmit(e)}}>
        <input type="text" placeholder="Name"
        value={name}
        name="Name"
        onChange={e=>{setName(e.target.value)}}
        />
        <input type="text" placeholder="Price"
        value={price}
        name="Price"
        onChange={e=>{setPrice(e.target.value)}}
        />
        <div className="file-field input-field">
          <div className="btn">
            <span>File</span>
            <input type="file" accept="image/*" onChange={e=>{setMedia(e.target.files[0])}} />
          </div>
          <div className="file-path-wrapper">
            <input className="file-path validate" type="text" />
          </div>
        </div>
        <img className="responsive-img" src={media?URL.createObjectURL(media):""} alt="" />
        <textarea placeholder="Description" name="description" value={description} onChange={e=>setDescription(e.target.value)} className="materialize-textarea"></textarea>
        <button className="btn waves-effect waves-light #1e88e5 blue darken-1"  name="action">Submit
          <i className="material-icons right">send</i>
        </button>
      </form>  
  )
}

export async function getServerSideProps(ctx){
  const cookie = parseCookies(ctx);

  console.log(cookie.user);
  if(!cookie.user || cookie.user =='user'){
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
        props: {},
      };
  }

  return{
      props:{val:process.env.CLOUD_VAL}
  }
}

export default create