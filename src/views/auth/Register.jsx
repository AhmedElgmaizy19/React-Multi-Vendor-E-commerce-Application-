import { useState, useEffect } from "react";
import { register } from "../../utils/auth";
import { Link, useNavigate } from "react-router-dom";
import userAuthStore from "../../store/authSlice";
import { Toast } from "../../alert/alert";

function Register() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const isLoggedIn = userAuthStore((state) => state.IsLoggedIn());
 
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
       Toast.fire(
        {
          icon:'info',
          title:'You already logged in'
        }
      )
    }
  }, [isLoggedIn, navigate]);

  async function handleRegister(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const { data, error } = await register(
        fullName,
        email,
        phone,
        password,
        confirmPassword
      );
      if (data) {
        navigate("/");
         Toast.fire(
        {
          icon:'success',
          title:'You Are SucsessFully Register'
        }
      )
      } else if (error) {
         Toast.fire(
        {
          icon:'error',
          title:error.response?.data
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
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* <h2>Register</h2> 

    <form action="" onSubmit={handleRegister}>
        <input type="text" placeholder='fullName'value={fullName} onChange={(e)=>setFullName(e.target.value)}  /><br />
        <input type="email" placeholder='email' value={email} onChange={(e)=>setEmail(e.target.value)}  /><br />
        <input type="text" placeholder='phone' value={phone} onChange={(e)=>setPhone(e.target.value)}  /><br />
        <input type="password" placeholder='password' value={password} onChange={(e)=>setPassword(e.target.value)}  /><br />
        <input type="password" placeholder='confirm password' value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} /><br />




        <button type='submit'> Rigister </button>
    </form> */}

      <main className="" style={{ marginBottom: 100, marginTop: 50 }}>
        <div className="container">
          {/* Section: Login form */}
          <section className="">
            <div className="row d-flex justify-content-center">
              <div className="col-xl-5 col-md-8">
                <div className="card rounded-5">
                  <div className="card-body p-4">
                    <h3 className="text-center">Register Account</h3>
                    <br />

                    <div className="tab-content">
                      <div
                        className="tab-pane fade show active"
                        id="pills-login"
                        role="tabpanel"
                        aria-labelledby="tab-login"
                      >
                        <form onSubmit={handleRegister}>
                          <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="Full Name">
                              Full Name
                            </label>
                            <input
                              type="text"
                              id="username"
                              placeholder="Full Name"
                              required
                              value={fullName}
                              onChange={(e) => setFullName(e.target.value)}
                              className="form-control"
                            />
                          </div>
                          <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="loginName">
                              Email
                            </label>
                            <input
                              type="email"
                              id="email"
                              placeholder="Email Address"
                              required
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="form-control"
                            />
                          </div>

                          <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="loginName">
                              Mobile Number
                            </label>
                            <input
                              type="text"
                              id="phone"
                              placeholder="Mobile Number"
                              required
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              className="form-control"
                            />
                          </div>
                          <div className="form-outline mb-4">
                            <label
                              className="form-label"
                              htmlFor="loginPassword"
                            >
                              Password
                            </label>
                            <input
                              type="password"
                              id="password"
                              placeholder="Password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              className="form-control"
                            />
                          </div>
                          {/* Password input */}
                          <div className="form-outline mb-4">
                            <label
                              className="form-label"
                              htmlFor="loginPassword"
                            >
                              Confirm Password
                            </label>
                            <input
                              type="password"
                              id="confirm-password"
                              placeholder="Confirm Password"
                              required
                              value={confirmPassword}
                              onChange={(e) =>
                                setConfirmPassword(e.target.value)
                              }
                              className="form-control"
                            />
                          </div>
                          {/* Password Check */}
                          {/* <p className='fw-bold text-danger'>
                                                    {password2 !== password ? 'Passwords do not match' : ''}
                                                </p> */}

                          <button
                            className="btn btn-primary w-100"
                            type="submit"
                            
                          >
                            <span className="mr-2">Sign Up</span>
                            <i className="fas fa-user-plus" />
                          </button>

                          <div className="text-center">
                            <p className="mt-4">
                              Already have an account?{" "}
                              <Link to="/login/">Login</Link>
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
    </>
  );
}

export default Register;
