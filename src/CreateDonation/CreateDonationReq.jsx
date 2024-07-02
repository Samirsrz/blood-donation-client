import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { ImSpinner9 } from "react-icons/im";
import SelectOptions from "../hooks/SelectOptions";
import { useNavigate } from "react-router-dom";

const CreateDonationReq = () => {

    const {user, loading} = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const [districts, setDistricts] = useState([]);
    const [upazilas, setUpazilas] = useState([]);

    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [filteredUpazilas, setFilteredUpazilas] = useState([]);
    const [selectedUpazila, setSelectedUpazila] = useState('');
    const navigate = useNavigate();

    const [userStatus, setUserStatus] = useState('');
    
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


    const handleCreateDonation = (e) => {
        e.preventDefault();

        const form = new FormData(e.currentTarget);
        const recieptName = form.get('recieptName');
        const address = form.get('address');
        const bloodGroup = form.get('bloodGroup');
        const hospitalName = form.get('hospitalName')
        const district = form.get('district');
        const upazila = form.get('upazila');
        const time = form.get('time');
        const date = form.get('date')
        const requestMessage = form.get('requestMessage')

        const createDonatipon = {
            requesterName: user?.displayName,
            requesterEmail: user?.email,
            recieptName,
            address,
            hospitalName,
            bloodGroup,
            time,
            date,
            district: districts.find(district => district.id === selectedDistrict)?.name,
            upazila: upazilas.find(upazila => upazila.id === selectedUpazila)?.name,
            requestMessage,
            donationStatus: 'pending'
        }
        // console.log(createDonatipon);

        axiosSecure.post('/donation-request', createDonatipon)
            .then(({ data }) => {
                if (data?.acknowledged) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Register Successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
                navigate('/dashboard')
            })
    }

    useEffect(() => {
        axiosSecure.get(`/blocked-user/${user?.email}`)
            .then(({ data }) => setUserStatus(data.status))
    }, [axiosSecure,user?.email])
    
    return (
        <div className="">
            <h3 className="text-red-500 font-bold text-2xl">Create Donation Request</h3>

            <form onSubmit={handleCreateDonation} className="space-y-8 text-white mt-1 bg-gray-800 p-7">
                <div className="text-red-400 font-bold border text-center uppercase p-1 border-dotted">
                    <p>Requester Name: <span className=" text-white">{user?.displayName}</span></p>
                    <p>Requester Email: <span className="lowercase text-white">{user?.email}</span></p>
                </div>
                <div className="space-y-4" >
                    <div className='flex gap-5'>
                        <div className="space-y-2 flex-1" >
                            <label className="block text-sm text-left">Reciept name</label>
                            <input required type="text" name="recieptName" id="name" placeholder="reciept name" className="w-full px-3 py-3 border rounded-md border-red-500 bg-gray-800 text-gray-100 focus:border-violet-400" />
                        </div>
                        <div className="space-y-2 flex-1" >

                            <label className="block text-sm text-left">Adress:</label>
                            <input required type="text" name="address" id="email" placeholder="full address" className="w-full px-3 py-3 border rounded-md border-red-500 bg-gray-800 text-gray-100 focus:border-violet-400" />
                        </div>


                        <div className="space-y-2 flex-1" >
                            <div className="flex justify-between" >
                                <label className="text-sm">Blood Group*</label>
                            </div>
                            <select required name="bloodGroup" className="select select-error w-full px-3 py-2 border rounded-md border-red-500 bg-gray-800 text-gray-100">
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

                        <div className="space-y-2 flex-1" >
                            <label className="block text-sm text-left">Time:</label>
                            <input required type="time" name="time" id="email" placeholder="hospital name" className="w-full px-3 py-3 border rounded-md border-red-500 bg-gray-800 text-gray-100 focus:border-violet-400" />
                        </div>

                        <div className="space-y-2 flex-1" >
                            <label className="block text-sm text-left">Date:</label>
                            <input required type="date" name="date" id="email" placeholder="hospital name" className="w-full px-3 py-3 border rounded-md border-red-500 bg-gray-800 text-gray-100 focus:border-violet-400" />
                        </div>


                        <div className="space-y-2 flex-1" >
                            <label className="block text-sm text-left">Hospital Name</label>
                            <input required type="text" name="hospitalName" id="email" placeholder="hospital name" className="w-full px-3 py-3 border rounded-md border-red-500 bg-gray-800 text-gray-100 focus:border-violet-400" />
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
                            <label name="password" className="text-sm">Request Message</label>
                        </div>
                        <textarea required type="text" name="requestMessage" id="password" placeholder="why you need blood write in details..." className="w-full px-3 py-2 border rounded-md border-red-500 bg-gray-800 text-gray-100 focus:border-violet-400" />

                    </div>

                </div>


                {
                    userStatus === 'blocked' &&
                    <button className="w-full btn-neutral uppercase px-8 py-3 font-semibold rounded-md text-white">You are blocked</button>
                    || userStatus == 'active' &&
                    <button type="submit" className="w-full px-8 py-3 font-semibold rounded-md bg-red-800 hover:scale-105 transform transition-transform duration-300 hover:bg-red-500 text-white">
                        {
                            loading ? <ImSpinner9 className='mx-auto animate-spin text-xl'></ImSpinner9> :
                                'Create Request'
                        }
                    </button>
                }
            </form>
        </div>
    );
};

export default CreateDonationReq;