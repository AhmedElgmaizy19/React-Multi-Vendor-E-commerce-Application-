import{ useState , useEffect} from 'react';
import axiosAuthInstance from '../../config/useAxios';
import { Link } from "react-router-dom";
function Sidebar() {

  const [profile , setProfile] = useState({})

  const getProfile = async()=>{
    try {
      const res = await axiosAuthInstance.get(`customer/Profile/`);
      console.log(res.data)
      setProfile(res.data)
    } catch (error) {
      console.log(error.response?.data)
    }
  }

  useEffect(()=>{
    getProfile()
  },[])

  return (
    <div className="col-lg-3">
          <div className="d-flex justify-content-center align-items-center flex-column mb-4 shadow rounded-3">
            <img
              src={profile.profile_picture}
              style={{ width: 120 }}
              alt=""
            />
            <div className="text-center">
              <h3 className="mb-0">{profile.full_name}</h3>
              <p className="mt-0">
                <Link to={`/customer/settings/`} href="">Edit Account</Link>
              </p>
            </div>
          </div>
          <ol className="list-group">
            <li className="list-group-item d-flex justify-content-between align-items-start">
              <div className="ms-2 me-auto">
                <Link to={"/customer/account"} ><div className="fw-bold">Account</div></Link>
                
              </div>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-start">
              <div className="ms-2 me-auto">
                <Link to={'/customer/orders'}> <div className="fw-bold">Orders</div></Link>
               
              </div>
              
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-start">
              <div className="ms-2 me-auto">
                <Link to={"/customer/wishlist/"}><div className="fw-bold">Wishlist</div></Link>
                
              </div>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-start">
              <div className="ms-2 me-auto">
                <Link to={"/customer/notifications/"}><div className="fw-bold">Notification</div></Link>
              </div>
    
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-start">
              <div className="ms-2 me-auto">
                <Link to={"/customer/settings/"}><div className="fw-bold">Settings</div></Link>
                
              </div>
            </li>
          </ol>
        </div>
  )
}

export default Sidebar