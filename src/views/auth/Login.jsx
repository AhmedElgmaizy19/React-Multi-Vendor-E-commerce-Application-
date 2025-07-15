import {useState , useEffect}  from 'react'
import { login } from '../../utils/auth'
import {Link , useNavigate} from 'react-router-dom'
import userAuthStore from '../../store/authSlice'
import { Toast } from '../../alert/alert'

function Login() {
    const navigate = useNavigate()
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [loading,setLoding] = useState(false)
    const isLoggedIn = userAuthStore((state)=>state.IsLoggedIn())
    
    useEffect(()=>{
        if (isLoggedIn){
            navigate('/dashboard')
        }
    },[isLoggedIn , navigate])

    const formReset = ()=> {
        setEmail('')
        setPassword('')
    }


    const handeleLogin = async(e) => {
       e.preventDefault();
       setLoding(true)
       try {
       const {data, error} = await login(email,password)
       if (data){
        navigate('/')
        Toast.fire(
                {
                  icon:'success',
                  title:'You Are SucsessFully LoggedIn'
                }
              )

       }else if (error){
          Toast.fire(
                {
                  icon:'error',
                  title:'invalid email or password'
                }
              )
       }

       } catch (error) {
          Toast.fire(
                {
                  icon:'error',
                  title:error.response?.data
                }
              )

       }finally{
        setLoding(false);
       }
    }


    
  

  return (
    // <div className="container">
    //     <h2>Login To Continue</h2>

       
    //     <form action="" className='form-group' onSubmit={handeleLogin}>
    //     <label htmlFor="">Enter Your Email</label>
    //     <input type="text" 
    //     name='email'
    //     id='email'
    //     value={email}
    //     onChange={(e)=>setEmail(e.target.value)}
        
    //     />

    //     <br />
    //     <br />
    //     <input className='form-group' type="password" 
    //     name='password'
    //     id='password'
    //     value={password}
    //     onChange={(e)=>setPassword(e.target.value)}
        
    //     />

    //     <button type='submit' > login</button>

    //     </form>

    //     <br />
    //     <br />
    //     <hr />
    //     <Link to={'/forgotPassword'}>forget password</Link>
    // </div>


    <main className="" style={{ marginBottom: 100, marginTop: 50 }}>
      <div className="container">
        {/* Section: Login form */}
        <section className="">
          <div className="row d-flex justify-content-center">
            <div className="col-xl-5 col-md-8">
              <div className="card rounded-5">
                <div className="card-body p-4">
                  <h3 className="text-center">Login</h3>
                  <br />

                  <div className="tab-content">
                    <div
                      className="tab-pane fade show active"
                      id="pills-login"
                      role="tabpanel"
                      aria-labelledby="tab-login"
                    >
                      <form action='' onSubmit={handeleLogin}>
                        {/* Email input */}
                        <div className="form-outline mb-4">
                          <label className="form-label" htmlFor="Full Name">
                            Email Address
                          </label>
                          <input
                            type="text"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                            className="form-control"
                          />
                        </div>

                        <div className="form-outline mb-4">
                          <label className="form-label" htmlFor="loginPassword">
                            Password
                          </label>
                          <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e)=>setPassword(e.target.value)}
                            className="form-control"
                          />
                        </div>

                        <button className="btn btn-primary w-100" type="submit">
                          <span className="mr-2">Sign In </span>
                          <i className="fas fa-sign-in-alt" />
                        </button>

                        <div className="text-center">
                          <p className="mt-4">
                            Don't have an account?{" "}
                            <Link to="/register">Register</Link>
                          </p>
                          <p className="mt-0">
                            <Link
                              to="/forgot-password"
                              className="text-danger"
                            >
                              Forgot Password?
                            </Link>
                          </p>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

export default Login



