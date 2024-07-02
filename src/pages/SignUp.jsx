import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaBan, FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosPublic from "../hooks/useAxiosPublic";
import imageUpload from "../hooks/imageUpload";
import { ImSpinner9 } from "react-icons/im";
import SelectOptions from "../hooks/SelectOptions";
import Lottie from "lottie-react";
import bloodDonateAnimation from '../assets/animations/bloodPressureAnimation.json'
const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY; 
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`


const SignUp = () => {
  
    const {createUser, updateUserProfile, loading} = useContext(AuthContext);

    const axiosPublic = useAxiosPublic();
    const [districts,setDistricts] = useState([]);
    const [upazilas, setUpazilas] = useState([]);
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [filteredUpazilas, setFilteredUpazilas] = useState([]);
    const [selectedUpazila, setSelectedUpazila] = useState('');

    //district data load
    useEffect(() => {
      fetch('/districts.json')
      .then(res => res.json())
      .then(data => setDistricts(data))

    },[])

    //upazilas data load
    useEffect(() => {

      fetch('/upazilas.json')
      .then(res => res.json())
      .then(data => setUpazilas(data))
    }, [])

     //filter selected district upazilas
     useEffect(() => {
      const filteredUpazilas = upazilas.filter(upazila => upazila.district_id === selectedDistrict);
      setFilteredUpazilas(filteredUpazilas);

     },[selectedDistrict,upazilas])

    const [registerError,  setRegisterError] = useState('')
  
    const [success, setSuccess] = useState('')
      
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state || "/";
    
   const handleRegister = async (e) =>{
     
        e.preventDefault();
     //   console.log(e.currentTarget);
        const form = new FormData(e.currentTarget);
        const name = form.get('name');
        const img = e.target.photo.files[0];
        const imageData = await imageUpload(img);

        const photo = imageData?.data?.display_url;
        const email = form.get('email');
        const password = form.get('password');
        const confirmPassword = form.get('confirmPassword');
        const bloodGroup = form.get('bloodGroup');
        const district = form.get('district');
        const upazila = form.get('upazila');
          

     //   console.log(name,photo,email,password);


       setRegisterError('');
       setSuccess('');
      //create USer

        if(password.length<6){
          setRegisterError('Password should be of 6 or more characters');
          return;
        }

         if(!/[a-z]/.test(password)){
          setRegisterError('Your password should contain at least one Lowercase character');
          return;
        }
        if (!bloodGroup || !district || !upazila) {
          setRegisterError("Please fill the form properly.")
          return
      }
      if (password !== confirmPassword) {
          setRegisterError("Confirm Password is not matching")
          return
      }


      createUser(email,password)
      .then(async (res) => {
        
      
        setSuccess('User Created Successfully');
           const currentUser = {

            name,
            email,
            role: 'donor',
            status: 'active',
            photo, bloodGroup,
            district: districts.find(district => district.id === selectedDistrict)?.name,
            upazila: upazilas.find(upazila => upazila.id === selectedUpazila)?.name

           }
       
           const {data} = axiosPublic.post('/user-info', currentUser)
  //         console.log('response ', data);
          

          return updateUserProfile(name,photo)
       
        
      })
      .then(() => {
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "User created successfully",
            showConfirmButton: false,
            timer: 1500
          });
          navigate(from)
      })
      .catch(error => {
   //     console.log(error);
        setRegisterError(error.message);
        Swal.fire({
            position: "top-end",
            icon: "error",
            title: "Fill the Form Correctly!",
            showConfirmButton: false,
            timer: 1500
        });
      })

    }
 
    return (
      <div className="hero -mt-12 min-h-[900px] overflow-x-hidden" style={{ backgroundImage: 'url(https://i.ibb.co/bryRbkv/nguy-n-hi-p-2r-NHli-X6-XHk-unsplash.jpg)' }}>
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
          <div className="max-w-6xl flex items-center ">
              <div className="hidden md:block">
              <Lottie animationData={bloodDonateAnimation} className='h-96 w-96'></Lottie>
              </div>

              <div className="w-full max-w-xl p-4 rounded-md shadow sm:p-8 bg-gray-400 text-gray-100" >
                  <h2 className="mb-3 text-3xl font-semibold text-center">Register Your Account</h2>
                  <p className="text-sm text-center text-gray-400 hover:scale-110 transform transition-transform duration-300">Already have account?
                      <Link to='/login' rel="noopener noreferrer" className="focus:underline hover:underline ml-5 text-red-500 text-xl">Login here</Link>
                  </p>
                  <form onSubmit={handleRegister} action="" className="space-y-8 mt-10">
                      <div className="space-y-4" >
                          <div className='flex gap-5'>
                              <div className="space-y-2 flex-1" >
                                  <label className="block text-sm text-left">Your name</label>
                                  <input required type="text" name="name" id="name" placeholder="your name" className="w-full px-3 py-3 border rounded-md border-red-500 bg-gray-800 text-gray-100 focus:border-violet-400" />
                              </div>
                              <div className="space-y-2 flex-1" >

                                  <label className="block text-sm text-left">Upload Profile Image*</label>
                                  <input type="file" id="img" name="photo" accept="image/*" className="file-input file-input-bordered w-full bg-gray-800 border-red-500" required />
                              </div>
                          </div>
                          <div className='flex gap-5'>
                              <div className="space-y-2 flex-1" >
                                  <label className="block text-sm text-left">Email address</label>
                                  <input required type="email" name="email" id="email" placeholder="xyz@gmail.com" className="w-full px-3 py-3 border rounded-md border-red-500 bg-gray-800 text-gray-100 focus:border-violet-400" />
                              </div>


           <div className="space-y-2 flex-1" >
             <div className="flex justify-between" >
                                      <label className="text-sm">Blood Group*</label>
                                  </div>
                                  <select name="bloodGroup" className="select select-error w-full px-3 py-2 border rounded-md border-red-500 bg-gray-800 text-gray-100" required>
                                      <option disabled selected>Select Your Blood Group</option>
                                      <option>A+</option>
                                      <option>A-</option>
                                      <option>B+</option>
                                      <option>B-</option>
                                      <option>AB+</option>
                                      <option>AB-</option>
                                      <option>O+</option>
                                      <option>O-</option>
                                  </select>
                              </div>
                          </div>
                          <div className='flex gap-5'>

                              <div className="space-y-2 flex-1">
                                  <div className="flex justify-between">
                                      <label className="text-sm">District*</label>
                                  </div>
                                  <select
                                      name="district"
                                      value={selectedDistrict}
                                      onChange={(e) => {
                                          setSelectedDistrict(e.target.value);
                                      }}

                                      required
                                      className="select select-error w-full px-3 py-2 border rounded-md border-red-500 bg-gray-800 text-gray-100 "
                                  >
                                      <option disabled value="">Select Your District</option>
                                      {districts.map((district) => (
                                          <SelectOptions key={district?.id} district={district}></SelectOptions>
                                      ))}
                                  </select>
                              </div>



                              <div className="space-y-2 flex-1">
                                  <div className="flex justify-between">
                                      <label className="text-sm">Upazila*</label>
                                  </div>
                                  <select
                                      name="upazila"
                                      value={selectedUpazila}
                                      onChange={(e) => {
                                          setSelectedUpazila(e.target.value);
                                      }}
                                      required
                                      className="select select-error w-full px-3 py-2 border rounded-md bg-gray-800 text-gray-100 "
                                  >
                                      <option disabled value="">Select Your Upazila</option>
                                      {filteredUpazilas.map((upazila) => (
                                          <option key={upazila?.id} value={upazila.id}>
                                              {upazila.name}
                                          </option>
                                      ))}
                                  </select>
                              </div>
                          </div>
                      </div>

                      <div className='flex gap-5'>
                          <div className="space-y-2 flex-1" >
                              <div className="flex justify-between" >
                                  <label name="password" className="text-sm">Password</label>
                              </div>
                              <input required type="password" name="password" id="password" placeholder="*****" className="w-full px-3 py-2 border rounded-md border-red-500 bg-gray-800 text-gray-100 focus:border-violet-400" />
                          </div>
                          <div className="space-y-2 flex-1" >
                              <div className="flex justify-between" >
                                  <label name="confirmPassword" className="text-sm">Confirm Password*</label>
                              </div>
                              <input required type="password" name="confirmPassword" id="password" placeholder="*****" className="w-full px-3 py-2 border rounded-md border-red-500 bg-gray-800 text-gray-100 focus:border-violet-400" />
                          </div>
                      </div>


                      {
                          registerError && <div className='text-red-500 flex items-center justify-center gap-2'><FaBan /> {registerError}</div>
                      }

                      <button type="submit" className="w-full px-8 py-3 font-semibold rounded-md bg-red-800 hover:scale-105 transform transition-transform duration-300 hover:bg-red-500 text-white">
                          {
                              loading ? <ImSpinner9 className='mx-auto animate-spin text-xl'></ImSpinner9> :
                                  'Register'
                          }
                      </button>



                      <div>
                          <h3 className='text-yellow-300'>For Demo Login, please visit login page</h3>
                      </div>
                  </form>
              </div>
          </div>
      </div>
  </div>
    );
};

export default SignUp;