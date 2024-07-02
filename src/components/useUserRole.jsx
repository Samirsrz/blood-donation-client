import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";

const useUserRole = () => {
   
   const {user, loading} = useContext(AuthContext);
   const axiosSecure = useAxiosSecure();
     const {data: userRole = ' ', isLoading, refetch} = useQuery({
      enabled: !loading && !!user?.email,
       queryKey: ['user',user?.email],
       queryFn: async() => {
       const {data} = await axiosSecure.get(`/user/${user?.email}`)
      console.log(data,"use role er bhitoreee");
        return data?.role;
    },
  
        
    })


     return [userRole, isLoading,refetch]
};

export default useUserRole;