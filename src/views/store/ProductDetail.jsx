import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosAuthInstance from "../../config/useAxios";
import userCountry from "../plugins/userCountry";
import Cookie from "js-cookie";
import { Toast } from "../../alert/alert";
import {
  FaStar,
  FaShoppingCart,
  FaHeart,
  FaChevronRight,
  FaTruck,
  FaShieldAlt,
  FaUndo,
} from "react-icons/fa";
import { FiMinus, FiPlus } from "react-icons/fi";

function ProductDetail() {
  const [ProductDetail, setProudctDetail] = useState({});
  const [size, setSize] = useState([]);
  const [color, setColor] = useState([]);
  const [colorValue, setColorValue] = useState("no color");
  const [sizeValue, setSizeValue] = useState("no size");
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [review, setReview] = useState({});
  const [showModal,setShowModal] = useState(false)
  const [reviewText , setReviewText] = useState('')
  const [ratingValue, setRatingValue ] = useState(0)

  let param = useParams();
  let country = userCountry();

  const getProudctDetail = async () => {
    try {
      const { data, status } = await axiosAuthInstance.get(
        `products/${param.slug}/`
      );
      if (status === 200) {
        setProudctDetail(data);
        setSize(data.size || []);
        setColor(data.color || []);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProudctDetail();
  }, [param.slug]);

  const handelcolor = (event, colorName) => {
    event.preventDefault();
    setColorValue(colorName);
  };

  const handelSize = (event, sizeName) => {
    event.preventDefault();
    setSizeValue(sizeName);
  };

  const handelQuantityChange = (event) => {
    event.preventDefault();
    const value = Math.max(1, parseInt(event.target.value) || 1);
    setQuantity(value);
  };

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const addToCart = async () => {
    let cart_id = localStorage.getItem("cart_id");
    const payload = {
      product_id: ProductDetail?.id,
      cart_id: cart_id,
      price: ProductDetail?.price,
      quantity: quantity,
      shipping_amount: ProductDetail?.shipping_amount,
      color: colorValue,
      size: sizeValue,
      country: country || "USA",
    };

    let access_token = Cookie.get("access_token");
    if (!access_token) {
      Toast.fire({
        icon: "error",
        title: "Please login first",
      });
      return;
    }

    try {
      const res = await axiosAuthInstance.post(`cart/add-to-cart`, payload);

      Toast.fire({
        icon: "success",
        title: "Item added to Cart",
      });

      const cartId = res.data.cart_id;
      if (cartId) {
        localStorage.setItem("cart_id", cartId);
      }
    } catch (error) {
      console.log(error.response?.data);
      Toast.fire({
        icon: "error",
        title: error.response?.data || "An error occurred",
      });
    }
  };

  const getReview = async () => {
    try {
      if (ProductDetail != null) {
        const res = await axiosAuthInstance.get(
          `review/get-review/${ProductDetail?.id}`
        );
        if (res.status == 200) {
          setReview(res.data);
        }
      }
    } catch (error) {
      Toast.fire({
        icon: "error",
        title: error.response?.data || "An error occurred",
      });
    }
  };

  const addToWishlist = async (productId) => {
  const payload = {
   product_id: productId,
  }

  try {
    const res = await axiosAuthInstance.post(`customer/wishlist/`, payload);
    Toast.fire({
      icon: "success",
      title: res.data.message,
    });
  } catch (error) {
    Toast.fire({
      icon: "error",
      title: "Something went wrong",
    });
    console.log(error.response.data);
  }
}


  useEffect(() => {
    if (ProductDetail?.id) {
      getReview();
    }
  }, [ProductDetail?.id]);

  const createReview = async (rating, review) => {
    let access_token = Cookie.get("access_token");
    if (!access_token) {
      Toast.fire({
        icon: "error",
        title: "Please login first",
      });
      return;
    }

    const paylodData = {
      product_id: ProductDetail?.id,
      rating: rating,
      review: review,
    };

    try {
      const res = await axiosAuthInstance.post(
        `review/create-review/`,
        paylodData
      );
      Toast.fire({
        icon: "success",
        title: res.data.message,
      });
    } catch (error) {
      Toast.fire({
        icon: "error",
        title:"An error occurred",
      });
    }
  };

  const handelSubmitReview = async (e)=>{
    e.preventDefault()
    await createReview(ratingValue,reviewText)
    setShowModal(false)
    setReviewText('')
    setRatingValue(0)
    getReview()
  }

  // Get all images including main and gallery
  const allImages = [
    ProductDetail?.image,
    ...(ProductDetail?.gallery?.map((g) => g.image) || []),
  ];

  const getAverageRating = () => {
    if (!Array.isArray(review) || review.length === 0) return 0;
    const sum = review.reduce((acc, r) => acc + (r.rating || 0), 0);
    return sum / review.length;
  };

  const averageRating = getAverageRating();

  // if (loading) {
  //   return (
  //     <div className="d-flex justify-content-center align-items-center vh-100">
  //       <div className="spinner-border text-primary" role="status">
  //         <span className="visually-hidden">Loading...</span>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="bg-light min-vh-100">
      <div className="container py-5">
        <nav aria-label="breadcrumb" className="mb-4">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/">Home</a>
            </li>
            <li className="breadcrumb-item">
              <a href={`/category/${ProductDetail?.category?.slug}`}>
                {ProductDetail?.category?.title}
              </a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {ProductDetail.title}
            </li>
          </ol>
        </nav>

        <div className="row g-5">
          {/* Product Images */}
          <div className="col-lg-6">
            <div className="card border-0 shadow-sm rounded-4 overflow-hidden mb-4">
              <div className="ratio ratio-1x1 bg-light">
                <img
                  src={allImages[activeImageIndex]}
                  className="img-fluid p-4 object-contain"
                  alt={ProductDetail.title}
                  style={{ maxHeight: "500px" }}
                />
              </div>
            </div>

            <div className="d-flex flex-wrap gap-2">
              {allImages.map((img, index) => (
                <button
                  key={index}
                  className={`btn p-0 border rounded-3 ${
                    activeImageIndex === index ? "border-primary border-2" : ""
                  }`}
                  onClick={() => setActiveImageIndex(index)}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${index + 1}`}
                    style={{
                      width: "80px",
                      height: "80px",
                      objectFit: "cover",
                    }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="col-lg-6">
            <div className="card border-0 shadow-sm rounded-4 p-4 mb-4">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <h1 className="fw-bold mb-0">{ProductDetail.title}</h1>
                <button onClick={()=> addToWishlist(ProductDetail?.id)} className="btn btn-outline-danger">
                  <FaHeart />
                </button>
              </div>

              <div className="d-flex align-items-center mb-3">
                <div className="d-flex text-warning me-3">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="me-1" />
                  ))}
                </div>
                <span className="text-muted">(42 reviews)</span>
              </div>

              <div className="d-flex align-items-center mb-4">
                <h2 className="text-primary fw-bold mb-0 me-3">
                  ${ProductDetail.price}
                </h2>
                {ProductDetail.old_price && (
                  <s className="text-muted">${ProductDetail.old_price}</s>
                )}
              </div>

              <p className="text-muted mb-4">{ProductDetail.description}</p>

              <div className="mb-4">
                <h6 className="fw-bold mb-3">Product Details</h6>
                <div className="row">
                  <div className="col-md-6 mb-2">
                    <span className="text-muted">Category:</span>
                    <span className="fw-bold ms-2">
                      {ProductDetail.category?.title}
                    </span>
                  </div>
                  <div className="col-md-6 mb-2">
                    <span className="text-muted">Shipping:</span>
                    <span className="fw-bold ms-2">
                      ${ProductDetail.shipping_amount}
                    </span>
                  </div>
                </div>
              </div>

              {/* Variations */}
              <div className="mb-4">
                {/* Quantity */}
                <div className="mb-4">
                  <h6 className="fw-bold mb-2">Quantity</h6>
                  <div className="d-flex align-items-center">
                    <button
                      className="btn btn-outline-secondary p-2"
                      onClick={decrementQuantity}
                      disabled={quantity <= 1}
                    >
                      <FiMinus />
                    </button>
                    <input
                      type="number"
                      className="form-control text-center mx-2"
                      min={1}
                      value={quantity}
                      onChange={handelQuantityChange}
                      style={{ maxWidth: "70px" }}
                    />
                    <button
                      className="btn btn-outline-secondary p-2"
                      onClick={incrementQuantity}
                    >
                      <FiPlus />
                    </button>
                  </div>
                </div>

                {/* Size */}
                {size.length > 0 && (
                  <div className="mb-3">
                    <h6 className="fw-bold mb-2">Size: {sizeValue}</h6>
                    <div className="d-flex flex-wrap gap-2">
                      {size.map((s) => (
                        <button
                          key={s.id}
                          className={`btn btn-outline-secondary ${
                            sizeValue === s.name ? "btn-primary text-white" : ""
                          }`}
                          onClick={(e) => handelSize(e, s.name)}
                        >
                          {s.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Colors */}
                {color.length > 0 && (
                  <div className="mb-3">
                    <h6 className="fw-bold mb-2">Color: {colorValue}</h6>
                    <div className="d-flex flex-wrap gap-2">
                      {color.map((c) => (
                        <button
                          key={c.id}
                          className={`btn p-3 rounded-circle border ${
                            colorValue === c.name
                              ? "border-primary border-2"
                              : ""
                          }`}
                          style={{ backgroundColor: c.color_code }}
                          title={c.name}
                          onClick={(e) => handelcolor(e, c.name)}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="d-grid gap-3">
                <button
                  className="btn btn-primary btn-lg py-3"
                  onClick={addToCart}
                >
                  <FaShoppingCart className="me-2" /> Add to Cart
                </button>
              </div>
            </div>

            {/* Product Features */}
            <div className="row g-3 mb-4">
              <div className="col-md-6">
                <div className="card border-0 shadow-sm rounded-4 h-100 p-3 text-center">
                  <FaTruck className="text-primary fs-1 mb-3" />
                  <h6 className="fw-bold">Free Shipping</h6>
                  <p className="text-muted small mb-0">On orders over $50</p>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card border-0 shadow-sm rounded-4 h-100 p-3 text-center">
                  <FaShieldAlt className="text-primary fs-1 mb-3" />
                  <h6 className="fw-bold">Secure Payment</h6>
                  <p className="text-muted small mb-0">
                    100% protected payments
                  </p>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card border-0 shadow-sm rounded-4 h-100 p-3 text-center">
                  <FaUndo className="text-primary fs-1 mb-3" />
                  <h6 className="fw-bold">Easy Returns</h6>
                  <p className="text-muted small mb-0">
                    30-day money back guarantee
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Tabs */}
        <div className="mt-5">
          <ul className="nav nav-tabs mb-4" id="productTabs" role="tablist">
            <li className="nav-item" role="presentation">
              <button
                className="nav-link active"
                id="specs-tab"
                data-bs-toggle="tab"
                data-bs-target="#specs"
                type="button"
                role="tab"
              >
                Specifications
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="vendor-tab"
                data-bs-toggle="tab"
                data-bs-target="#vendor"
                type="button"
                role="tab"
              >
                Vendor
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="reviews-tab"
                data-bs-toggle="tab"
                data-bs-target="#reviews"
                type="button"
                role="tab"
              >
                Reviews ({review.length})
              </button>
            </li>
          </ul>

          <div className="tab-content" id="productTabsContent">
            <div
              className="tab-pane fade show active"
              id="specs"
              role="tabpanel"
            >
              <div className="card border-0 shadow-sm rounded-4">
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-borderless">
                      <tbody>
                        <tr>
                          <th className="text-muted w-25">Category</th>
                          <td>{ProductDetail.category?.title}</td>
                        </tr>

                        {Array.isArray(ProductDetail.specification) &&
                          ProductDetail.specification.map((s) => (
                            <tr key={s.id}>
                              <th className="text-muted">{s.title}</th>
                              <td>{s.content}</td>
                            </tr>
                          ))}

                        <tr>
                          <th className="text-muted">Colors</th>
                          <td>{color.map((c) => c.name).join(", ")}</td>
                        </tr>
                        <tr>
                          <th className="text-muted">Size</th>
                          <td>{size.map((s) => s.name).join(", ")}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            <div className="tab-pane fade" id="vendor" role="tabpanel">
              <div className="card border-0 shadow-sm rounded-4">
                <div className="card-body">
                  <div className="card mb-3 border-0">
                    <div className="row g-0">
                      <div className="col-md-4">
                        <img
                          src="https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250"
                          className="img-fluid rounded-4"
                          alt="Vendor"
                          style={{
                            height: "150px",
                            width: "150px",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                      <div className="col-md-8">
                        <div className="card-body">
                          <h5 className="card-title fw-bold">Vendor Name</h5>
                          <p className="card-text">
                            Vendor description and details would go here.
                          </p>
                          <div className="d-flex text-warning mb-2">
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStar />
                          </div>
                          <p className="card-text">
                            <small className="text-muted">
                              Member since 2020
                            </small>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="tab-pane fade" id="reviews" role="tabpanel">
              <div className="card border-0 shadow-sm rounded-4">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                      <h5 className="fw-bold mb-0">Customer Reviews</h5>
                      <div className="d-flex align-items-center mt-2">
                        <div className="d-flex text-warning me-2">
                          {[...Array(Math.round(averageRating))].map((_, i) => (
                            <FaStar key={i} />
                          ))}
                          {[...Array(5 - Math.round(averageRating))].map(
                            (_, i) => (
                              <FaStar key={i + 10} style={{ color: "#ccc" }} />
                            )
                          )}
                        </div>
                        <span>{averageRating.toFixed(1)} out of 5</span>
                      </div>
                    </div>
                    <button className="btn btn-primary"onClick={()=>setShowModal(true)} >Write a Review</button>
                    {showModal && (
        <div
          className="modal fade show"
          style={{
            display: "block",
            background: "rgba(0,0,0,0.5)",
          }}
          tabIndex="-1"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <form onSubmit={handelSubmitReview}>
                <div className="modal-header">
                  <h5 className="modal-title">Write a Review</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowModal(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Your Rating</label>
                    <div>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <FaStar
                          key={star}
                          size={24}
                          style={{ cursor: "pointer", marginRight: 4 }}
                          color={star <= ratingValue ? "#ffc107" : "#e4e5e9"}
                          onClick={() => setRatingValue(star)}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Your Review</label>
                    <textarea
                      className="form-control"
                      rows={4}
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                      required
                    ></textarea>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Submit Review
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
                  </div>

                  <div className="border-top pt-4">
                    {Array.isArray(review) &&
                      review.map((r) => (
                        <div className="d-flex mb-5" key={r?.id}>
                          <div className="flex-shrink-0">
                            <div
                              className="rounded-circle bg-light d-flex align-items-center justify-content-center"
                              style={{ width: "50px", height: "50px" }}
                            >
                              <img
                                src={r.profile.profile_picture}
                                alt=""
                                className="img-fluid"
                              />
                            </div>
                          </div>
                          <div className="flex-grow-1 ms-3">
                            <div className="d-flex justify-content-between">
                              <h6 className="fw-bold mb-0">
                                {r.profile.full_name}
                              </h6>
                              <small className="text-muted">{r.date}</small>
                            </div>
                            <div className="d-flex text-warning mb-2">
                              {[...Array(r.rating)].map((_, i) => (
                                <FaStar key={i} />
                              ))}
                              {[...Array(5 - r.rating)].map((_, i) => (
                                <FaStar
                                  key={i + r.rating}
                                  style={{ color: "#ccc" }}
                                />
                              ))}
                            </div>
                            <p className="mb-0">{r.review}</p>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
