import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { FaGoogle } from "react-icons/fa";

const SocialLogin = () => {
    const {googleSignIn} = useContext(AuthContext);

    return (
        <div className='p-4 space-y-3 mb-6'>
        <h2 className="text-center font-bold"> or </h2>
   <button onClick={() => googleSignIn()} className="btn btn-outline w-full"><FaGoogle></FaGoogle> Login with Google </button>
  

    </div>
    );
};

export default SocialLogin;