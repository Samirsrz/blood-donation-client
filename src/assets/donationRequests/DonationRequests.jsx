import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import useUserRole from "../../components/useUserRole";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import PublicPendingCard from "../../components/PublicPendingCard";

const DonationRequests = () => {
   
   const {user} = useContext(AuthContext);
   const [userRole] = useUserRole();
   const axiosSecure =  useAxiosSecure();
   const [pendingRequests, setPendingRequests] = useState([]);
   
   useEffect(() => {

    axiosSecure.get('/pending-req')
    .then(({data}) => {
        setPendingRequests(data);
    })
    .catch((error) => {
//        console.log(error);
    })
 

   },[axiosSecure])
   
    return (
        <div className='pt-48 pb-10 bg-gray-800 text-white min-h-screen '>
        <div className=" max-w-6xl mx-auto">
            <div className="flex items-center justify-center gap-6 bg-white rounded-full p-2 lg:p-7 max-w-3xl mx-auto">
                <h3 className='text-2xl lg:text-4xl font-semibold text-red-500 text-center'>All Donation Requests </h3>
                
            </div>

            {
                pendingRequests.length > 0 ?
                    <div className=" py-10 relative overflow-x-auto">
                        <table className="table  table-md border border-red-500 bg- rounded-none">
                            {/* head */}
                            <thead>
                                <tr className='text-red-500 text-xl border border-red-500'>
                                    <th>Reciept Name</th>
                                    <th>Reciept Location</th>
                                    <th>Donation Date</th>
                                    <th>Donation Time</th>
                                    <th>Donation Status</th>
                                    {/* <th>Donor Info</th> */}
                                    {/* <th>Upadate/Delete</th> */}
                                    <th>Details</th>
                                </tr>
                            </thead>
                            <tbody className='font-semibold '>

                                {
                                    pendingRequests.map(pendingDonationReq => <PublicPendingCard key={pendingDonationReq?._id}
                                        pendingDonationReq={pendingDonationReq}
                                    ></PublicPendingCard>)
                                }

                            </tbody>
                        </table>


                    </div> : <h3 className="font-bold text-2xl mt-10">No Donation Request Created Yet.</h3>
            }

        </div>
    </div>
    );
};

export default DonationRequests;