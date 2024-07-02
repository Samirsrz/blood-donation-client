import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import useAxiosSecure from "../hooks/useAxiosSecure";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { ImSpinner9 } from "react-icons/im";
import SelectOptions from "../hooks/SelectOptions";
import { FaFilePen } from "react-icons/fa6";
import imageUpload from "../hooks/imageUpload";

const UserProfile = () => {

   const {user, loading} = useContext(AuthContext);
   const [userInfo, setUserInfo] = useState([]);
   const axiosSecure = useAxiosSecure();

   useEffect(() => {
       axiosSecure.get(`/user/${user?.email}`)
       .then(({data}) => setUserInfo(data))

   },[user?.email,axiosSecure])

   const [districts, setDistricts] = useState([]);
   const [upazilas, setUpazilas] = useState([]);

   const [selectedDistrict, setSelectedDistrict] = useState('');
   const [filteredUpazilas, setFilteredUpazilas] = useState([]);
   const [selectedUpazila, setSelectedUpazila] = useState('');

   useEffect(() => {
    fetch('/districts.json')
        .then(res => res.json())
        .then(data => setDistricts(data))
}, [])

// upazilas data load
    useEffect(() => {
     fetch('/upazilas.json')
        .then(res => res.json())
        .then(data => setUpazilas(data))
   }, [])


  // filter selected district upazilas
  useEffect(() => {
    const filteredUpazilas = upazilas.filter(upazila => upazila.district_id === selectedDistrict);
    setFilteredUpazilas(filteredUpazilas);
}, [selectedDistrict, upazilas]);


const { data: updatedUserInfo, refetch } = useQuery({
    queryKey: ['updaetdUserInfo'],
    queryFn: async () => {
        const res = await axiosSecure.get(`/user/${user?.email}`);
        return res.data;
    }
})

const handleUpdate = async (e) => {
    e.preventDefault();

    const form = new FormData(e.currentTarget);
    const name = form.get('name');

    //image uploading using hosting side (imgbb api)
    const img = e.target.img.files[0]
    let photo = userInfo?.photo
    if (img) {
        const imageData = await imageUpload(img)
        //    console.log(imageData.data.display_url);
     photo = imageData?.data?.display_url
    }

    const bloodGroup = form.get('bloodGroup');

    const updatedInfo = {
        name,
        photo
        , bloodGroup,
        district: districts.find(district => district.id === selectedDistrict)?.name,
        upazila: upazilas.find(upazila => upazila.id === selectedUpazila)?.name
    }
    // console.log(updatedInfo);




    await axiosSecure.put(`/update-user-info/${user?.email}`, updatedInfo)
        .then(({ data }) => {
            if (data?.modifiedCount > 0) {
                document.getElementById('my_modal_5').close();
                refetch();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Profile Updated Successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
            }

        })
        .catch((error) => {
            // Show error toast if update fails
            document.getElementById('my_modal_5').close();
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Failed to update profile",
                showConfirmButton: false,
                timer: 1500
            });

        });
}



    return (
        <div className=" h-screen">
            <div className="flex flex-col justify-center h-full p-6  shadow-md rounded-xl sm:px-12 bg-gray-900 text-gray-100">
                <img src={userInfo?.photo} alt="" className="w-32 h-32 mx-auto rounded-full bg-gray-500 aspect-square" />
                <div className="space-y-4 text-center divide-y divide-gray-700">
                    <div className="my-2 space-y-1">
                        <h2 className="text-xl font-semibold sm:text-5xl">{updatedUserInfo?.name}</h2>
                        <p className="px-5 text-xs sm:text-2xl text-gray-400 uppercase">Role: <span className="text-orange-400"> {userInfo?.role}</span></p>
                        <p className="px-5 text-xs sm:text-2xl text-gray-400"> Status: <span className={`${userInfo?.status == 'active' ? "text-green-500" :
                            " text-red-500 "} uppercase`}>{userInfo?.status}</span></p>

                        <p className="px-5 text-xs sm:text-2xl text-gray-400">Email: {userInfo?.email}</p>
                        <p className="px-5 text-xs sm:text-2xl text-gray-400">Blood-Group: {updatedUserInfo?.bloodGroup}</p>
                        <p className="px-5 text-xs sm:text-2xl text-gray-400">Address:
                            {updatedUserInfo?.upazila},{updatedUserInfo?.district}</p>

                    </div>
                    <div className="text-red-500 font-semibold  transform transition-transform duration-300 flex justify-center hover:underline items-center pt-2 space-x-4 align-center">


                        {/* Open the modal using document.getElementById('ID').showModal() method */}
                        <button className="text-base md:text-5xl" onClick={() => document.getElementById('my_modal_5').showModal()}>Edit Profile </button> <FaFilePen className="text-base md:text-5xl"/>
                        <dialog id="my_modal_5" className="modal modal-bottom -z-10 sm:modal-middle">
                            <div className="modal-box bg-gray-800">
                                <h3 className="font-bold text-3xl uppercase">Update Profile</h3>
                                <div className="modal-action">

                                    <form onSubmit={handleUpdate} className="space-y-8 mt-10">
                                        <div className="space-y-4" >
                                            <div className='flex gap-5'>
                                                <div className="space-y-2 flex-1" >
                                                    <label className="block text-sm text-left">Your name</label>
                                                    <input type="text" name="name" id="name" placeholder="your name" className="w-full px-3 py-3 border rounded-md border-red-500 bg-gray-800 text-gray-100 focus:border-violet-400" defaultValue={userInfo?.name} />
                                                </div>
                                                <div className="space-y-2 flex-1" >

                                                    <label className="block text-sm text-left">Upload Profile Image*</label>
                                                    <input type="file" id="img" name="img" accept="image/*" className="file-input file-input-bordered w-full bg-gray-800 border-red-500" />
                                                </div>
                                            </div>
                                            <div className='flex gap-5'>

                                                <div className="space-y-2 flex-1" >
                                                    <div className="flex justify-between" >
                                                        <label className="text-sm">Blood Group*</label>
                                                    </div>
                                                    <select defaultValue={userInfo?.bloodGroup} name="bloodGroup" className="select select-error w-full px-3 py-2 border rounded-md border-red-500 bg-gray-800 text-gray-100" >

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
                                                        defaultValue={userInfo?.district}
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


                                        <button type="submit" className=" w-full px-8 py-3 font-semibold rounded-md bg-red-800 hover:scale-105 transform transition-transform duration-300 hover:bg-red-500 text-white">
                                            {
                                                loading ? <ImSpinner9 className='mx-auto animate-spin text-xl'></ImSpinner9> :
                                                    'Confirm Update'
                                            }
                                        </button>

                                        <form method="dialog">
                                            {/* if there is a button in form, it will close the modal */}
                                            <button className="btn w-full ">Close</button>
                                        </form>
                                    </form>



                                </div>
                            </div>
                        </dialog>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;