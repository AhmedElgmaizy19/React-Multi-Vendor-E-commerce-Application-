import {useState , useEffect} from 'react';
import axiosAuthInstance from '../../config/useAxios';
import Sidebar from './Sidebar';
import { Link } from 'react-router-dom';

function Orders() {
const [orders , setOrders] = useState([])

const getOrders = async()=> {
  try {
    const res = await axiosAuthInstance.get(`customer/get-orders/`);
    setOrders(res.data)
    console.log(res.data)
  } catch (error) {
    console.log(error.response?.data)
  }
}

useEffect(()=>{
  getOrders()
},[])


const stautsCounts = orders.reduce((counts,order)=>{
  const status = order.order_status
  counts[status] = (counts[status] || 0) +1
  return counts
},{})


  return (
    <main className="mt-5">
  <div className="container">
    <section className="">
      <div className="row">
        {/* <Sidebar /> */}
          <Sidebar/>
        <div className="col-lg-9 mt-1">
          <main className="mb-5" style={{}}>
            <div className="container px-4">
              <section className="mb-5">
                <h3 className="mb-3">
                  <i className="fas fa-shopping-cart text-primary" /> Orders{" "}
                </h3>
                
                <div className="row gx-xl-5">
                  <div className="col-lg-4 mb-4 mb-lg-0">
                    <div
                      className="rounded shadow"
                      style={{ backgroundColor: "#B2DFDB" }}
                    >
                      <div className="card-body">
                        <div className="d-flex align-items-center">
                          <div className="">
                            <p className="mb-1">Orders</p>
                            <h2 className="mb-0">
                              {orders?.length}
                              <span
                                className=""
                                style={{ fontSize: "0.875rem" }}
                              ></span>
                            </h2>
                          </div>
                          <div className="flex-grow-1 ms-5">
                            <div className="p-3 badge-primary rounded-4">
                              <i
                                className="fas fa-shopping-cart fs-4"
                                style={{ color: "#004D40" }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 mb-4 mb-lg-0">
                    <div
                      className="rounded shadow"
                      style={{ backgroundColor: "#D1C4E9" }}
                    >
                      <div className="card-body">
                        <div className="d-flex align-items-center">
                          <div className="">
                            <p className="mb-1">Pending Delivery</p>
                            <h2 className="mb-0">
                             {stautsCounts?.pending}
                              <span
                                className=""
                                style={{ fontSize: "0.875rem" }}
                              ></span>
                            </h2>
                          </div>
                          <div className="flex-grow-1 ms-5">
                            <div className="p-3 badge-primary rounded-4">
                              <i
                                className="fas fa-clock fs-4"
                                style={{ color: "#6200EA" }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 mb-4 mb-lg-0">
                    <div
                      className="rounded shadow"
                      style={{ backgroundColor: "#BBDEFB" }}
                    >
                      <div className="card-body">
                        <div className="d-flex align-items-center">
                          <div className="">
                            <p className="mb-1">Fulfilled Orders</p>
                            <h2 className="mb-0">
                               {stautsCounts?.fulfilled || 0}
                              <span
                                className=""
                                style={{ fontSize: "0.875rem" }}
                              ></span>
                            </h2>
                          </div>
                          <div className="flex-grow-1 ms-5">
                            <div className="p-3 badge-primary rounded-4">
                              <i
                                className="fas fa-check-circle fs-4"
                                style={{ color: "#01579B" }}
                              />
                            </div>
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
                  <div className="col-lg-12 mb-4 mb-lg-0 h-100">
                    <table className="table align-middle mb-0 bg-white">
                      <thead className="bg-light">
                    
                        <tr>
                          <th>Order ID</th>
                          <th>Payment Status</th>
                          <th>Order Status</th>
                          <th>Total</th>
                          <th>Actions</th>
                          <th>Invoice</th>

                        </tr>
                      </thead>
                      <tbody>
                           {Array.isArray(orders)&&orders.map((order)=>(
                           <tr key={order?.id}>
                          <td>
                            <p className="fw-bold mb-1">#{order?.oid}</p>
                            <p className="text-muted mb-0">
                              {order.date}
                            </p>
                          </td>
                          <td>
                            <p className="fw-normal mb-1">{order?.payment_status}</p>
                          </td>
                          <td>
                            <p className="fw-normal mb-1">{order?.order_status}</p>
                          </td>
                          <td>
                            <span className="fw-normal mb-1">${order?.total}</span>
                          </td>
                          <td>
                            <Link
                              to={`/customer/orders/${order?.oid}/`}
                              className="btn btn-link btn-sm btn-rounded"
                            >
                              View <i className="fas fa-eye" />
                            </Link>

                             
                          </td>

                          <td>
                            <Link
                              to={`/customer/invoices/${order?.oid}/`}
                              className="btn btn-link btn-sm btn-rounded"
                            >
                              Invoice <i className="fas fa-eye" />
                            </Link>
                          </td>
                        </tr>
                     
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <canvas id="myChart" style={{ width: "100%" }} />
                </div>
              </section>
            </div>
          </main>
        </div>
      </div>
    </section>
  </div>
</main>
  )
}

export default Orders