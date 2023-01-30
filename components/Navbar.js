import Link from "next/link"
import { useRouter } from "next/router"
import {parseCookies} from 'nookies' 
import cookie from 'js-cookie'

function Navbar() {
  const router = useRouter();
  const cookiee = parseCookies();
  const user = cookiee.user

  function isActive(route){
    if(route===router.pathname){
      return "active"
    }else ""
  }
  
  return (
    <nav>
    <div className="nav-wrapper #1e88e5 blue darken-1">
      <Link className="brand-logo left" href="/"> MyStore</Link> 
      <ul id="nav-mobile" className="right">
      <li className={isActive("/cart")}><Link href="/cart">Cart</Link> </li>
      {user && user !='user' &&  <li className={isActive("/create")}><Link href="/create">Create</Link> </li>}
      {user?
        <>
        <li className={isActive("/account")}><Link href="/account">Account</Link> </li>
        <li><button onClick={()=>{
          cookie.remove('token')
          cookie.remove('user')
          router.push("/login")
        }} className="btn red">logout</button></li>
        </>
        :
        <>
        <li className={isActive("/login")}><Link href="/login">Login</Link> </li>
        <li className={isActive("/signup")}><Link href="/signup">Signup</Link> </li>
        </>
      }
      </ul>
    </div>
  </nav>
   
  )
}

export default Navbar