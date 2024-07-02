import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../pages/Home/Navbar";
import NavbarUsage from '../pages/Home/NavbarUsage'

const Main = () => {

    const location =  useLocation();
   //   console.log(location);
      const noHeaderFooter = location.pathname.includes('login') || location.pathname.includes('signup')

    return (
        <div>
            
         {noHeaderFooter ||   <NavbarUsage></NavbarUsage>}
         <Outlet></Outlet> 
        </div>
    );
};

export default Main;