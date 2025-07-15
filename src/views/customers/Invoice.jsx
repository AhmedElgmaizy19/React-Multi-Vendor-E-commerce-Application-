import {useState , useEffect , useRef} from 'react'
import { useParams } from 'react-router-dom'
import axiosAuthInstance from '../../config/useAxios'

// function Invoice() {
//     const [orders , setOrders] = useState({})
//    const [orderItem , setOrderItem] = useState([])

//    const param = useParams()

// const getOrdersDetail = async()=> {
//   try {
//     const res = await axiosAuthInstance.get(`customer/order-detail/${param.order_oid}`);
//     setOrders(res.data)
//     setOrderItem(res.data.order_item)
//     console.log(res.data)
//   } catch (error) {
//     console.log(error.response?.data)
//   }
// }

// useEffect(()=>{
//  getOrdersDetail()
// },[param.order_oid])
//   return (
//     <div>
//     <>
//         <div className="row d-flex justify-content-center p-2">
//             <div className="receipt-main col-xs-10 col-sm-10 col-md-6 col-xs-offset-1 col-sm-offset-1 col-md-offset-3">
//                 <div className="d-flex justify-content-between">
//                     <div className="row">
//                         <div className="receipt-header">
//                             <div className="col-xs-6 col-sm-6 col-md-6">
//                                 <div className="receipt-left">
//                                     <img
//                                         className="img-responsive"
//                                         alt="iamgurdeeposahan"
//                                         src="https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg"
//                                         style={{ width: 71, borderRadius: 43 }}
//                                     />
//                                 </div>
//                             </div>
//                             <div className="col-xs-12 col-sm-12 col-md-12 text-left">
//                                 <div className="receipt-right">
//                                     <h5 className="margin-top-10">
//                                         Desphixs<span className="text-warning">.</span>
//                                     </h5>
//                                     <p>
//                                         <i className="fa fa-phone" /> +1 3649-6589
//                                     </p>
//                                     <p>
//                                         <i className="fa fa-envelope" /> company@gmail.com
//                                     </p>
//                                     <p>
//                                         <i className="fa fa-location-arrow" /> 123 Main Street
//                                     </p>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="row">
//                         <div className="receipt-header receipt-header-mid">
//                             <div className="col-xs-12 col-sm-12 col-md-12 text-left">
//                                 <div className="receipt-right">
//                                     <h5>Customer Details</h5>
//                                     <p>
//                                         <b>
//                                             <i className="fa fa-user" />
//                                         </b>
//                                         Destiny Franks
//                                     </p>
//                                     <p>
//                                         <b>
//                                             <i className="fa fa-envelope" />
//                                         </b>johndoe@gmail.com
//                                     </p>
//                                     <p>
//                                         <b>
//                                             <i className="fa fa-phone" />
//                                         </b>1234567890
//                                     </p>
//                                 </div>
//                             </div>
//                             <br />
//                             <div className="col-xs-12 col-sm-12 col-md-12">
//                                 <div className="receipt-left">
//                                     <h6>
//                                         INVOICE ID #1234567890
//                                     </h6>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 <div>

//                     <table className="table table-bordered">
//                         <thead>
//                             <tr>
//                                 <th>Product</th>
//                                 <th>Price</th>
//                                 <th>Qty</th>
//                                 <th>Sub Total</th>
//                                 <th>Discount</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             <tr>
//                                 <td className="col-md-5">
//                                     Product Name
//                                 </td>
//                                 <td className="col-md-2">
//                                     $0.00
//                                 </td>
//                                 <td className="col-md-2">
//                                     $0.00
//                                 </td>
//                                 <td className="col-md-2">
//                                     $0.00
//                                 </td>
//                                 <td className="col-md-2">
//                                     $0.00
//                                 </td>
//                             </tr>

//                         </tbody>
//                     </table>
//                     <div className="row">
//                         <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 d-flex justify-content-start">

//                         </div>
//                         <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 d-flex justify-content-end">
//                             <div className="receipt-right">
//                                 <h5>Summary</h5>
//                                 <p className="mb-2">
//                                     <b>Sub Total: </b>
//                                     $0.00
//                                 </p>
//                                 <p className="mb-2">
//                                     <b>Shipping: </b>
//                                     $0.00
//                                 </p>
//                                 <p className="mb-2">
//                                     <b>Tax: </b>
//                                     $0.00
//                                 </p>
//                                 <p className="mb-2">
//                                     <b>Service Fee: </b>
//                                     $0.00
//                                 </p>
//                                 <br />
//                                 <p className="mb-2">
//                                     <b>Total: </b>
//                                     $0.00
//                                 </p>

//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 <hr />
//                 <div className="d-flex justify-content-center align-items-center">
//                     <button id="printButton" className="btn btn-dark">
//                         Print <i className="fas fa-print" />
//                     </button>
//                 </div>
//             </div>
//         </div>
//         {/* Print Windows */}
//     </>

// </div>
//   )
// }

// export default Invoice


// Mock API instance for demonstration


