import { useState , useEffect } from "react";
import axiosAuthInstance from "../../config/useAxios";
import {  useParams } from "react-router-dom";
import  Cookie from 'js-cookie'
import Swal from "sweetalert2";

function PaymentSuccess() {
    const [order , setOrder] = useState([])
    const [loading , setLoading] = useState(false)
    const [status , setStatus] = useState('')

    const param = useParams()
    const urlParam = new URLSearchParams(window.location.search)
    const session_id = urlParam.get('session_id')


    

    const getCheckOut = async () => {
    let access_token =  Cookie.get('access_token')

    
    try {
      setLoading(true);
      if (!access_token) {
        Toast.fire({
          icon: "error",
          title: "please login first",
        });
        setLoading(false);
        return;
      }
      const res = await axiosAuthInstance.get(`checkout/${param.order_oid}`);


    setOrder(res.data);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "something went wrong",
      });
    } finally {
      setLoading(false);
    }
  }

  useEffect(()=>{
    getCheckOut()
  },[param.order_oid])

    const succsessCheckout = async ()=> {
        const paylod = {
          'order_oid' : param.order_oid,
          'session_id': session_id 
        }
        try {
            const res = await axiosAuthInstance.post(`stripe-checkout/checkout-success/${param.order_oid}`,paylod)
            
            const message = res.data.message;
           console.log(message)
        if (message === 'payment successful') {
            setStatus('payment successful')
        } else if (message === 'already paid') {
            setStatus('already paid')
        } else if (message === 'your Invoice is UnPaid') {
            setStatus('your Invoice is UnPaid')
        } else {
            setStatus('An Error Occurred. Try Again')
        }

        } catch (error) {
             Swal.fire({
             icon: "error",
            title: "something went wrong",
      });

        }finally{
          setLoading(false)
        }
    }

    useEffect(()=>{
      if (session_id && param.order_oid) {
       succsessCheckout();
    }
    },[session_id, param.order_oid])







  return (
    <div>
      <main className="mb-4 mt-4 h-100">
        <div className="container">
          {/* Section: Checkout form */}
          <section className="">
            <div className="gx-lg-5">
              <div className="row pb50">
                <div className="col-lg-12">
                  <div className="dashboard_title_area">
                    <h4 className="fw-bold text-center mb-4 mt-4">
                      Checkout Successfull <i className="fas fa-check-circle" />{" "}
                    </h4>
                    {/* <p class="para">Lorem ipsum dolor sit amet, consectetur.</p> */}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-xl-12">
                  <div className="application_statics">
                    <div className="account_user_deails dashboard_page">
                      <div className="d-flex justify-content-center align-items-center">
                        <div className="col-lg-12">
                          <div className="border border-3 border-success" />
                          <div className="card bg-white shadow p-5">
                            <div className="mb-4 text-center">
                              <i
                                className="fas fa-check-circle text-success"
                                style={{ fontSize: 100, color: "green" }}
                              />
                            </div>
                            <div className="text-center">
                              <h1>Thank You !</h1>
                              <p>
                                Your checkout was successfull, we have sent the
                                order detail to your email{" "}
                              </p>
                              <button
                                className="btn btn-success mt-3"
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal"
                              >
                                View Order <i className="fas fa-eye" />{" "}
                              </button>
                              <a href="/" className="btn btn-primary mt-3 ms-2">
                                Download Invoice{" "}
                                <i className="fas fa-file-invoice" />{" "}
                              </a>
                              <a className="btn btn-secondary mt-3 ms-2">
                                Go Home <i className="fas fa-fa-arrow-left" />{" "}
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Order Summary
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <div className="modal-body text-start text-black p-4">
                <h5
                  className="modal-title text-uppercase "
                  id="exampleModalLabel"
                >
                  {order?.full_name}
                </h5>
                <h6>{order?.email}</h6>
                <h6 className="mb-5">{order?.address}</h6>
                <p className="mb-0" style={{ color: "#35558a" }}>
                  Payment summary
                </p>
                <hr
                  className="mt-2 mb-4"
                  style={{
                    height: 0,
                    backgroundColor: "transparent",
                    opacity: ".75",
                    borderTop: "2px dashed #9e9e9e",
                  }}
                />


                {order.order_item?.map((item, idx) => (
                  <div className="d-flex justify-content-between" key={idx}>
                    <p className="fw-bold mb-0">Product Name</p>
                    <p className="text-muted mb-0">{item?.Product?.title}</p>
                  </div>
                ))}
                
                

                <div className="d-flex justify-content-between">
                  <p className="fw-bold mb-0">Subtotal</p>
                  <p className="text-muted mb-0">${order?.sub_total}</p>
                </div>
                <div className="d-flex justify-content-between">
                  <p className="small mb-0">Shipping Fee</p>
                  <p className="small mb-0">${order?.shipping_amount}</p>
                </div>
                <div className="d-flex justify-content-between">
                  <p className="small mb-0">Service Fee</p>
                  <p className="small mb-0">${order?.service_fee}</p>
                </div>
                <div className="d-flex justify-content-between">
                  <p className="small mb-0">Tax</p>
                  <p className="small mb-0">${order?.tax_fee}</p>
                </div>
                <div className="d-flex justify-content-between">
                  <p className="small mb-0">Discount</p>
                  <p className="small mb-0">-{order?.saved}</p>
                </div>
                <div className="d-flex justify-content-between mt-4">
                  <p className="fw-bold">Total</p>
                  <p className="fw-bold" style={{ color: "#35558a" }}>
                    ${order?.total}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentSuccess;
