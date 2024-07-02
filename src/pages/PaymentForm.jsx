import {  CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import usePaymentHistory from "../hooks/usePaymentHistory";
import useAxiosSecure from "../hooks/useAxiosSecure";
import axios from "axios";
import Swal from "sweetalert2";

const PaymentForm = () => {
  const axiosSecure = useAxiosSecure();
  const [error, setError] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const stripe = useStripe();
  const elements = useElements();
  const {user} = useContext(AuthContext);

   const [payments, refetch] = usePaymentHistory(`/payments/${user?.email}`);
  
  const totalPrice = 100;

   useEffect(() => {
   
    if(totalPrice > 0) {
        axiosSecure.post('/create-payment-intent', {price: totalPrice})
        .then(res => {
         //   console.log(res.data.clientSecret);
            setClientSecret(res.data.clientSecret);
        })
    }
   

   }, [axiosSecure,totalPrice])


   
   const handleSubmit = async (e) => {
     e.preventDefault();
     if(!stripe || !elements ){
        return
     }
 
     const card = elements.getElement(CardElement);

     if(card == null){
        return
     }
     
     const {error, paymentMethod} = await stripe.createPaymentMethod({
        type: 'card',
        card
     })
    
     if(error){
      //  console.log('payment error', error);
        setError(error.message);
     }

     else{
     //   console.log('payment method', paymentMethod);
        setError('') 
    }

    const {paymentIntent, error: confirmError} = await stripe.confirmCardPayment(clientSecret, {
       payment_method: {
        card:card,
        billing_details: {
            email: user?.email || 'anonymous',
            name: user?.displayName || 'anonymous'
        }
       }

    })

   if(confirmError){
  //  console.log('confirm error')
   }

   else {
   // console.log('payment intent', paymentIntent)
    if (paymentIntent.status === 'succeeded') {
    //    console.log('transaction id', paymentIntent.id);
        setTransactionId(paymentIntent.id);

        // now save the payment in the database
        const payment = {
            email: user.email,
            price: totalPrice,
            transactionId: paymentIntent.id,
            date: new Date(), // utc date convert. use moment js to 
            status: 'done'
        }

        const res = await axiosSecure.post('/payments', payment);
    //    console.log('payment saved', res.data);

        if (res.data?.paymentResult?.insertedId) {
            refetch();
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Thank you for Donating",
                showConfirmButton: false,
                timer: 1500
            });
            // navigate('/dashboard/paymentHistory')
        }

    }
}

   }


    return (
        <form onSubmit={handleSubmit} className="p-10 border border-red-500 text-white ">

        <h3 className="text-3xl font-semibold mb-4">Enter Your Card Number:</h3>
        <CardElement
            options={{
                style: {
                    base: {
                        fontSize: '28px',
                        color: '#FFFF00',
                        '::placeholder': {
                            color: '#aab7c4',
                        },
                    },
                    invalid: {
                        color: '#DC143C',
                    },
                },
            }}
        />
        <button className="btn mt-10 w-full bg-red-800 hover:bg-red-500 text-white uppercase border-none my-4" type="submit" disabled={!stripe || !clientSecret}>
            Pay
        </button>
        <p className="text-red-600">{error}</p>
        {transactionId && <p className="text-green-600"> <span className="uppercase">Your transaction id: </span> {transactionId}</p>}
    </form>
    );
};

export default PaymentForm;