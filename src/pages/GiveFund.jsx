import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";
import PaymentHistory from "./Home/PaymentHistory";



const stripePromise = loadStripe('pk_test_51PMDaQ00DmYzk9HpOvbrnTyEaO9Yoz3msXf3emg3yS0sKzhvrIRrDswHkW9BCdtuWqMwlcGnYPoAIu7xuRo6jzkU00bSkHZXZ7');

const GiveFund = () => {

  
    return (
        <div className='bg-gray-800 h-[1200px] overflow-hidden  '>
        <div className='mt-44'>
            <div className='mb-10 '>
                <h3 className='text-lg md:text-2xl text-red-500 text-center'><span className='text-green-500'>Empower Life:</span> Support Our Cause with a <span className='text-green-500'>$100</span> Donation – Every Drop Counts!</h3>
            </div>
            <div className='max-w-xl mx-auto'>
                <Elements stripe={stripePromise}>
                     <PaymentForm></PaymentForm> 
                </Elements>
            </div>
            <div className='py-16 max-w-3xl mx-auto'>
            <PaymentHistory></PaymentHistory>
            
            
            
            </div>
        </div>
    </div>
    );
};

export default GiveFund;