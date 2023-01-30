import { parseCookies } from "nookies"
import UserRoles from "../components/UserRoles"


function account() {
  const cookiee = parseCookies();
  const user = cookiee.user
  return (
    <div>
    {/* <h1 className="center-align">{user}</h1> */}
      {user=="root" && <UserRoles />}
    </div>
  )
}

export async function getServerSideProps(ctx){
    const {token} = parseCookies(ctx)
    if(!token){
        const {res} = ctx
        res.writeHead(302,{Location:"/login"})
        res.end();
    }

    return{
        props:{}
    }
}

export default account
