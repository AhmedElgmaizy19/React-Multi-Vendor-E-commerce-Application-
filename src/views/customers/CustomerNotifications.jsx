import {useState , useEffect} from 'react'
import axiosAuthInstance from '../../config/useAxios'
import { Toast } from "../../alert/alert";
import Sidebar from './Sidebar'
import moment from 'moment'

function CustomerNotifications() {
    const [notifications, setNotifications] = useState([])
    const [loading, setLoading] = useState(false);

    const getNotifications = async () => {
        try {
            setLoading(true);
            const res = await axiosAuthInstance.get(`customer/notifications/`);
            setNotifications(res.data);
        } catch (error) {
            Toast.fire({
                icon: "error",
                title: "Something went wrong",
            });
            console.log(error.response.data);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getNotifications();
    }, []);

    
    const MarkNotificationAsSeen = async (notificationId) => {
        try {
            const res = await axiosAuthInstance.get(`customer/mark-notification/${notificationId}`);
            Toast.fire({
                icon: "success",
                title: res.data.message
            });
            getNotifications(); // Refresh notifications after marking as seen
        } catch (error) {
            Toast.fire({
                icon: "error",
                title: "Something went wrong",
            });
            console.log(error.response.data);
        }
    };

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
    <main className="mt-5">
  <div className="container">
    <section className="">
      <div className="row">
        {/* Sidebar Here */}
        <Sidebar/>
        <div className="col-lg-9 mt-1">
          <section className="">
            <main className="mb-5" style={{}}>
              <div className="container px-4">
                <section className="">
                  <h3 className="mb-3">
                    <i className="fas fa-bell" /> Notifications{" "}
                  </h3>
                  <div className="list-group">
                    { notifications.map((noti)=>(
                          <a
                      href="#"
                      className="list-group-item list-group-item-action "
                      aria-current="true"
                    >
                      <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-1">order confirmed</h5>
                        <small>{moment(noti.date).format("MMM D,Y")}</small>
                      </div>
                      <p className="mb-1">
                       your order  has been confirmed
                      </p>
                      <button onClick={()=> MarkNotificationAsSeen(noti?.id)} className='btn btn-success mt-3'> <i className='fas fa-eye'></i></button>
                    </a>
                    ))}
                  
                   {notifications.length<1 && <h1 className= 'p-4'> No Notifications yet</h1>}
                  </div>
                </section>
              </div>
            </main>
          </section>
        </div>
      </div>
    </section>
  </div>
</main>
  )
}

export default CustomerNotifications