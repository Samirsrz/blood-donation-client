import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const usePaymentHistory = (URL) => {
     const axiosSecure = useAxiosSecure();
    const {user} = useContext(AuthContext);
    const {data: payments =[], refetch} = useQuery({
     queryKey: ['payments', user?.email],
     queryFn: async () => {
        const res = await axiosSecure.get(URL)
        return res.data;
     }
    })

    return [payments, refetch];
};

export default usePaymentHistory;