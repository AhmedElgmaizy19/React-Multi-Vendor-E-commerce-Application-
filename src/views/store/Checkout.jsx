import { useState, useEffect } from "react";
import Cookie from "js-cookie";
import { Toast } from "../../alert/alert";
import userCountry from "../plugins/userCountry";
import Swal from "sweetalert2";
import {useParams } from "react-router-dom";
import  axiosAuthInstance from '../../config/useAxios';


function Checkout() {
  const [order, setOrder] = useState([]);
  const [loading, setLoading] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [couponCode , setCouponCode] = useState('')

  let country = userCountry();
  const param = useParams();

const getCheckOut = async ()=> {
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

  const applyCoupon = async() => {
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

    const data = {
      code: couponCode,
      order_oid: param.order_oid 
    }

    const res = await axiosAuthInstance.post(`coupon/`, data, {
    });


    console.log(res)
      await getCheckOut(); // فقط حدث بيانات الطلب
       Swal.fire({
              icon:'success',
              title:res.data.message,
            })
      setCouponCode(''); // لو عايز تفضي خانة الكوبون بعد التطبيق
  
  } catch (error) {
      Swal.fire({
              icon:'error',
              title:'coupon Invalid',
            })
    console.log(error.response?.data || error.message)
  } finally {
    setLoading(false);
  }
}


const handleStripeCheckout = async () => {
  try {
    const access_token = Cookie.get("access_token");
    if (!access_token) {
      Toast.fire({ icon: "error", title: "Please login first" });
      return;
    }

    // Use POST and send the token in headers
    const res = await axiosAuthInstance.post(
      `stripe-checkout/${order.oid}`
    );

    if (res.data && res.data.checkout_url) {
      setPaymentLoading(true)
      window.location.href = res.data.checkout_url; // Redirect to Stripe
    } else {
      Toast.fire({ icon: "error", title: "Checkout failed" });
    }
  } catch (error) {
    Toast.fire({ icon: "error", title: "Checkout error" });
  }finally{
    setPaymentLoading(false)
  }
};


  useEffect(() => {
    getCheckOut();
  }, [param.order_oid]);

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
    <main className="mb-4 mt-4">
      <div className="container">
        <section className="">
          <div className="row gx-lg-5">
            <div className="col-lg-8 mb-4 mb-md-0">
              <section className="">
                <div className="alert alert-warning">
                  <strong>Review Your Shipping &amp; Order Details </strong>
                </div>
                <div className="card shadow-sm mt-4">
                  <div className="card-body">
                    <h3 className="card-title mb-4">Personal Information</h3>

                    <div className="row mb-3">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">
                          <i className="fas fa-user me-2"></i>Full Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="fullname"
                          value={order?.full_name}
                        />
                      </div>

                      <div className="col-md-6 mb-3">
                        <label className="form-label">
                          <i className="fas fa-envelope me-2"></i>Email
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          name="email"
                          value={order?.email}
                        />
                      </div>

                      <div className="col-md-6 mb-3">
                        <label className="form-label">
                          <i className="fas fa-phone me-2"></i>Mobile
                        </label>
                        <input
                          type="tel"
                          className="form-control"
                          name="mobile"
                          value={order?.mobile}
                        />
                      </div>
                    </div>

                    <h5 className="mb-3">Shipping Address</h5>

                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Address</label>
                        <input
                          type="text"
                          className="form-control"
                          name="address"
                          value={order?.address}
                        />
                      </div>

                      <div className="col-md-6 mb-3">
                        <label className="form-label">City</label>
                        <input
                          type="text"
                          className="form-control"
                          name="city"
                          value={order?.city}
                        />
                      </div>

                      <div className="col-md-6 mb-3">
                        <label className="form-label">State</label>
                        <input
                          type="text"
                          className="form-control"
                          name="state"
                          value={order?.state}
                        />
                      </div>

                      <div className="col-md-6 mb-3">
                        <label className="form-label">Country</label>
                        <input
                          type="text"
                          className="form-control"
                          name="country"
                          value={order?.country}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              {/* Section: Biling details */}
            </div>
            <div className="col-lg-4 mb-4 mb-md-0">
              {/* Section: Summary */}
              <section className="shadow-4 p-4 rounded-5 mb-4">
                <h5 className="mb-3">Order Summary</h5>
                <div className="d-flex justify-content-between mb-3">
                  <span>Subtotal </span>
                  <span>${order?.sub_total}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span>Shipping </span>
                  <span>${order.shipping_amount}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span>Tax </span>
                  <span>${order?.tax_fee}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span>Servive Fee </span>
                  <span>${order?.service_fee}</span>
                </div>
                {order?.saved!=="0.00" &&(
                  <div className="d-flex text-danger justify-content-between">
                  <span>Discount</span>
                  <span>$-{order?.saved}</span>
                </div>
                )}
                
                <hr className="my-4" />
                <div className="d-flex justify-content-between fw-bold mb-5">
                  <span>Total </span>
                  <span>${order?.total}</span>
                </div>
                <h5 className="mb-4">Apply promo code </h5>
                <div className="shadow p-3 d-flex mt-4 mb-4">
                  <input
                    name="couponCode"
                    type="text"
                    className="form-control"
                    style={{ border: "dashed 1px gray" }}
                    placeholder="Enter Coupon Code"
                    id=""
                    onChange={(e)=> setCouponCode(e.target.value)}
                  />
                  <button className="btn btn-success ms-1"
                    onClick={()=> applyCoupon()}
                  >
                    <i className="fas fa-check-circle"></i>
                  </button>
                </div>

                 {paymentLoading === true && 
             
                 <button
                    type="submit"
                    className="btn btn-primary btn-rounded w-100 mt-2"
                    style={{ backgroundColor: "#635BFF" }}
                    onClick={paymentStripe} disabled
                  >
                    Processing ... <i className="fas fa-spinner fa-spin"></i>
                  </button> }
                
                

                {paymentLoading === false && 
                  <button
                    type="submit"
                    className="btn btn-primary btn-rounded w-100 mt-2"
                    style={{ backgroundColor: "#635BFF" }}
                    onClick={handleStripeCheckout}
                  >
                    pay with Stripe <i className="fas fa-credit-card"></i>
                  </button>
                
                } 
                

                {/* <PayPalScriptProvider options={initialOptions}>
                                    <PayPalButtons className='mt-3'
                                        createOrder={(data, actions) => {
                                            return actions.order.create({
                                                purchase_units: [
                                                    {
                                                        amount: {
                                                            currency_code: "USD",
                                                            value: 100
                                                        }
                                                    }
                                                ]
                                            })
                                        }}

                                        onApprove={(data, actions) => {
                                            return actions.order.capture().then((details) => {
                                                const name = details.payer.name.given_name;
                                                const status = details.status;
                                                const payapl_order_id = data.orderID;

                                                console.log(status);
                                                if (status === "COMPLETED") {
                                                    navigate(`/payment-success/${order.oid}/?payapl_order_id=${payapl_order_id}`)
                                                }
                                            })
                                        }}
                                    />
                                </PayPalScriptProvider> */}

                {/* <button type="button" className="btn btn-primary btn-rounded w-100 mt-2">Pay Now (Flutterwave)</button>
                                <button type="button" className="btn btn-primary btn-rounded w-100 mt-2">Pay Now (Paystack)</button>
                                <button type="button" className="btn btn-primary btn-rounded w-100 mt-2">Pay Now (Paypal)</button> */}
              </section>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Checkout;
