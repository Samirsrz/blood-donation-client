import { useQueries, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { FaArrowAltCircleRight } from "react-icons/fa";
import Buttons from "../components/Buttons";
import BlogCard from "../components/BlogCard";

const ContentManagement = () => {
    const [selectedFilter, setSelectedFilter] = useState('all');
    const axiosSecure = useAxiosSecure();

    const {data: allBlogs =[], isLoading, refetch} = useQuery({
        queryKey:['blogs'],
        queryFn: async() => {
            const res = await axiosSecure.get('/blogs');
            return res?.data.reverse();
        }
    })
    
    const handleFilterChange = (event) => {
        setSelectedFilter(event.target.value);
    };

    // filter blogs based on selected filter
    const filteredBlogs = selectedFilter === 'all' ? allBlogs :
        allBlogs.filter(blog => blog.blogStatus === selectedFilter);
    
    
    return (
        <div>
        <div className='flex flex-row-reverse mb-5 items-center  justify-between py-3  border-y-2  border-y-red-500'>
            <Buttons buttonText={"Add Blog Now"} route={'/dashboard/content-management/add-blog'}  />
            <div className='flex items-center gap-5'>
                <h3 className='text-center text-3xl font-bold my-5 uppercase'>Write Your Blogs </h3>
                <FaArrowAltCircleRight className='text-3xl' />
            </div>

        </div>

        <div className='my-5 space-y-3'>
            <h3 className='text-5xl font-bold text-center uppercase'>List Of Blogs</h3>
            <p className='text-xl text-center'>Update Blogs For Publish/Unpublish, Delete</p>
        </div>

        <div className='grid grid-cols-1 gap-10'>
            {

                allBlogs.length > 0 ? (
                    allBlogs.slice().reverse().map(blog => (
                        <BlogCard key={blog._id}
                            blog={blog}
                            refetch={refetch}
                            setFilter={setSelectedFilter}
                        ></BlogCard>
                    ))
                )
                    : (
                        <div className='h-screen'>
                            <h3 className='text-red-500 text-4xl text-center my-10'>Opps!!! No Blog Posted Yet</h3>
                        </div>
                    )}
        </div>
    </div>
    );
};

export default ContentManagement;