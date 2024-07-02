import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import useUserRole from "../components/useUserRole";
import { AxiosHeaders } from "axios";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import DonationRequstsTable from "../components/DonationRequstsTable";

const MyDonationRequests = () => {
    const axiosSecure = useAxiosSecure();


   const {user} = useContext(AuthContext);
   const [userRole] = useUserRole();

    const [donationRequests, setDonationRequests] = useState([]);
    // console.log("out",donationRequests.length);
    const [filteredDonationRequests, setFilteredDonationRequests] = useState(donationRequests);
    const [specificData, setSpecificData] = useState([]);
    const [allReqCount, setAllReqCount] = useState([]);
    // paging code 
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 10;
    const [count, setCount] = useState(0);

    const numberOfPages = parseInt(Math.ceil(count / itemsPerPage));

  
    useEffect(() => {

    fetch(`https://blood-donation-server-two-ochre.vercel.app/donation-req-count`)
    .then(res => res.json())
    .then(data => setAllReqCount(data))


    },[])
  
    useEffect(() => {
        fetch(`https://blood-donation-server-two-ochre.vercel.app/donation-req-count/${user?.email}`)
            .then(res => res.json())
            .then(data => setSpecificData(data.length))
    }, [user?.email])
 
    
    useEffect(() => {
        if (userRole === 'donor') {
            setCount(specificData)
        }
        else {
            setCount(allReqCount)
        }
    }, [userRole, specificData, allReqCount])

    const handlePrevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    }

    // const handleNextPage = () => {
    //     if (currentPage < pages.length - 1) {
    //         setCurrentPage(currentPage + 1);
    //     }
    // }

    useEffect(() => {
        let requestUrl = `donation-requests?page=${currentPage}&size=${itemsPerPage}`;

        if(userRole === 'donor'){
            requestUrl += `&email=${user?.email}`;
            axiosSecure.get(requestUrl)
            .then(({data}) => {
                setDonationRequests(data);
            })
            .catch(error => {
        //        console.log(error);
            })
        }

        else if(userRole === 'admin' | userRole =='volunteer'){
            axiosSecure.get(requestUrl)
            .then(({data}) => {
                setDonationRequests(data)
            })
            .catch(error => {
             //   console.log(error);
            })


        }
     


    }, [axiosSecure,currentPage, itemsPerPage, userRole, user?.email])

    useEffect(() => {
        if (userRole === 'donor') {
            setCount(specificData);
        }
    }, [userRole, specificData]);


    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/donataion-req-delete/${id}`)
                    .then(({ data }) => {
                        if (data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your Donation Request has been deleted.",
                                icon: "success"
                            });
                        }
                    });

                const remaining = filteredDonationRequests.filter(product => product._id !== id)
                setFilteredDonationRequests(remaining)
            }
        })

     //   console.log(id);
    }


    const handleMakeDone = async (id) => {
        const donationStatus = {
            donationStatus: 'done'
        }
        await axiosSecure.put(`/donation-status/${id}`,
            donationStatus
        )
            .then(({ data }) => {
                if (data?.modifiedCount > 0) {

                    // console.log("updated");
                    let requestUrl = `/donation-requests?page=${currentPage}&size=${itemsPerPage}`;

                    if (userRole === 'donor') {
                        // Only include email for donors
                        requestUrl += `&email=${user?.email}`;
                        axiosSecure.get(requestUrl)
                            .then(({ data }) => {
                                setDonationRequests(data);
                            })
                            .catch((error) => {
                           //     console.log(error);
                            });
                    }
                    else if (userRole === 'admin' | userRole === 'volunteer') {
                        axiosSecure.get(requestUrl)
                            .then(({ data }) => {
                                setDonationRequests(data);
                            })
                            .catch((error) => {
                              //  console.log(error);
                            });
                    }

                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Donation Status Updated",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }

    const handleMakeCancel = async (id) => {
        const donationStatus = {
            donationStatus: 'canceled'
        }
        await axiosSecure.put(`/donation-status/${id}`,
            donationStatus
        )
            .then(({ data }) => {
                if (data?.modifiedCount > 0) {
                    setFilteredDonationRequests((previous) => {
                        previous.forEach((itm) => {
                            if (itm._id == id) {
                                itm.donationStatus = "canceled"
                            }

                        })

                        return [...previous]
                    })

                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Donation Status Updated",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }


    return (
        <div className='h-screen'>
            <h3 className='text-3xl font-semibold text-red-500 text-center'>
                {userRole === 'admin' | userRole === 'volunteer' && 'All ' || userRole === 'donor' && 'My '}
                Donation Requests
            </h3>

            {
                donationRequests.length > 0 ?
                    <div className=" py-10 relative">
                        <table className="table table-xs">
                            {/* head */}
                            <thead>
                                <tr className='text-red-500 text-lg'>
                                    <th>Reciept Name</th>
                                    <th>Reciept Location</th>
                                    <th>Donation Date/Time</th>
                                    <th>Donation Status</th>
                                    <th>Donor Info</th>
                                    <th>Upadate/Delete</th>
                                    <th>Details</th>
                                </tr>
                            </thead>
                            <tbody className='font-semibold'>

                                {
                                    donationRequests.map(donationReq => <DonationRequstsTable key={donationReq?._id}
                                        donationReq={donationReq}
                                        handleDelteReq={() => handleDelete(donationReq._id)}
                                        handleDone={() => handleMakeDone(donationReq._id)}
                                        handleCancel={() => handleMakeCancel(donationReq._id)}
                                        userRole={userRole}
                                    ></DonationRequstsTable>)
                                }

                            </tbody>
                        </table>



                        {/* pagination style starts here  */}


                        {/* <div className='text-center my-10 font-semibold'>
                            <p className='mb-3 text-lg uppercase'>Current page: {currentPage + 1} of {numberOfPages}</p>
                            <button className='btn bg-red-500 hover:bg-red-400 text-white' onClick={handlePrevPage}>Prev</button>
                            {
                                pages.map(page => <button
                                    className={`btn bg-red-500 hover:bg-red-400 text-white mx-2 ${currentPage === page ? 'selected' : undefined}`}
                                    onClick={() => setCurrentPage(page)}
                                    key={page}
                                >{page + 1}</button>)
                            }
                            <button className='btn bg-red-500 hover:bg-red-400 text-white' onClick={handleNextPage}>Next</button>

                        </div> */}


                        {/* check ends here  */}
                    </div> : <h3 className="font-bold text-2xl mt-10">No Donation Request Created Yet.</h3>
            }

        </div>
    );
};

export default MyDonationRequests;