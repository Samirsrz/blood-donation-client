import { useEffect, useState } from "react";
import SearchTableRow from "../components/SearchTableRow";
import SelectOptions from "../hooks/SelectOptions";
import useAxiosSecure from "../hooks/useAxiosSecure";


const SearchDonor = () => {

    const [donors, setDonors] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [upazilas, setUpazilas] = useState([]);
    const axiosSecure = useAxiosSecure();
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [filteredUpazilas, setFilteredUpazilas] = useState([]);
    const [selectedUpazila, setSelectedUpazila] = useState('');


   // districts data load
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

   useEffect(() => {
    const filteredUpazilas = upazilas.filter(upazila => upazila.district_id === selectedDistrict);
    setFilteredUpazilas(filteredUpazilas);
}, [selectedDistrict, upazilas]);

   

  const handleSearch = async (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const bloodGroup = form.get('bloodGroup');
    const district = form.get('district');
    const upazila = form.get('upazila');
 
     const currentUser = {
       districtName: districts.find(district => district.id === selectedDistrict)?.name,
       upazilaName: upazilas.find(upazila => upazila.id === selectedUpazila)?.name

     }
  //   console.log(currentUser,bloodGroup);
     
     await axiosSecure.get(`/search-donor/${currentUser?.districtName}/${currentUser?.upazilaName}/${bloodGroup}`)
     .then(({data}) => {
   //     console.log(data)
    })
   
     
  } 
  

  
  //  console.log(axiosSecure, 'error paitesi');



  if(donors.length < 0){
    return <p>No Donor</p>
  }

   


    return (
 <div className='py-32 bg-gray-600'>
            <div className='max-w-6xl mx-auto '>
                <form onSubmit={handleSearch}>
                    <div className="space-y-2 flex-1" >
                        <div className="flex justify-between" >
                            <label className="text-sm font-bold">Blood Group*</label>
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

                    <div className='flex gap-5'>

                        <div className="space-y-2 flex-1">
                            <div className="flex justify-between">
                                <label className="text-sm font-bold">District*</label>
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
                                <label className="text-sm font-bold">Upazila*</label>
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

                    <button type='submit' className="w-full px-8 py-3 font-semibold rounded-md bg-red-800 hover:scale-105 transform transition-transform duration-300 hover:bg-red-500 text-white my-8">search</button>
                </form>

                <div>
                    <div className="overflow-x-auto my-10">
                        <table className="table text-white text-2xl">
                            {/* head */}
                            <thead>
                                <tr className='text-white font-bold text-2xl'>
                                    <th></th>
                                    <th>Donor Name</th>
                                    <th>Email</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    donors.map((donor, idx) => <SearchTableRow
                                        key={donor._id}
                                        donor={donor}
                                        idx={idx}
                                    ></SearchTableRow>)

                                }


                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchDonor;