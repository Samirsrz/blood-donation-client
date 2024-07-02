import { FaArrowTurnUp } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }
    return (
        <div className=" border-t-4">
        <footer className="px-4 py-8 bg-black text-gray-400">
            <div className="container flex flex-wrap items-center justify-center max-w-5xl mx-auto space-y-4 sm:justify-between sm:space-y-0" >
                <div className="flex flex-row pr-3 space-x-4 sm:space-x-8 " >
                    <img  src="https://i.ibb.co/vw5j3pJ/blood-donation-logo.jpg" alt="" className='w-[180px] h-[100px] rounded-full hover:scale-110 transform transition-transform duration-300' />

                    <ul className="flex flex-wrap items-center space-x-4 sm:space-x-8">
                        <li className="hover:underline hover:scale-110 transform transition-transform duration-300">
                            <Link to="/give-fund" rel="noopener noreferrer" >Give Fund</Link>
                        </li>

                        <li onClick={scrollToTop} className="hover:underline hover:scale-110 transform transition-transform duration-300">
                            <Link to={'/'} rel="noopener noreferrer" >Go Top <FaArrowTurnUp className="inline-block text-red-500" />
                            </Link>
                        </li>
                    </ul>
                </div>
                <ul className="flex flex-wrap pl-3 space-x-4 sm:space-x-8">
                    <li className="hover:underline hover:scale-110 transform transition-transform duration-300">
                        <Link to="/" rel="noopener noreferrer" >Join As a Doner</Link>
                    </li>
                    <li className="hover:underline hover:scale-110 transform transition-transform duration-300">
                        <Link to="/blogs" rel="noopener noreferrer" >Blogs</Link>
                    </li>
                    <li className="hover:underline hover:scale-110 transform transition-transform duration-300">
                        <Link to="/contact-us" rel="noopener noreferrer" className=" text-red-500" >Contact Us</Link>
                    </li>
                </ul>
            </div>
            <hr className="mt-5" />
            <div className="pt-5 text-sm text-center text-gray-400" >© 2023 Blood Donation Co. All rights reserved.</div>

        </footer>
    </div >
    );
};

export default Footer;