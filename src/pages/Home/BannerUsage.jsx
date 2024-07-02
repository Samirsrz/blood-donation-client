import { FaSearchengin } from "react-icons/fa";
import { FaHeartCirclePlus } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import Buttons from "../../components/Buttons";


const BannerUsage = () => {
  const navigate =  useNavigate();
  
    return (
        <div className="min-h-[200px] border-b-8 border-lime-500">
        <div className="hero min-h-[705px] bg-fixed" style={{ backgroundImage: `url(https://i.ibb.co/8KX2C7W/Blood-Donor-Privileges-Malaysia.png)` }}>
            <div className="hero-overlay bg-black bg-opacity-70"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-md md:max-w-2xl mt-10">
                    <h1 className="mb-5 text-5xl md:text-6xl lg:text-7xl font-bold text-red-500">Be a Lifesaver</h1>
                    <p className="mb-5 text-sm lg:text-xl"> Join Our Blood Donor Community Today! Your commitment can make a world of difference. Register now and become a vital part of our mission to save lives through the gift of blood</p>

                    <div data-aos="zoom-in" className="flex flex-col lg:flex-row gap-5 md:gap-10 items-center mt-10" >
                        
                      <Link to='/signup'>
                      <button className="btn btn-accent font-bold ">Join as a Donor</button>
                      </Link> 
                      <Link to='/searchDonor'>
                      <button className="btn btn-accent bg-red-700 border-none font-bold ">Search Donor</button>
                      </Link> 
                        
                      

                    </div>
                </div>
            </div>
        </div>
    </div>
    );
};

export default BannerUsage;