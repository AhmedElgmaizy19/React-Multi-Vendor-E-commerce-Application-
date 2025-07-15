import { useState, useEffect } from "react";
import {Link , useSearchParams} from 'react-router-dom'
import userCountry from "../plugins/userCountry";
import { Toast } from "../../alert/alert";
import  axiosAuthInstance from '../../config/useAxios'

function Search() {
  const [products, setProducts] = useState([]);
  const [category ,setCategory ] = useState([])
  const [colorValue ,setColorValue ] = useState('no color')
  const [sizeValue ,setSizeValue ] = useState('no size')
  const [quntity , setQuantity] = useState(1)
  const [selectedproduct , setSelectedproduct] = useState(null)
  const [selectedColor , setSelectedColor] = useState(null)
  const [selectedSize , setSelectedSize] = useState(null)
    const [selectedquantity , setSelectedQuantity] = useState(1)

  const handelColorButton = (e, productId , colorName) => {
    setColorValue(colorName)
    setSelectedproduct(productId)

    setSelectedColor((prevSelectedColor)=>({
      ...prevSelectedColor,
      [productId]:colorName
    }))
  
    
  }



  const handelSizeButton = (e, productId , size) => {
    setSizeValue(size)
    setSelectedproduct(productId)

    setSelectedSize((prevSelectedSize)=>({
      ...prevSelectedSize,
      [productId]:size
    }))
 
    
  }


  const handelQuantity = (event, productId) => {
    event.preventDefault();
    setQuantity(event.target.value);
    setSelectedproduct(productId);
    setSelectedQuantity((prevSelectedQty) => ({
      ...prevSelectedQty,
      [productId]: event.target.value
    }));
  }



let country = userCountry();


const addToCart = async (productId , price ,shipping_amount) => {
  let cart_id = localStorage.getItem("cart_id");
  const payload = {
    product_id: productId ,
    cart_id: cart_id,
    price: price,
    quantity: selectedquantity && selectedquantity[productId] ? selectedquantity[productId] : 1,
    shipping_amount: shipping_amount,
    color:selectedColor && selectedColor[productId] ? selectedColor[productId]:'no color',
    size: selectedSize && selectedSize[productId] ? selectedSize[productId]:'no size',
    country: country  || 'USA',
  };


  try {
    const res = await axiosAuthInstance.post(
      `cart/add-to-cart`,
      payload,
    );
     Toast.fire(
        {
          icon:'success',
          title:'Item added to Cart'
        }
      )
      const cartId = res.data.cart_id;

// Store it for future use (e.g., in localStorage)
if (cartId) {
  localStorage.setItem('cart_id', cartId);
}
  } catch (error) {
    // This will show you the exact error from DRF
     Toast.fire(
        {
          icon:'error',
          title:error.response?.data
        }
      )
  }
}

const [searchParam] = useSearchParams()

const query = searchParam.get('query')
  const getProducts = async () => {
    try {
      const res = await  axiosAuthInstance.get(`search/?query=${encodeURIComponent(query)}`);
  
        setProducts(res.data);

    } catch (error) {
      console.log(error.response?.data) ;
    }
  };



  useEffect(() => {
    getProducts();
  }, [query]);

  return (
    <div>
      <h1>Products</h1>
      <main className="mt-5">
        <div className="container">
          <section className="text-center">
              <div className="row">
                {products?.map((product) => (
                  <div className="col-lg-4 col-md-12 mb-4" key={product.id || product.title}>
                    <div className="card">
                      <div
                        className="bg-image hover-zoom ripple"
                        data-mdb-ripple-color="light"
                      >
                        <Link to={`/detail/${product.slug}`} style={{ textDecoration: "none" }}>
                        <img
                          src={product.image}
                          className="w-100"
                          alt={product.title}
                          style={{ width: '100%', height: '300px' }}
                        />
                          </Link>
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
                                backgroundColor: "rgba(251, 251, 251, 0.15)",
                              }}
                            />
                          </div>
                        </a>
                      
                      </div>
                      <div className="card-body">
                        <a href="" className="text-reset">
                          <h5 className="card-title mb-3">{product.title}</h5>
                        </a>
                        <a href="" className="text-reset">
                          <p>{product.category.title}</p>
                        </a>
                        <div className="d-flex justify-content-center">
                          <h6 className="mb-3">${product.price}</h6>
                          <p className="mb-3 ms-2"><strike>${product.old_price}</strike></p>
                        </div>
                        <div className="btn-group">
                          <button
                            className="btn btn-primary dropdown-toggle"
                            type="button"
                            id="dropdownMenuClickable"
                            data-bs-toggle="dropdown"
                            data-bs-auto-close="false"
                            aria-expanded="false"
                          >
                            Variation
                          </button>
                          <ul
                            className="dropdown-menu"
                            aria-labelledby="dropdownMenuClickable"
                          >
                            {/* quantity */}
                             <label className="form-label" htmlFor={`typeNumber-${product.id}`}>
                            <b>Quantity</b>
                          </label>
                          <input
                            type="number"
                            id={`typeNumber-${product.id}`}
                            className="form-control quantity"
                            min={1}
                            onChange={(e)=> handelQuantity(e,product.id) }
                            value={selectedquantity && selectedquantity[product.id]?selectedquantity[product.id]:1}
                          />

                            {/* size */}
                            <div className="d-flex flex-column">
                              <li className="p-1">
                                <b>Size</b>: {selectedSize && selectedSize[product.id] ? selectedSize[product.id]:'no size' }
                              </li>
                              <div className="p-1 mt-0 pt-0 d-flex flex-wrap">
                                {product.size?.length > 0 && (
                                  product?.size.map((size, indx) => (
                                    <li key={size.id || indx}>
                                      <button 
                                      className="btn btn-secondary btn-sm me-2 mb-1"
                                      onClick={(e)=>handelSizeButton(e,product?.id,size.name)}
                                      >
                                        {size.name}
                                      </button>
                                    </li>
                                  ))
                                )}
                               
                               
                              
                              </div>
                            </div>

                              {/* color */}
                            <div className="d-flex flex-column mt-3">
                              <li className="p-1">
                                <b>COlor</b>: {selectedColor && selectedColor[product.id] ? selectedColor[product.id] : 'no color'}

                              </li>
                              <div className="p-1 mt-0 pt-0 d-flex flex-wrap">
                                {product.color?.length > 0 && (
                                  product?.color.map((color, indx) => (
                                    <li key={color.id || indx}>
                                      <button
                                        className="btn btn-sm me-2 mb-1 p-3"
                                        style={{ backgroundColor: color.color_code }}
                                        onClick={(e)=> handelColorButton(e,product.id,color.name)}
                                      />
                                    </li>
                                  ))
                                )}
                               
                              </div>
                            </div>
                                {/* add to cart button */}
                            <div className="d-flex mt-3 p-1">
                              <button
                                type="button"
                                className="btn btn-primary me-1 mb-1"
                                onClick={()=> addToCart(product.id , product.price , product.shipping_amount)}
                              >
                                <i className="fas fa-shopping-cart" />
                              </button>
                              <button
                                type="button"
                                className="btn btn-danger px-3 me-1 mb-1 ms-2"
                                
                              >
                                <i className="fas fa-heart" />
                              </button>
                            </div>
                          </ul>
                          <button
                            type="button"
                            className="btn btn-danger px-3 me-1 ms-2"
                          >
                            <i className="fas fa-heart" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
               
                

                <div className="row">
                  
                {category.map((c) => (
                  <div className="col-lg-2" key={c.id || c.title}>
                    <img
                      src={c.image}
                      style={{
                        width: "100px",
                        height: "100px",
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                      alt={c.title}
                    />
                    <h6>{c.title}</h6>
                  </div>
                ))}

                 
              
                  
                </div>
              </div>
            </section>
            {/*Section: Wishlist*/}

          </div>
        </main>
    </div>
  );
}
export default Search;


