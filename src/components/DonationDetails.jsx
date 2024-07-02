import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useColorScheme } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import Swal from "sweetalert2";

const DonationDetails = () => {
 
 
   const {id} = useParams();
   const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const {data : donationDetails, refetch} = useQuery({
    queryKey: ['donationDetails', id],
    queryFn: async () => {
        const res = await axiosSecure.get(`/donation-details/${id}`)
         return res.data;
    }
  })

     const {user} =  useContext(AuthContext);
   
   
     const handleDonate = () => {
        document.getElementById('my_modal_1').close();
     

     axiosSecure.put(`/donation-confirm/${donationDetails?._id}`, {donationStatus: 'inprogress'})
     .then(({ data }) => {
      //  console.log(data);
        if (data?.modifiedCount > 0) {
            navigate('/dashboard')
            refetch();
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Donation Status Updated",
                showConfirmButton: false,
                timer: 1500
            });

        }
    })
    .catch((err) => {
        console.error(err);
        refetch();
        Swal.fire({
            position: "top-end",
            icon: "error",
            title: "Sorry!",
            showConfirmButton: false,
            timer: 1500
        });
    });   
    }

    return (
        <div className="relative min-h-screen flex w-full flex-col bg-gray-900 bg-clip-border p-8 text-white shadow-md shadow-pink-500/40">
        <div className="relative pb-8 m-0 mb-8 overflow-hidden text-center text-gray-700 bg-transparent border-b rounded-none shadow-none border-white/10 bg-clip-border">
            <p className="block font-sans text-sm antialiased font-normal leading-normal text-red-500 uppercase">
                Be a life saver
            </p>
            <h1 className="flex justify-center gap-1 mt-6 font-sans antialiased font-normal tracking-normal text-white text-5xl">
                Donate Now
            </h1>
        </div>
        <div className="p-0 max-w-6xl mx-auto">
            <ul className="flex flex-col gap-4">
                <li className="flex items-center gap-4">
                    <span className="p-1 border rounded-full border-white/20 bg-white/20">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"

                            stroke="currentColor"
                            aria-hidden="true"
                            className="w-3 h-3"
                        >
                            <path


                                d="M4.5 12.75l6 6 9-13.5"
                            ></path>
                        </svg>
                    </span>
                    <p className="block font-sans antialiased font-normal leading-relaxed text-lg">
                        Requester Name: {donationDetails?.requesterName} <br />
                        Requester Email: {donationDetails?.requesterEmail}
                    </p>
                </li>
                <li className="flex items-center gap-4">
                    <span className="p-1 border rounded-full border-white/20 bg-white/20">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"

                            stroke="currentColor"
                            aria-hidden="true"
                            className="w-3 h-3"
                        >
                            <path


                                d="M4.5 12.75l6 6 9-13.5"
                            ></path>
                        </svg>
                    </span>
                    <p className="block font-sans text-base antialiased font-normal leading-relaxed text-inherit">
                        Reciept Name: {donationDetails?.recieptName}
                    </p>
                </li>
                <li className="flex items-center gap-4">
                    <span className="p-1 border rounded-full border-white/20 bg-white/20">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"

                            stroke="currentColor"
                            aria-hidden="true"
                            className="w-3 h-3"
                        >
                            <path
                                d="M4.5 12.75l6 6 9-13.5"
                            ></path>
                        </svg>
                    </span>
                    <p className="block font-sans text-xl text-red-500 antialiased font-normal leading-relaxed">
                        Blood Group: {donationDetails?.bloodGroup}
                    </p>
                </li>
                <li className="flex items-center gap-4">
                    <span className="p-1 border rounded-full border-white/20 bg-white/20">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"

                            stroke="currentColor"
                            aria-hidden="true"
                            className="w-3 h-3"
                        >
                            <path
                                d="M4.5 12.75l6 6 9-13.5"
                            ></path>
                        </svg>
                    </span>
                    <p className="block font-sans text-base antialiased font-normal leading-relaxed text-yellow-400 text-inherit">
                        Time: {donationDetails?.time} <br />
                        Date: {donationDetails?.date}
                    </p>
                </li>
                <li className="flex items-center gap-4">
                    <span className="p-1 border rounded-full border-white/20 bg-white/20">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"

                            stroke="currentColor"
                            aria-hidden="true"
                            className="w-3 h-3"
                        >
                            <path


                                d="M4.5 12.75l6 6 9-13.5"
                            ></path>
                        </svg>
                    </span>
                    <p className="block font-sans text-base antialiased font-normal leading-relaxed text-inherit">
                        Address: {donationDetails?.address} <br />
                        Upazila: {donationDetails?.upazila} <br />
                        District: {donationDetails?.district}
                    </p>
                </li>

                <li className="flex items-center gap-4">
                    <span className="p-1 border rounded-full border-white/20 bg-white/20">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"

                            stroke="currentColor"
                            aria-hidden="true"
                            className="w-3 h-3"
                        >
                            <path


                                d="M4.5 12.75l6 6 9-13.5"
                            ></path>
                        </svg>
                    </span>
                    <p className="block font-sans antialiased font-normal leading-relaxed text-inherit text-xl">
                        Hospital Name: {donationDetails?.hospitalName}
                    </p>
                </li>

                <li className="flex items-center gap-4">
                    <span className="p-1 border rounded-full border-white/20 bg-white/20">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"

                            stroke="currentColor"
                            aria-hidden="true"
                            className="w-3 h-3"
                        >
                            <path
                             d="M4.5 12.75l6 6 9-13.5"
                            ></path>
                        </svg>
                    </span>
                    <p className="block font-sans antialiased font-normal leading-relaxed text-inherit text-xl">
                        Request Message: {donationDetails?.requestMessage}
                    </p>
                </li>

                <li className="flex items-center gap-4">
                    <span className="p-1 border rounded-full border-white/20 bg-white/20">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"

                            stroke="currentColor"
                            aria-hidden="true"
                            className="w-3 h-3"
                        >
                            <path


                                d="M4.5 12.75l6 6 9-13.5"
                            ></path>
                        </svg>
                    </span>
                    <p className="block font-sans antialiased font-normal leading-relaxed text-inherit text-xl">
                        Donation Status: <span className="text-green-500">{donationDetails?.donationStatus}</span>
                    </p>
                </li>

            </ul>
        </div>


        <div className="p-0  mt-12">
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <button className="block mx-auto w-3/4 select-none rounded-lg bg-red-500 hover:bg-red-400 py-3.5 px-7 text-center align-middle font-sans text-sm font-bold uppercase text-white shadow-md shadow-blue-gray-500/10 transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-gray-500/20 focus:scale-[1.02] focus:opacity-[0.85] focus:shadow-none active:scale-100 active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" onClick={() => document.getElementById('my_modal_1').showModal()}>Donate Now</button>


            <dialog id="my_modal_1" className="modal">
                <div className="modal-box text-white text-center bg-gray-800">
                    <h3 className="text-xl font-bold text-red-500 border p-1 my-4">Please Confirm Your Donation</h3>
                    <p className="text-xl font-bold">Name: {user?.displayName}</p>
                    <p className="text-xl font-bold">Email: {user?.email}</p>

                    <button onClick={handleDonate} className="btn bg-red-500 border-none w-full mt-10 text-white">Confirm Donate</button>
                </div>
            </dialog>
        </div>
    </div> 
    );
};

export default DonationDetails;