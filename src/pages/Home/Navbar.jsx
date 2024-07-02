import { Link } from "react-router-dom";
import { FaDonate, FaUser } from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import Swal from "sweetalert2";
const Navbar = () => {

    const {user,logOut} = useContext(AuthContext);
  const navlinks = <>
     <li> <Link to='/'>Home</Link> </li> 
     <li> <Link to='/donationRequest'><FaDonate></FaDonate></Link></li>
     <li> <Link to='/blogs'>Blogs</Link></li>
     
      
      {
        !user ? <>
        <li> <Link to='/login'>Login</Link></li> 
        </> : <> </>
      }

  </>

   const handleLogout = () => {
    logOut()
    .then(() => {
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "User logged out successfully",
            showConfirmButton: false,
            timer: 1500
          });
    })
    .catch(error => {
    //  console.log(error)
    })

   }

    return (
        <div className="navbar lg:w-[1770px] fixed z-10  mx-auto bg-black  text-white">
  <div className="navbar-start  flex-1">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </div>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1]  shadow bg-base-100 rounded-box w-52">
       {
        navlinks
       }
      </ul>
    </div>
    <Link to='/' className="btn  btn-ghost text-xl">daisyUI</Link>
    </div>
    <div className="navbar-center hidden flex-1 lg:flex">
    <ul className="menu menu-horizontal px-1">
    {
        navlinks
       }
    </ul>
  </div>
  <div className="flex-none">
    
   <div className="dropdown flex-1 dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 p-2 items-center justify-center text-center rounded-full">
         {
            user? 
            
             <img className="rounded-full w-[70px]"  alt="Tailwind CSS Navbar component" src={user.photoURL} /> :  <div className="w-10 p-2 items-center justify-center text-center rounded-full"><FaUser></FaUser></div>
           
         }
        </div>
      </div>
      <ul tabIndex={0} className="menu menu-sm text-black dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
        <li>
          <a className="justify-between">
            Profile
            <span className="badge">New</span>
          </a>
        </li>
        <li><a>Settings</a></li>
        {
            user? <><li onClick={handleLogout}><a>Logout</a></li> </> : <></>
        }
      </ul>
    </div>
  </div>
</div>
    );
};

export default Navbar;