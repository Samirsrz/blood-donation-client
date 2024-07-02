import { Link } from "react-router-dom";

const PublicPendingCard = ({pendingDonationReq}) => {
    
    const {_id, requesterName, requesterEmail, recieptName, address, hospitalName, bloodGroup, time, date, district, upazila, requestMessage, donationStatus} = pendingDonationReq
    
    return (
        <tr className='border border-red-500'>
        <td>
            <p>{recieptName}</p>
        </td>
        <td >
            <div>
                <p>{address},{upazila},{district}</p>
            </div>
        </td>
        <td>

            <p>{date}</p>
        </td>
        <td>

            <p>{time}</p>
        </td>

        <td className={`${donationStatus == 'pending' && "bg-red-300"} ${donationStatus == 'inprogress' && "bg-orange-400"}  ${donationStatus == 'done' && "bg-green-300"}
        ${donationStatus == 'canceled' && "bg-red-600"} text-black`}>
            {donationStatus}
            {donationStatus == 'inprogress' && (<div className='mt-2'>
                <button  className='btn btn-xs bg-green-500 border-none text-white'>Done</button> <button className='btn btn-xs bg-red-500 border-none text-white'>Cancel</button></div>)}

        </td>

       

        <td>
            <Link to={`/donation-details/${_id}`}>
                <button className='btn bg-red-500 text-white border-none'>view</button>
            </Link>
        </td>
    </tr>
    );
};

export default PublicPendingCard;