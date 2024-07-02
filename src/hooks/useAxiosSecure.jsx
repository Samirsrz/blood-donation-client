import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { useNavigate } from "react-router-dom";
const axiosSecure = axios.create({

    baseURL:'https://blood-donation-server-two-ochre.vercel.app',
     withCredentials: true,
})
const useAxiosSecure = () => {
    
    const {logout} = useContext(AuthContext)
     const navigate = useNavigate();
    
     axiosSecure.interceptors.response.use(
        response => response,
        async error => {
        //    console.log('Error tracked in the interceptor', error.response)
            if (
                error.response &&
                (error.response.status === 401 || error.response.status === 403)
            ) {
                await logout();
                navigate('/login');
            }

            return Promise.reject(error)
        }
    )
    return axiosSecure
};

export default useAxiosSecure;