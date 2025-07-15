import {useState,useEffect} from 'react'
import Sidebar from './Sidebar'
import axiosAuthInstance from '../../config/useAxios'
import { Link, useParams } from 'react-router-dom'


function OrderDetail() {
   const [orders , setOrders] = useState({})
   const [orderItem , setOrderItem] = useState([])

   const param = useParams()

const getOrdersDetail = async()=> {
  try {
    const res = await axiosAuthInstance.get(`customer/order-detail/${param.order_oid}`);
    setOrders(res.data)
    setOrderItem(res.data.order_item)
    console.log(res.data)
  } catch (error) {
    console.log(error.response?.data)
  }
}

useEffect(()=>{
 getOrdersDetail()
},[param.order_oid])
  return (
   <main className="mt-5">
  <div className="container">
    <section className="">
      <div className="row">


        {/* Sidebar Here  */}

        <Sidebar/>
        
        <div className="col-lg-9 mt-1">
          <main className="mb-5">
            {/* Container for demo purpose */}
            <div className="container px-4">
              {/* Section: Summary */}
              <section className="mb-5">
                <h3 className="mb-3">
                  {" "}
                  <i className="fas fa-shopping-cart text-primary" /> #wuriuiwer{" "}
                </h3>
                <div className="row gx-xl-5">
                  <div className="col-lg-3 mb-4 mb-lg-0">
                    <div
                      className="rounded shadow"
                      style={{ backgroundColor: "#B2DFDB" }}
                    >
                      <div className="card-body">
                        <div className="d-flex align-items-center">
                          <div className="">
                            <p className="mb-1">Total</p>
                            <h2 className="mb-0">
                              ${orders?.total}
                              <span
                                className=""
                                style={{ fontSize: "0.875rem" }}
                              ></span>
                            </h2>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 mb-4 mb-lg-0">
                    <div
                      className="rounded shadow"
                      style={{ backgroundColor: "#D1C4E9" }}
                    >
                      <div className="card-body">
                        <div className="d-flex align-items-center">
                          <div className="">
                            <p className="mb-1">Payment Status</p>
                            <h2 className="mb-0">
                              {orders?.payment_status}
                              <span
                                className=""
                                style={{ fontSize: "0.875rem" }}
                              ></span>
                            </h2>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 mb-4 mb-lg-0">
                    <div
                      className="rounded shadow"
                      style={{ backgroundColor: "#BBDEFB" }}
                    >
                      <div className="card-body">
                        <div className="d-flex align-items-center">
                          <div className="">
                            <p className="mb-1">Order Status</p>
                            <h2 className="mb-0">
                              {orders?.order_status}
                              <span
                                className=""
                                style={{ fontSize: "0.875rem" }}
                              ></span>
                            </h2>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 mb-4 mb-lg-0">
                    <div
                      className="rounded shadow"
                      style={{ backgroundColor: "#bbfbeb" }}
                    >
                      <div className="card-body">
                        <div className="d-flex align-items-center">
                          <div className="">
                            <p className="mb-1">Shipping Amount</p>
                            <h2 className="mb-0">
                              ${orders?.shipping_amount}
                              <span
                                className=""
                                style={{ fontSize: "0.875rem" }}
                              ></span>
                            </h2>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 mb-4 mb-lg-0 mt-5">
                    <div
                      className="rounded shadow"
                      style={{ backgroundColor: "#bbf7fb" }}
                    >
                      <div className="card-body">
                        <div className="d-flex align-items-center">
                          <div className="">
                            <p className="mb-1">Tax Fee</p>
                            <h2 className="mb-0">
                              ${orders?.tax_fee}
                              <span
                                className=""
                                style={{ fontSize: "0.875rem" }}
                              ></span>
                            </h2>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 mb-4 mb-lg-0 mt-5">
                    <div
                      className="rounded shadow"
                      style={{ backgroundColor: "#eebbfb" }}
                    >
                      <div className="card-body">
                        <div className="d-flex align-items-center">
                          <div className="">
                            <p className="mb-1">Service Fee</p>
                            <h2 className="mb-0">
                                ${orders?.service_fee}
                              <span
                                className=""
                                style={{ fontSize: "0.875rem" }}
                              ></span>
                            </h2>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 mb-4 mb-lg-0 mt-5">
                    <div
                      className="rounded shadow"
                      style={{ backgroundColor: "#bbc5fb" }}
                    >
                      <div className="card-body">
                        <div className="d-flex align-items-center">
                          <div className="">
                            <p className="mb-1">Discount Fee</p>
                            <h2 className="mb-0 text-danger">
                              $-{orders?.saved}
                              <span
                                className=""
                                style={{ fontSize: "0.875rem" }}
                              ></span>
                            </h2>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              {/* Section: Summary */}
              {/* Section: MSC */}
              <section className="">
                <div className="row rounded shadow p-3">
                  <div className="col-lg-12 mb-4 mb-lg-0">
                    <table className="table align-middle mb-0 bg-white">
                      <thead className="bg-light">
                        <tr>
                          <th>Product</th>
                          <th>Price</th>
                          <th>Qty</th>
                          <th>Total</th>
                        </tr>
                      </thead>
                     
                      <tbody>
                         {orderItem.map((item)=>(
                         <tr key={item?.id}>
                          <td>
                            <div className="d-flex align-items-center">
                              <img
                                src= {item?.Product?.image}
                                style={{ width: 80 }}
                                alt=""
                              />
                              <p className="text-muted mb-0">
                                13th December 2024
                              </p>
                            </div>
                          </td>
                          <td>
                            <p className="fw-normal mb-1">${item?.Product?.price}</p>
                          </td>
                          <td>
                            <p className="fw-normal mb-1">{item?.quantity}</p>
                          </td>
                          <td>
                            <span className="fw-normal mb-1">${item?.total}</span>
                          </td>
                        </tr>
                      ))}
                        
                       
                        
                  
                       
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>
            </div>
          </main>
        </div>
      </div>
    </section>
    {/*Section: Wishlist*/}
  </div>
</main>
  )
}

export default OrderDetail