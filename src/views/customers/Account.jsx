import Sidebar from './Sidebar'
import { Link } from "react-router-dom";
function Account() {
  return (
    
<main className="mt-5">
  <div className="container">
    <section className="">
      <div className="row">
       <Sidebar/>
        <div className="col-lg-9 mt-1">
          <main className="mb-5" style={{}}>
            <div className="container px-4">
              <section className=""></section>
              <section className="">
                <div className="row rounded shadow p-3">
  
                  <div className="col-lg-12 mb-4 mb-lg-0 h-100">
                    From your account dashboard. you can easily check &amp;
                    view your orders and manage your account
                    information. Click on the links on the left sidebar to
                    manage your account, orders, wishlist, notifications and profile
                    settings.
                  </div>
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

export default Account