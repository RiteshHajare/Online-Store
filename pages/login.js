import { useState } from "react"
import  Link  from "next/link";
import baseUrl from "../helpers/baseUrl"
import cookie from "js-cookie";
import { useRouter } from "next/router";

function login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  async function handleSubmit(e){
    e.preventDefault();
    const res = await fetch(`${baseUrl}/api/login`,{
      method:"POST",
      headers:{
        'Content-Type':"application/json"
      },
      body:JSON.stringify({email,password})
    })

    const res2 = await res.json();

    if(res2.error){
      M.toast({html: res2.error,classes:'red'})
    }else{
      console.log(res2);
      cookie.set('token',res2.token)
      cookie.set('user',res2.role)
      router.push("/account");
    }
  }
  return (
    <div className="container card authcard center-align">
      <h3>Login</h3>
      <form onSubmit={e=>{handleSubmit(e)}}>
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
       <button class="btn waves-effect waves-light #1e88e5 blue darken-1" type="submit" name="action">signin
          <i class="material-icons right">forward</i>
        </button>

      <Link href="/signup"><h5>Dont have an account?</h5></Link>
      </form>
    </div>
  )
}

export default login