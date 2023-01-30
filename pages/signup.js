import { useState } from "react"
import  Link  from "next/link";
import baseUrl from "../helpers/baseUrl";
import { useRouter } from "next/router";

function signup() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()
  async function userSignup(e){
    e.preventDefault();
    const res = await fetch(`${baseUrl}/api/signup`,{
      method:"POST",
      headers:{
        'Content-Type':"application/json"
      },
      body:JSON.stringify({name,email,password})
    })

    const res2= await res.json();
    if(res2.error){
      M.toast({html: res2.error,classes:'red'})
    }else{
      M.toast({html: res2.message,classes:'green'});
      router.push("/login");
    }

  }
  return (
    <div className="container card authcard center-align">
      <h3>signup</h3>
      <form onSubmit={e=>{userSignup(e)}}>
      <input 
      type="text"
      placeholder="Name" 
      value={name} 
      onChange={e=>{setName(e.target.value)}} />
      <input 
      type="email"
      placeholder="Email" 
      value={email} 
      onChange={e=>{setEmail(e.target.value)}} />
      <input 
      type="password"
      placeholder="Password" 
      value={password} 
      onChange={e=>{setPassword(e.target.value)}} />
       <button class="btn waves-effect waves-light #1e88e5 blue darken-1" type="submit" name="action">signup
          <i class="material-icons right">forward</i>
        </button>

      <Link legacyBehavior href="/login"><a><h5>Already Registered?</h5></a></Link>
      </form>
    </div>
  )
}

export default signup