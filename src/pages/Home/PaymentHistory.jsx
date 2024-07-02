import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import usePaymentHistory from "../../hooks/usePaymentHistory";

const PaymentHistory = () => {
const {user} = useContext(AuthContext);


const [payments, refetch] = usePaymentHistory(`/payments/${user?.email}`)

    
    
    
    return (
        <div>
        <h2 className="text-xl text-white mb-5">Total Payments: {payments.length}</h2>
        <div className="overflow-x-auto">
            <table className="table table-lg text-white">
                {/* head */}
                <thead className="text-white bg-red-500">
                    <tr>
                        <th>#</th>
                        <th>Donor Name</th>
                        <th>Price</th>
                        <th>Transaction Id</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody className="text-white">
                    {payments.map((payment, index) => <tr key={payment._id}>
                        <th>{index + 1}</th>
                        <th>{user?.displayName}</th>
                        <td>${payment.price}</td>
                        <td>{payment.transactionId}</td>
                        <td>{payment.status}</td>
                    </tr>)}

                </tbody>
            </table>
        </div>
    </div>
    );
};

export default PaymentHistory;