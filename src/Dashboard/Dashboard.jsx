import { useContext, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";
import useUserRole from "../components/useUserRole";
import DashboardReqts from "../DashboardReqts.jsx/DashboardReqts";
import AdminDashboard from "../AdminDashboard/AdminDashboard";

const Dashboard = () => {
 
  const [open, setOpen] = useState(true);
   const navigate = useNavigate();
   const location = useLocation();
   const {user} = useContext(AuthContext);
   const [userRole] = useUserRole();
  //   console.log(userRole,'user role paisi');
   let Menus = [];

   if (userRole === "admin") {
     Menus = [
       { title: "Dashboard", src: "https://i.ibb.co/pZdfyDq/Chart-fill.png", link: '/dashboard' },
       { title: "All Users", src: "https://i.ibb.co/YRYkB50/teamwork.png", link: 'all-users' },
       { title: "Create Donation Request ", src: "https://i.ibb.co/fXT8SNZ/mobile.png", link: 'create-donation-request' },
       { title: "All Donation Requests", src: "https://i.ibb.co/TrBsKKr/blood-test.png", link: 'my-donation-requests' },
       { title: "Content Management", src: "https://i.ibb.co/7p67xSz/request-for-proposal.png", link: 'content-management' },
       { title: "Create Blog", src: "https://i.ibb.co/MkMS99P/add.png", link: 'create-blog' },
       { title: "User Profile", src: "https://i.ibb.co/rtxGbDn/user.png", gap: true, link: 'profile' },
 
     ];
   }
 
   if (userRole === "volunteer") {
     Menus = [
       { title: "Dashboard", src: "https://i.ibb.co/pZdfyDq/Chart-fill.png", link: '/dashboard' },
       { title: "All Donation Requests", src: "https://i.ibb.co/TrBsKKr/blood-test.png", link: 'my-donation-requests' },
       { title: "Content Management", src: "https://i.ibb.co/7p67xSz/request-for-proposal.png", link: 'content-management' },
       { title: "Create Blog", src: "https://i.ibb.co/MkMS99P/add.png",  link: 'create-blog' },
       { title: "User Profile", src: "https://i.ibb.co/rtxGbDn/user.png", gap: true, link: 'profile' },
 
     ];
   }
 
   if (userRole === "donor") {
     Menus = [
       { title: "Dashboard", src: "https://i.ibb.co/pZdfyDq/Chart-fill.png", link: '/dashboard' },
       { title: "Create Donation Request ", src: "https://i.ibb.co/fXT8SNZ/mobile.png", link: 'create-donation-request' },
       { title: "My Donation Requests", src: "https://i.ibb.co/TrBsKKr/blood-test.png", link: 'my-donation-requests' },
       { title: "User Profile", src: "https://i.ibb.co/rtxGbDn/user.png", gap: true, link: 'profile' },
     ];
   }
 

   console.log(userRole);
 
   const isDashboardActive = location.pathname === `/dashboard`;
         
    return (
        <div className="flex ">
        <div
          className={` ${open ? "w-72" : "w-20 "
            } bg-gray-800  p-5 z-50 pt-8 relative duration-300 h-auto`}
        >
          <img
            src="https://i.ibb.co/TPWHKZL/control.png"
            className={`absolute cursor-pointer -right-3 top-9 w-7 border-red-500
             border-2 rounded-full  ${!open && "rotate-180"}`}
            onClick={() => setOpen(!open)}
          />
          <div onClick={() => navigate('/')} className="flex gap-x-4 items-center">
            <img
              src='https://i.ibb.co/vw5j3pJ/blood-donation-logo.jpg'
              className={`cursor-pointer rounded-full duration-500 ${open && "rotate-[360deg]  w-[80px] h-[80px]"
                }`}
            />
            <h1
              className={`text-white origin-left font-medium text-sm lg:text-lg duration-200 md:block hidden  hover:cursor-pointer ${!open && "scale-0"
                }`}
            >
              Blood Donation
            </h1>
          </div>
          <ul className="pt-6">
            {Menus.map((Menu, index) => (
              <li
                onClick={() => {
                  navigate(`${Menu.link}`);
                }}
                key={index}
                className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
                ${Menu.gap ? "mt-20" : "mt-2"} ${index === 0 && "border border-red-500"}
                ${location.pathname == `/dashboard/${Menu?.link}` ? "bg-red-500" : ""}
                
                `}
              >
  
                <img src={Menu.src} className="h-[20px] w-[20px]" />
                <span className={`${!open && "hidden"} origin-left duration-200`}>
                  {Menu.title}
                </span>
  
  
              </li>
            ))}
          </ul>
        </div>
        <div className=" flex-1 p-7  z-0">
  
          {
            isDashboardActive &&
            <div className="h-screen w-1/2 md:w-full">
              <div className="text-center space-y-5 border border-dashed border-red-500 p-5">
                <h1 className="text-lg md:text-3xl font-semibold ">Welcome <span className="text-red-800">{user?.displayName}</span></h1>
                <p className="font-semibold text-base md:text-xl">
                  "Welcome to our Blood Donation Community! Your decision to be here makes a life-saving impact. Explore, donate, and be a hero today. Together, we make a difference!"</p>
              </div>
              {
                userRole == 'admin' | userRole == 'volunteer' ? <AdminDashboard></AdminDashboard>
                  : <DashboardReqts></DashboardReqts>
              }
  
             
            </div>
          }
          <Outlet></Outlet>
        </div>
      </div>
    );
};

export default Dashboard;