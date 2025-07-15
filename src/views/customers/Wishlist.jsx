import { useState, useEffect, use } from "react";
import axiosAuthInstance from "../../config/useAxios";
import Sidebar from "./Sidebar";
import { Toast } from "../../alert/alert";
import {Link }from "react-router-dom";
function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);

  const getWishlistItems = async () => {
    try {
      setLoading(true);
      const res = await axiosAuthInstance.get(`customer/wishlist/`);
      console.log(res.data);
      setWishlist(res.data);
    } catch (error) {
      Toast.fire({
        icon: "error",
        title: "some thing went wrong",
      });
      console.log(error.response.data);
    } finally {
      setLoading(false);
    }
  };

  

  useEffect(() => {
    getWishlistItems();
  }, []);

  const addToWishlist = async (productId) => {
  const payload = {
   product_id: productId,
  }

  try {
    const res = await axiosAuthInstance.post(`customer/wishlist/`, payload);
   await getWishlistItems(); 
    Toast.fire({
      icon: "success",
      title: res.data.message,
    });
  } catch (error) {
    Toast.fire({
      icon: "error",
      title: "Something went wrong",
    });
  }
}

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
            {/* Sidebar Here */}
            <Sidebar />

            <div className="col-lg-9 mt-1">
              <section className="">
                <main className="mb-5" style={{}}>
                  <div className="container">
                    <section className="">
                      <div className="row">
                        <h3 className="mb-3">
                          <i className="fas fa-heart text-danger" /> Wishlist
                        </h3>
                        {wishlist.length>0 ? wishlist.map((item)=>(
                            <div className="col-lg-4 col-md-12 mb-4">
                          <div className="card">
                            <div
                              className="bg-image hover-zoom ripple"
                              data-mdb-ripple-color="light"
                            >
                              <img
                                src= {item.product?.image}
                                className="w-100"
                                style={{
                                  width: "100px",
                                  height: "300px",
                                  objectFit: "cover",
                                }}
                              />
                              <a href="#!">
                                <div className="mask">
                                  <div className="d-flex justify-content-start align-items-end h-100">
                                    <h5>
                                      <span className="badge badge-primary ms-2">
                                        New
                                      </span>
                                    </h5>
                                  </div>
                                </div>
                                <div className="hover-overlay">
                                  <div
                                    className="mask"
                                    style={{
                                      backgroundColor:
                                        "rgba(251, 251, 251, 0.15)",
                                    }}
                                  />
                                </div>
                              </a>
                            </div>
                            <div className="card-body">
                            <Link  to={`/detail/${item.product?.slug}/`}  className="text-reset">
                                <h6 className="card-title mb-3 ">
                                 {item.product?.title}
                                </h6>
                              </Link>
                              <h6 className="mb-3">${item.product?.price}</h6>

                              <button
                                type="button"
                                className="btn btn-danger px-3 me-1 mb-1"
                                onClick={() => addToWishlist(item.product?.id)}
                              >
                                <i className="fas fa-heart" />
                              </button>
                            </div>
                          </div>
                        </div>
                        )): <h6 className="container">Your wishlist is Empty </h6>}
                        

                        {/* Show This if there are no item in wishlist */}
                       
                      </div>
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

export default Wishlist;
