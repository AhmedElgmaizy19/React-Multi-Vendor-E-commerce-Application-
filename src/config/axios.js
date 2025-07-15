import axios from 'axios'
export const BaseURL = 'http://127.0.0.1:8000/api/v1/'
 const axiosInstance = axios.create({
    baseURL : BaseURL,
    timeout:5000,

    headers:{
        "Content-Type":'application/json',
        Accept: 'application/json'
        
    }
})


export default axiosInstance