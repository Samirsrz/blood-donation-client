import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useLoaderData } from "react-router-dom";
import useLoader from "../components/useLoader";
import PublicBlogCard from "./PublicBlogCard";
import Lottie from "lottie-react";
import bookAnimation from '../assets/animations/bookAnimation.json'
const Blogs = () => {

    const {data: blogs=[], isLoading, refetch} = useQuery({
       queryKey: ['blogs'],
       queryFn: async () =>{
          const res = await axios.get('https://blood-donation-server-two-ochre.vercel.app/blogs');
          return res.data.reverse();
       }
    })

   const loader = useLoader(isLoading);

    const publishedBlogs = blogs.filter(blog => blog.blogStatus === 'publish')

    if (isLoading) {
        return loader;
    }
    
    
    
    return (
        <div className=' pt-48 pb-10 bg-gray-800'>
            <div className='max-w-6xl px-5 lg:px-0 mx-auto'>
                <div className='hidden md:block'>
                <div className='flex justify-around items-center '>
                    <div className='p-7 bg-white rounded-xl shadow-2xl max-w-md'>
                        <h3 className='text-3xl mb-5 font-bold text-center text-red-500'>Read Blogs</h3>
                        <p className='text-center mb-5 text-xl border-b border-b-red-500 pb-2 font-semibold text-black'>Life in Every Drop: Inspiring Tales of Blood Donation and Lifesaving Moments</p>
                    </div>
                    <div>
                        <Lottie animationData={bookAnimation} className='w-[300px] h-[300px]' />
                    </div>
                    <div className='p-7 bg-white rounded-xl shadow-2xl max-w-md'>
                        <h3 className='text-3xl mb-5 font-bold text-center text-red-500'>Earn Knowledge</h3>
                        <p className='text-center mb-5 text-xl border-b border-b-red-500 pb-2 font-semibold text-black'>Harvesting Wisdom: Accumulating Knowledge and Earning Insights, One Page at a Time</p>
                    </div>
                </div>
                </div>
                <div className='grid grid-cols-1 gap-10 '>
                    {publishedBlogs.length > 0 ? (
                        publishedBlogs.map(blog => (
                            <PublicBlogCard key={blog._id} blog={blog}></PublicBlogCard>
                        ))
                    ) : (
                        <div className='h-screen'>
                            <h3 className='text-red-500 text-4xl text-center my-10'>Opps!!! No Blog has been Posted Yet</h3>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Blogs;