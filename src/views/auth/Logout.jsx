import { useEffect } from "react";
import { logout } from "../../utils/auth";
import { Link } from "react-router-dom";
import { Toast } from "../../alert/alert";

function Logout() {
  useEffect(() => {
    logout();
    Toast.fire({
      icon: 'success',
      title: 'You have been successfully logged out'
    });
  }, []);

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="text-center p-5 bg-white rounded-4 shadow-lg animate__animated animate__fadeInUp" 
           style={{ maxWidth: '500px', width: '90%' }}>
        <div className="mb-4 position-relative">
          <div className="position-absolute top-0 start-50 translate-middle">
            <div className="bg-primary rounded-circle p-2 d-flex align-items-center justify-content-center"
                 style={{ width: '60px', height: '60px' }}>
              <i className="fas fa-check text-white fs-3"></i>
            </div>
          </div>
          <svg viewBox="0 0 200 60" className="w-100">
            <path 
              d="M20,30 Q50,0 100,30 T180,30" 
              fill="none" 
              stroke="#0d6efd" 
              strokeWidth="2" 
              strokeDasharray="5,3"
            />
          </svg>
        </div>
        
        <h1 className="display-5 fw-bold text-gradient mb-3">Successfully Logged Out</h1>
        <p className="lead text-muted mb-4">
          You've been securely logged out of your account. Come back soon!
        </p>
        
        <div className="d-flex flex-column flex-md-row justify-content-center gap-3 mt-5">
          <Link 
            to="/login" 
            className="btn btn-primary btn-lg px-4 py-3 rounded-pill d-flex align-items-center justify-content-center shadow-sm"
          >
            <i className="fas fa-sign-in-alt me-2"></i>
            Login Again
          </Link>
          
          <Link 
            to="/register" 
            className="btn btn-outline-primary btn-lg px-4 py-3 rounded-pill d-flex align-items-center justify-content-center"
          >
            <i className="fas fa-user-plus me-2"></i>
            Create New Account
          </Link>
        </div>
        
        <div className="mt-5 pt-4 border-top">
          <p className="text-muted small mb-2">Or return to our homepage</p>
          <Link to="/" className="btn btn-link text-decoration-none">
            <i className="fas fa-home me-1"></i> Homepage
          </Link>
        </div>
      </div>
      
      <div className="position-fixed bottom-0 end-0 m-3">
        <div className="d-flex align-items-center bg-white p-2 rounded-pill shadow-sm">
          <div className="spinner-grow text-primary spinner-grow-sm" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <span className="ms-2 small">Secure session ended</span>
        </div>
      </div>
      
      <style jsx>{`
        .text-gradient {
          background: linear-gradient(135deg, #0d6efd, #6610f2);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .animate__animated {
          animation-duration: 0.8s;
        }
        
        .animate__fadeInUp {
          animation-name: fadeInUp;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .btn-primary {
          transition: all 0.3s ease;
          background: linear-gradient(135deg, #0d6efd, #6610f2);
          border: none;
        }
        
        .btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 20px rgba(13, 110, 253, 0.3);
        }
        
        .btn-outline-primary:hover {
          background: linear-gradient(135deg, #0d6efd, #6610f2);
          color: white !important;
        }
      `}</style>
    </div>
  );
}

export default Logout;