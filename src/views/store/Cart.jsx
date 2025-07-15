import { Link } from "react-router-dom";
import axiosAuthInstance from "../../config/useAxios";
import Cookie from "js-cookie";
import { Toast } from "../../alert/alert";
import { useEffect, useState } from "react";
import userCountry from "../plugins/userCountry";
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";

function Cart() {
  const [cart, setCart] = useState([]);
  const [cartDetails, setCartDetails] = useState([]);
  const [quantityChange, setQuantitychange] = useState({});
  const [loading, setLoading] = useState(false);
  const [fullName , setFullName] = useState('')
  const [email , setEmail] = useState('')
  const [mobile , setMobile] = useState('') 
  const [address , setAdress] = useState('')
  const [city , setCity] = useState('')
  const [state , setState] = useState('')
  const [countrys , setCountrys] = useState('')
  const navigate = useNavigate()
  

  let country = userCountry();

  async function getCart() {
    try {
      setLoading(true);
      let access_token = Cookie.get("access_token");
      if (!access_token) {
        Toast.fire({
          icon: "error",
          title: "please login first",
        });
        setLoading(false);
        return;
      }
      const res = await axiosAuthInstance.get(`cart/cart-list`, {

      });

      if (res.status == 200) {
        setCart(res.data);
      }

    } catch (error) {
      Toast.fire({
        icon: "error",
        title: "something went wrong",
      });
    } finally {
      setLoading(false);
    }
  }

async function cartTotal() {
  try {
    let access_token = Cookie.get("access_token");
    if (!access_token) return;
    
    const res = await axiosAuthInstance.get(`cart/cart-total`, {
     
    });

    if (res.status === 200) {
      setCartDetails(res.data.totals || []); // Fallback to empty array
    }
      
  } catch (error) {
    if (error.response?.data?.totals?.length === 0) {
      setCartDetails([]); // Explicitly set empty cart
      
    } else if (error.response?.status !== 404) {
    // فقط في حالة وجود خطأ آخر غير السلة الفارغة
    Toast.fire({
      icon: "error",
      title: "Failed to load cart details",
    });
  }
  }
}
  const getItemKey = (item) => {
    return `${item.product.id}_${item.size}_${item.color}`;
  };

  const handelProudctQuantity = (event, item) => {
    const quantity = event.target.value;
    const key = getItemKey(item);

    setQuantitychange((prevQuantiy) => ({
      ...prevQuantiy,
      [key]: quantity,
    }));
  };


const updateCard = async (item,cart_id)=> {
  const key = getItemKey(item)
  const qtyValue = quantityChange[key] || item.quantity
  const payload = {
    product_id: item?.product?.id,
    cart_id:cart_id,
    price: item?.price,
    quantity: qtyValue,
    shipping_amount: item?.shipping_amount,
    color: item.color,
    size: item.size,
    country: country || 'USA',
  };

 
  let access_token = Cookie.get('access_token');
   if (!access_token){
       Toast.fire(
        {
          icon:'error',
          title:'please login first'
        }
      )
      return;
    }

  try {
    const res = await axiosAuthInstance.post(`cart/add-to-cart`, payload,
      
       {
    headers: {
      Authorization: `Bearer ${access_token }`,
    },
  }
    );

    if (res.status === 201) {
        Toast.fire({
          icon: "success",
          title: "Cart updated successfully",
        });
        // Refresh cart data
        await getCart();
        await cartTotal();
      }

    }catch(error){
       Toast.fire(
        {
          icon:'error',
          title:  "An error occurred"
        }
      )
    }

  
}


const handelCartDelete =  async(item_id,cart_id) => {
  try {
      setLoading(true);
      let access_token = Cookie.get("access_token");
      if (!access_token) {
        Toast.fire({
          icon: "error",
          title: "please login first",
        });
        setLoading(false);
        return;
      }

      const res = await axiosAuthInstance.delete(`cart/delete-cart/${item_id}`,
       {
  
        data:{
          cart_id : cart_id
        }
      });
      
     
          await getCart()
          await cartTotal()
        Toast.fire({
        icon: "success",
        title: "Item deleted sucsessfuly",
      });

         

  

  } catch (error) {
    Toast.fire({
        icon: "error",
        title: "something went erorr",
      });
  }finally{
    setLoading(false)
  }
  
  console.log('deleted')
}


const handelChange = (event)=> {
  const {name , value} = event.target
  console.log(value)
  switch (name) {
    case 'fullname':
      setFullName(value)
      break;

    case 'email':
      setEmail(value)
      break;

    case 'mobile':
      setMobile(value)
      break;

    case 'address':
      setAdress(value)
      break;

    case 'city':
      setCity(value)
      break;

    case 'state':
      setState(value)
      break;

    case 'country':
      setCountrys(value);
      break;
    
    
  }
}

const cart_id = cart.map((item)=>{
  return item?.cart_id
})


  const cartOrder = async () => {
    if (!fullName || !email|| !mobile|| !address|| !state|| !city|| !countrys){
      Swal.fire({
        icon:'warning',
        title:'missing fields',
        text:'all fields are required'
      })
      return
    }
    const data = {
      cart_id : cart_id[0],
      full_name:fullName,
      email:email,
      mobile:mobile,
      address:address,
      state :state,
      city:city,
      country:countrys
    }

    try {
      let access_token = Cookie.get("access_token");
      setLoading(true);
      if (!access_token) {
        Toast.fire({
          icon: "error",
          title: "please login first",
        });
        setLoading(false);
        return;
      }

      const res = await axiosAuthInstance.post('cart-order/',data , {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })

      navigate(`/checkout/${res.data.order_oid}`)
    } catch (error) {
       Toast.fire({
          icon: "error",
          title: "some thing went wrong",
        });
    }finally{
      setLoading(false)
    }
 
  }

  useEffect(() => {
    getCart();
    cartTotal();
  }, []);


  useEffect(() => {
  if (cart && cart.length === 0) {
    setCartDetails([]); // Clear cart totals
  }
}, [cart]);

  useEffect(() => {
    if (cart) {
      const initialQuantity = {};
      cart.forEach((item) => {
        const key = getItemKey(item);
        initialQuantity[key] = item.quantity;
      });
      setQuantitychange(initialQuantity);
    }
  }, [cart]);





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
    <div className="container py-4">
      <h1 className="mb-4">Your Shopping Cart</h1>
      
      <div className="row">
        <div className="col-lg-8 mb-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h2 className="card-title mb-4">Cart Items</h2>
              
              {Array.isArray(cart) && cart.length > 0 ? (
                cart.map((item) => {
                  const itemKey = getItemKey(item);
                  const displayQuantity = quantityChange[itemKey] !== undefined 
                    ? quantityChange[itemKey] 
                    : item.quantity;
                  
                  return (
                    <div className="row border-bottom py-3" key={itemKey}>
                      <div className="col-md-2 mb-3 mb-md-0">
                        <Link to={`/product/${item.product.id}`}>
                          <img
                            src={item?.product?.image}
                            className="img-fluid rounded"
                            alt={item.product.title}
                            style={{
                              width: "100px",
                              height: "100px",
                              objectFit: "cover",
                            }}
                          />
                        </Link>
                      </div>
                      
                      <div className="col-md-6 mb-3 mb-md-0">
                        <h5 className="mb-2">
                          <Link to={`/product/${item.product.id}`} className="text-dark">
                            {item?.product?.title}
                          </Link>
                        </h5>
                        
                        {item.size !== "no size" && (
                          <p className="mb-1">
                            <span className="text-muted me-2">Size:</span>
                            <span className="badge bg-secondary">{item.size}</span>
                          </p>
                        )}

                        {item.color !== "no color" && (
                          <p className="mb-1">
                            <span className="text-muted me-2">Color:</span>
                            <span 
                              className="d-inline-block rounded-circle"
                              style={{
                                width: "20px",
                                height: "20px",
                                backgroundColor: item.color,
                                border: "1px solid #ddd"
                              }}
                              title={item.color}
                            ></span>
                          </p>
                        )}

                        <p className="mb-1">
                          <span className="text-muted me-2">Price:</span>
                          <span>${item.price}</span>
                        </p>
                        
                        <div className="mt-3">
                          <button className="btn btn-sm btn-outline-danger"
                            onClick={()=>handelCartDelete(item?.id , item?.cart_id)}
                          >

                            <i className="fas fa-trash me-2" />
                            Remove
                          </button>
                        </div>
                      </div>
                      
                      <div className="col-md-4 d-flex flex-column align-items-end">
                        <div className="d-flex align-items-center mb-3">
                          <div className="me-2">
                            <label className="form-label mb-0"><small>Quantity</small></label>
                            <input
                              type="number"
                              className="form-control"
                              style={{ width: '80px' }}
                              value={displayQuantity}
                              onChange={(e) => handelProudctQuantity(e, item)}
                              min={1}
                            />
                          </div>
                          <button 
                            onClick={() =>updateCard(item,item?.cart_id)}
                            className="btn btn-sm btn-primary mt-3"
                            title="Update quantity"
                          >
                            <i className="fas fa-sync"></i>
                          </button>
                        </div>
                        
                        <div className="mt-auto">
                          <h5 className="mb-0">${item.sub_total}</h5>
                        </div>
                      </div>
                    </div>
                  );
                })


                
              ) : (
                <div className="text-center py-5">
                  <i className="fas fa-shopping-cart fa-3x text-muted mb-3"></i>
                  <h4>Your Cart Is Empty</h4>
                  <p className="text-muted mb-4">Add some items to get started</p>
                  <Link to="/" className="btn btn-primary">
                    <i className="fas fa-arrow-left me-2"></i> Continue Shopping
                  </Link>
                </div>
              )}
            </div>
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
                   onChange={handelChange}
                   name="fullname"
                   value={fullName}
                    />
                </div>
                
                <div className="col-md-6 mb-3">
                  <label className="form-label">
                    <i className="fas fa-envelope me-2"></i>Email
                  </label>
                  <input type="email" className="form-control"
                  onChange={handelChange}
                   name="email"
                   value={email}
                  />
                </div>
                
                <div className="col-md-6 mb-3">
                  <label className="form-label">
                    <i className="fas fa-phone me-2"></i>Mobile
                  </label>
                  <input type="tel" className="form-control"
                  onChange={handelChange}
                   name="mobile"
                   value={mobile}
                  />
                </div>
              </div>
              
              <h5 className="mb-3">Shipping Address</h5>
              
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Address</label>
                  <input type="text" className="form-control" 
                  onChange={handelChange}
                   name="address"
                   value={address}
                  />
                </div>
                
                <div className="col-md-6 mb-3">
                  <label className="form-label">City</label>
                  <input type="text" className="form-control"
                  onChange={handelChange}
                   name="city"
                   value={city}
                  />
                </div>
                
                <div className="col-md-6 mb-3">
                  <label className="form-label">State</label>
                  <input type="text" className="form-control"
                  onChange={handelChange}
                   name="state"
                   value={state}
                  />
                </div>
                
                <div className="col-md-6 mb-3">
                  <label className="form-label">Country</label>
                  <input type="text" className="form-control"
                  onChange={handelChange}
                   name="country"
                   value={countrys}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-lg-4">
          <div className="card shadow-sm sticky-top" style={{top: '20px'}}>
            <div className="card-body">
              <h3 className="card-title mb-4">Order Summary</h3>
              
              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal</span>
                <span>${cartDetails?.sub_total || 0}</span>
              </div>
              
              <div className="d-flex justify-content-between mb-2">
                <span>Shipping</span>
                <span>${cartDetails?.shipping || 0}</span>
              </div>
              
              <div className="d-flex justify-content-between mb-2">
                <span>Tax</span>
                <span>${cartDetails?.tax || 0}</span>
              </div>
              
              <div className="d-flex justify-content-between mb-2">
                <span>Service Fee</span>
                <span>${cartDetails?.service_fee || 0}</span>
              </div>
              
              <hr className="my-3" />
              
              <div className="d-flex justify-content-between fw-bold fs-5 mb-4">
                <span>Total</span>
                <span>${cartDetails?.total || 0}</span>
              </div>
              
              <button className="btn btn-primary w-100 py-3"
              onClick={()=> cartOrder()}
              >
                Proceed to Checkout
              </button>
              
              <div className="mt-4 text-center">
                <div className="d-flex align-items-center justify-content-center mb-2">
                  <i className="fas fa-shield-alt text-success me-2"></i>
                  <small>Secure Payment</small>
                </div>
                
                <div className="d-flex align-items-center justify-content-center">
                  <i className="fas fa-undo text-info me-2"></i>
                  <small>30-Day Money-Back Guarantee</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;