function Invoice() {
  const [orders, setOrders] = useState({});
  const [orderItem, setOrderItem] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const invoiceRef = useRef(null);
  const param = useParams();

  const getOrdersDetail = async () => {
    try {
      setIsLoading(true);
      const res = await axiosAuthInstance.get(`customer/order-detail/${param.order_oid}`);
      setOrders(res.data);
      setOrderItem(res.data.order_item);
      setIsLoading(false);
      console.log(res.data);
    } catch (error) {
      console.log(error.response?.data);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getOrdersDetail();
  }, [param.order_oid]);

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Invoice ${orders.order_id}</title>
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #fff; }
            .invoice-container { max-width: 800px; margin: 0 auto; padding: 30px; }
            .company-logo { max-width: 100px; border-radius: 50%; border: 3px solid #6c757d; }
            .invoice-header { border-bottom: 2px solid #e9ecef; padding-bottom: 20px; margin-bottom: 30px; }
            .table th { background-color: #0d6efd; color: white; }
            .summary-card { background-color: #f8f9fa; border-radius: 8px; padding: 20px; }
            .total-row { font-weight: bold; font-size: 1.1rem; border-top: 2px solid #dee2e6; }
            .print-btn { display: none; }
            @media print {
              body { padding: 20px; }
            }
          </style>
        </head>
        <body>
          <div class="invoice-container">
            ${invoiceRef.current.innerHTML}
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '300px' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-10 col-xl-8">
          <div ref={invoiceRef} className="invoice-card shadow-sm p-4 bg-white rounded">
            {/* Header Section */}
            <div className="invoice-header mb-4">
              <div className="row align-items-center">
                <div className="col-md-6">
                  <div className="d-flex align-items-center mb-4 mb-md-0">
                    <img
                      src="https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg"
                      alt="Company Logo"
                      className="company-logo me-4"
                      style={{ width: '80px' }}
                    />
                    <div>
                      <h3 className="fw-bold mb-1">{orders.full_name}<span className="text-warning">.</span></h3>
                      <p className="mb-1"><i className="fas fa-phone me-2"></i>{orders?.mobile}</p>
                      <p className="mb-1"><i className="fas fa-envelope me-2"></i>{orders?.email}</p>
                      <p className="mb-0"><i className="fas fa-location-arrow me-2"></i>{orders?.address}</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="text-md-end">
                    <h1 className="display-5 fw-bold text-primary mb-0">INVOICE</h1>
                    <div className="mt-2">
                      <span className="badge bg-primary fs-6">#{orders?.oid}</span>
                    </div>
                    <p className="text-muted mt-2 mb-0">Date: {orders?.date}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Customer and Company Info */}
            <div className="row mb-4">
              <div className="col-md-6 mb-4 mb-md-0">
                <div className="card border-0 shadow-sm">
                  <div className="card-header bg-primary text-white py-2">
                    <h5 className="mb-0"><i className="fas fa-user me-2"></i>Customer Details</h5>
                  </div>
                  <div className="card-body">
                    <p className="mb-1"><strong>Name:</strong> {orders?.full_name}</p>
                    <p className="mb-1"><strong>Email:</strong> {orders?.email}</p>
                    <p className="mb-0"><strong>Phone:</strong> {orders?.mobile}</p>
                  </div>
                </div>
              </div>
           
            </div>

            {/* Order Items Table */}
            <div className="table-responsive mb-4">
              <table className="table table-bordered table-hover">
                <thead className="table-dark">
                  <tr>
                    <th>Product</th>
                    <th className="text-end">Price</th>
                    <th className="text-center">Qty</th>
                    <th className="text-end">Discount</th>
                    <th className="text-end">Sub Total</th>
                  </tr>
                </thead>
                <tbody>
                  {orderItem.map(item => (
                    <tr key={item.id}>
                      <td>{item.Product.title}</td>
                      <td className="text-end">${item.Product.price}</td>
                      <td className="text-center">{item.quantity}</td>
                      <td className="text-end">${item.saved}</td>
                      <td className="text-end">${item.sub_total}</td>
                    </tr>
                  ))}
               
                </tbody>
              </table>
            </div>

            {/* Summary Section */}
            <div className="row">
              <div className="col-md-6 mb-3 mb-md-0">
                <div className="card border-0 bg-light">
                  
                </div>
              </div>
              <div className="col-md-6">
                <div className="summary-card">
                  <h5 className="mb-3 border-bottom pb-2">Summary</h5>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Sub Total:</span>
                    <span>${orders.sub_total}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Discount:</span>
                    <span className="text-danger">-${orders.saved}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Shipping:</span>
                    <span>${orders.shipping_amount}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Tax:</span>
                    <span>${orders.tax_fee}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Service Fee:</span>
                    <span>${orders.service_fee}</span>
                  </div>
                  <div className="d-flex justify-content-between mt-3 pt-2 border-top fw-bold fs-5">
                    <span>Total:</span>
                    <span>${orders.total}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-4 pt-3 border-top text-center">
              <p className="mb-0 text-muted">
                <i className="fas fa-info-circle me-2"></i>
                Thank you for your business. Payments are due within 15 days of invoice date.
              </p>
            </div>
          </div>

          {/* Print Button */}
          <div className="d-flex justify-content-center mt-4">
            <button 
              className="btn btn-primary btn-lg px-4 py-2 d-flex align-items-center"
              onClick={handlePrint}
            >
              <i className="fas fa-print me-2"></i> Print Invoice
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Invoice;