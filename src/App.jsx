import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min'; 
import "@fortawesome/fontawesome-free/css/all.min.css";

import { useEffect } from "react";
import Login from "./views/auth/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import Register from "./views/auth/Register";
import Dashboard from "./views/auth/Dashboard";
import Logout from "./views/auth/Logout";
import ForgetPassword from "./views/auth/forgotPassword";
import CreatePassword from "./views/auth/createPassword";
import StoreHeader from "./views/base/StoreHeader";
import StoreFooter from "./views/base/StoreFooter";
import ProductDetail from "./views/store/ProductDetail";
import Cart from "./views/store/Cart";
import Checkout from "./views/store/Checkout";
import PaymentSuccess from "./views/store/PaymentSuccess";
import Search from "./views/store/Search";
import Account from "./views/customers/Account";
import PrivateRouter from './Layouts/PrivateRouter'
import Wrapper from "./Layouts/Wrapper";
import Orders from "./views/customers/Orders";
import OrderDetail from "./views/customers/OrderDetail";
import Wishlist from "./views/customers/Wishlist";
import CustomerNotifications from "./views/customers/CustomerNotifications";
import Settings from "./views/customers/Settings";
import Invoice from "./views/customers/Invoice";


function App() {
  useEffect(() => {
    document.title = "Quick Buy Store";
  }, []);
  return (
    <BrowserRouter>
      <StoreHeader />

      <Wrapper>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<PrivateRouter><Dashboard/></PrivateRouter>} />

        <Route path="/logout" element={<Logout />} />
        <Route path="/forgot-password" element={<ForgetPassword />} />
        <Route path="/create-new-password" element={<CreatePassword/>} />

        {/* store components */}
        <Route path="/detail/:slug/" element={<ProductDetail />} />
        <Route path="/cart" element={<PrivateRouter><Cart/></PrivateRouter>} />
        <Route path="/checkout/:order_oid/" element={<PrivateRouter><Checkout/></PrivateRouter>} />
        <Route path="/payment-sucsess/:order_oid/" element={<PrivateRouter><PaymentSuccess/></PrivateRouter>} />
        <Route path="/search" element={<Search  />} />

        {/* customer component */}
        <Route path="/customer/account" element={<PrivateRouter><Account/></PrivateRouter>} />
        <Route path="/customer/orders" element={<PrivateRouter><Orders/></PrivateRouter>} />
        <Route path="/customer/orders/:order_oid/" element={<PrivateRouter><OrderDetail/></PrivateRouter>} />
        <Route path="/customer/wishlist/" element={<PrivateRouter><Wishlist/></PrivateRouter>} />
        <Route path="/customer/notifications/" element={<PrivateRouter><CustomerNotifications/></PrivateRouter>} />
        <Route path="/customer/settings/" element={<PrivateRouter><Settings/></PrivateRouter>} />
         <Route path="/customer/invoices/:order_oid" element={<PrivateRouter><Invoice/></PrivateRouter>} />












      </Routes>
      </Wrapper>
      <StoreFooter />
    </BrowserRouter>
  );
}

export default App;
