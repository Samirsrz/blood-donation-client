import Lottie from "lottie-react";
import { Link } from "react-router-dom";
import addAnimation from '../assets/animations/addAnimation.json'
const CreateBlogs = () => {
    return (
        <div className='min-h-screen'>
        <div className='flex flex-col items-center justify-center mt-10'>
        <Link to='/dashboard/content-management/add-blog'>
            <Lottie animationData={addAnimation} className='h-[300px] w-[300px]' />
            </Link>
            <h3 className='text-5xl font-bold mt-10 uppercase text-red-500'>Click Here To Creat Blog</h3>
        </div>
    </div>
    );
};

export default CreateBlogs;