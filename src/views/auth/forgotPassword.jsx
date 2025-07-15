import { useState } from "react";
import axiosInstance from "../../config/axios";
import { useNavigate } from "react-router-dom";
function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoding] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoding(true);

    try {
      const { data, error } = await axiosInstance.get(
        `user/password-rest/${email}`
      );
      if (data) {
        alert("email has been sent");
        // navigate('/create-new-password')
      } else if (error) {
        console.log(error.message);
      }
    } catch (error) {
      alert(error);
    } finally {
      setLoding(false);
    }
  };

  return (
    <>
      {/* <h1>forget Password</h1>

      <form action="" onSubmit={handleSubmit}>
        <input type="text" placeholder='Enter Email' value={email} onChange={(e)=>setEmail(e.target.value)} />
        <br />
        <br />
        <button type='submit'> reset</button>
      </form> */}

      <main className="" style={{ marginBottom: 100, marginTop: 50 }}>
        <div className="container">
          {/* Section: Login form */}
          <section className="">
            <div className="row d-flex justify-content-center">
              <div className="col-xl-5 col-md-8">
                <div className="card rounded-5">
                  <div className="card-body p-4">
                    <h3 className="text-center">Forgot Password</h3>
                    <br />

                    <div className="tab-content">
                      <div
                        className="tab-pane fade show active"
                        id="pills-login"
                        role="tabpanel"
                        aria-labelledby="tab-login"
                      >
                        <form action="" onSubmit={handleSubmit}>
                             <div>
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

                          <div className="text-center">
                            <button className="btn btn-primary w-100">
                              Reset Password
                            </button>
                          </div>
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

export default ForgetPassword;
