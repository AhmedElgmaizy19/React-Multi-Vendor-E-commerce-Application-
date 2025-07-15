import { useState, useEffect } from "react";
import axiosAuthInstance from "../../config/useAxios";
import Sidebar from "./Sidebar";
import { Toast } from "../../alert/alert";


function Settings() {
  const [userProfile, setUserProfile] = useState({});
  const [loading, setLoading] = useState(false);

const [selectedFile, setSelectedFile] = useState(null);

  const getUserProfile = async () => {
    try {
      setLoading(true);
      const response = await axiosAuthInstance.get(`user/profile/`);
      setUserProfile(response.data);
      console.log(response.data);
    } catch (error) {
      Toast.fire({
        icon: "error",
        title: "Something went wrong",
      });
      console.log(error.response.data);
    }finally{
        setLoading(false);
    }
  };
  
  useEffect(()=>{
    getUserProfile();
  },[])


  const handelInputChange = (e)=>{
     setUserProfile({
        ...userProfile,
        [e.target.name]: e.target.value
     })
  }


const handelImageChange = (e) => {
    setSelectedFile(e.target.files[0]);
};

const handelFormSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    if (selectedFile) {
        formData.append('profile_picture', selectedFile);
    }

    formData.append('full_name', userProfile?.full_name || '');
    formData.append('email', userProfile?.user?.email || '');
    formData.append('phone', userProfile?.user?.phone || '');
    formData.append('address', userProfile?.address || '');
    formData.append('city', userProfile?.city || '');
    formData.append('state', userProfile?.state || '');
    formData.append('country', userProfile?.country || '');

    try {
        setLoading(true);

        const response = await axiosAuthInstance.patch(
            `user/profile/`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        Toast.fire({
            icon: "success",
            title: "Profile updated successfully",
        });

        console.log(response.data);
    } catch (error) {
        Toast.fire({
            icon: "error",
            title: "Something went wrong",
        });
        console.log(error.response?.data);
    } finally {
        setLoading(false);
    }
};





  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <main className="mt-5">
      <div className="container">
        <section className="">
          <div className="row">
            {/* <Sidebar /> */}
            <Sidebar />
            <div className="col-lg-9 mt-1">
              <section className="">
                <main className="mb-5" style={{}}>
                  <div className="container px-4">
                    <section className="">
                      <h3 className="mb-3">
                        {" "}
                        <i className="fas fa-gear fa-spin" /> Settings{" "}
                      </h3>
                      <form enctype="multipart/form-data">
                        <div className="row">
                             <div className="col-lg-12">
                            <label
                              htmlFor="exampleInputEmail1"
                              className="form-label"
                            >
                              profile image
                            </label>
                            <input
                              type = 'file'
                              className="form-control"
                              aria-describedby="emailHelp"
                              name="profile_image"
                              onChange={handelImageChange}
                            />
                          </div>
                          <div className="col-lg-12">
                            <label
                              htmlFor="exampleInputEmail1"
                              className="form-label"
                            >
                              Full Name
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              aria-describedby="emailHelp"
                              value={userProfile?.full_name}
                                name="full_name"
                                onChange={handelInputChange}

                            />
                          </div>
                          <div className="col-lg-6 mt-3">
                            <label
                              htmlFor="exampleInputEmail1"
                              className="form-label"
                            >
                              Email address
                            </label>
                            <input
                              type="email"
                              className="form-control"
                              aria-describedby="emailHelp"
                                value={userProfile?.user?.email}
                                name = 'email'
                                onChange={handelInputChange}
                            />
                          </div>
                          <div className="col-lg-6 mt-3">
                            <label
                              htmlFor="exampleInputEmail1"
                              className="form-label"
                            >
                              Mobile
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              aria-describedby="emailHelp"
                                value={userProfile?.user?.phone}
                                 name="phone"
                                onChange={handelInputChange}
                            />
                          </div>
                        </div>
                        <br />
                        <div className="row">
                          <div className="col-lg-6">
                            <label
                              htmlFor="exampleInputEmail1"
                              className="form-label"
                            >
                              Address
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              aria-describedby="emailHelp"
                                value={userProfile?.address}
                                 name="address"
                                onChange={handelInputChange}
                            />
                          </div>
                          <div className="col-lg-6 mt-3">
                            <label
                              htmlFor="exampleInputEmail1"
                              className="form-label"
                            >
                              City
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              aria-describedby="emailHelp"
                              value={userProfile?.city}
                               name="city"
                                onChange={handelInputChange}
                            />
                          </div>
                          <div className="col-lg-6 mt-3">
                            <label
                              htmlFor="exampleInputEmail1"
                              className="form-label"
                            >
                              State
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              aria-describedby="emailHelp"
                              value={userProfile?.state}
                               name="state"
                                onChange={handelInputChange}
                            />
                          </div>
                          <div className="col-lg-6 mt-3">
                            <label
                              htmlFor="exampleInputEmail1"
                              className="form-label"
                            >
                              Country
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              aria-describedby="emailHelp"
                                value={userProfile?.country}
                                 name="country"
                                onChange={handelInputChange}
                            />
                          </div>
                        </div>
                        <button type="submit" className="btn btn-primary mt-5" onClick={handelFormSubmit}>
                          Save Changes
                        </button>
                      </form>
                    </section>
                  </div>
                </main>
              </section>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Settings;
