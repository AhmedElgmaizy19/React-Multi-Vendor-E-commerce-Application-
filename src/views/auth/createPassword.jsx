import { useState } from "react";
import axiosInstance from "../../config/axios";
import { useSearchParams } from "react-router-dom";
import { Toast } from "../../alert/alert";


function CreatePassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [serachParam] = useSearchParams();
  const otp = serachParam.get("otp");
  const uidb64 = serachParam.get("uidb64");

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      Toast.fire(
        {
          icon:'error',
          title:"Please try again, passwords don't match"
        }
      )
      return;
    }

    try {
      const payload = {
        otp: otp,
        uidb64: uidb64,
        password: password
      };
      const res = await axiosInstance.post("user/password-change/", payload);

      if (res.data){
         Toast.fire(
        {
          icon:'success',
          title:"password sucssesfully changed"
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
    }
  };

  return (
    // <div>

    //     <h1>Create New Passwrd</h1>

    //     <form action="" onSubmit={handelPasswordChange}>
    //         <input type="password" name='password' placeholder='Enter Your New Password'
    //         value={password}
    //         onChange={(e)=>setPassword(e.target.value)}

    //         />
    //         <br />
    //         <br />
    //         <input type="password" name='passwordConfirm' placeholder='Confirm Your New Password'
    //         value={confirmPassword}
    //         onChange={(e)=>setConfirmPassword(e.target.value)}
    //         />
    //         <br />
    //         <br />

    //         <button type='submit'>save your passwword</button>
    //     </form>
    // </div>

    <section>
      <main className="" style={{ marginBottom: 100, marginTop: 50 }}>
        <div className="container">
          <section className="">
            <div className="row d-flex justify-content-center">
              <div className="col-xl-5 col-md-8">
                <div className="card rounded-5">
                  <div className="card-body p-4">
                    <h3 className="text-center">Create New Password</h3>
                    <br />

                    <div className="tab-content">
                      <div
                        className="tab-pane fade show active"
                        id="pills-login"
                        role="tabpanel"
                        aria-labelledby="tab-login"
                      >
                        <form onSubmit={handlePasswordChange}>
                          {/* Email input */}
                          <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="Full Name">
                              Enter New Password
                            </label>
                            <input
                              type="password"
                              id="email"
                              required
                              name="password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              className="form-control"
                            />
                          </div>

                          <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="Full Name">
                              Confirm New Password
                            </label>
                            <input
                              type="password"
                              id="email"
                              required
                              name="confirmPassword"
                              value={confirmPassword}
                              onChange={(e) =>
                                setConfirmPassword(e.target.value)
                              }
                              className="form-control"
                            />
                          </div>

                          <div className="text-center">
                            <button
                              type="submit"
                              className="btn btn-primary w-100"
                            >
                              Reset Password
                            </button>
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
    </section>
  );
}

export default CreatePassword;
