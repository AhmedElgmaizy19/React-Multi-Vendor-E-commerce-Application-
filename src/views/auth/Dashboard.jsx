import userAuthStore from '../../store/authSlice'
import { Link } from 'react-router-dom'


function Dashboard() {
  const isLoggedIn = userAuthStore((state)=>state.IsLoggedIn())
  return (
    <>
    

    {isLoggedIn
    ? <div>
        <h1>Dashboard</h1>
    </div>:
          
          <div>
          <h1>home page</h1>
      <Link to={'/login'}>Login</Link>
    <Link to={'/register'}>Register</Link>
          </div>
        
    }
    
    </>
  )
}

export default Dashboard