import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import SearchDonor from "../pages/SearchDonor";
import PrivateRoute from "../Providers/PrivateRoute";
import DonationRequests from "../assets/donationRequests/DonationRequests";
import DonationDetails from "../components/DonationDetails";
import Dashboard from "../Dashboard/Dashboard";
import AdminRoute from "../Providers/AdminRoute";
import AllUsers from "../AllUsers/AllUsers";
import CreateDonationReq from "../CreateDonation/CreateDonationReq";
import MyDonationRequests from "../DashboardReqts.jsx/MyDonationRequests";
import Blogs from "../Blogs/Blogs";
import ContentManagement from "../Dashboard/ContentManagement";
import AddBlog from "../components/AddBlog";
import CreateBlogs from "../Dashboard/CreateBlogs";
import UserProfile from "../Dashboard/UserProfile";
import UpdateDonationInfo from "../components/UpdateDonationInfo";
import GiveFund from "../pages/GiveFund";

  
 export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
            path:'/',
            element: <Home></Home>
        },
        {
            path:'/login',
            element:<Login></Login>
        },
        {
           path:'/donation-requests',
           element: <PrivateRoute><DonationRequests></DonationRequests></PrivateRoute>
        },
        {
            path:'/signup',
            element:<SignUp></SignUp>
        },
        {
          path:'/searchDonor',
          element:<SearchDonor></SearchDonor>
        },
        {
          path: '/blogs',
          element:<Blogs></Blogs>
        },
 
         {
          path: '/give-fund',
          element: <PrivateRoute><GiveFund></GiveFund></PrivateRoute>
         }



      ]
    },



   {
    path:'donation-details/:id',
    element: <PrivateRoute><DonationDetails></DonationDetails></PrivateRoute>
   },

    {
      path: 'update-donation-info/:id',
      element: <PrivateRoute>
      <UpdateDonationInfo></UpdateDonationInfo>  
      </PrivateRoute>,
      loader: async ({params}) => await fetch(`https://blood-donation-server-two-ochre.vercel.app/donation-details/${params.id}`)
    }, 
   
   
    {
      path:'/dashboard',
      element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
      children: [

      {
        path:'all-users',
        element:<PrivateRoute><AdminRoute>
          <AllUsers></AllUsers>
          </AdminRoute></PrivateRoute>
      },

      {
        path: 'create-donation-request',
        element: <CreateDonationReq></CreateDonationReq>
      },

      {
        path:'my-donation-requests',
        element: <MyDonationRequests></MyDonationRequests>
      },

       {
        path:  'content-management',
        element: <ContentManagement></ContentManagement>
       },

       {
        path: 'content-management/add-blog',
        element: <AddBlog></AddBlog>
       },

       {
        path :'create-blog',
        element: <CreateBlogs></CreateBlogs>
       },

       {
         path:'profile',
         element: <UserProfile></UserProfile>
       }


      ]
 
    }



  ]);