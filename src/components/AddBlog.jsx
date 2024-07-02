import { useContext, useRef, useState } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useBlogs from "../hooks/useBlogs";
import imageUpload from "../hooks/imageUpload";
import Swal from "sweetalert2";


const AddBlog = () => {
     const editor = useRef(null);
     const [content, setContent] = useState('');
     const {user} = useContext(AuthContext);
     const navigate = useNavigate();
     const axiosSecure = useAxiosSecure();
const [blogs, isLoading, refetch] = useBlogs();
    

   const handleBlog = async (e) => { 
          e.preventDefault();
        const form = new FormData(e.currentTarget);
        const blogTitle = form.get('blogTitle')

        const img = e.target.img.files[0]
        const imageData = await imageUpload(img)
        //    console.log(imageData.data.display_url);
        const photo = imageData?.data?.display_url
        const email = user?.email;
        const userImg = user?.photoURL;
        const userName = user?.displayName; 
        const content = form.get('content');
        const blogContent = {
            blogTitle,photo,content,email,
            blogStatus : 'draft',userImg,userName

        }
   
        axiosSecure.post('/add-blog', blogContent)
        .then(({data}) => {
            if(data?.acknowledged){
                refetch()
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Wait For Acception By Admin",
                    showConfirmButton: false,
                    timer: 1500
                  });
                  navigate('/dashboard/content-management')

            }
       })

       .catch(err=>{
        Swal.fire({
            position: "top-end",
            icon: "error",
            title: "sorry!!!",
            showConfirmButton: false,
            timer: 1500
          });
    })



   }
 



    
    return (
        <div className=''>
            <h3 className='text-3xl text-center text-red-500 font-bold mt-5 mb-10'>Write Your Blog Here</h3>


            <form onSubmit={handleBlog}>
            <div>
                <div className="form-control w-full max-w-xs my-5">
                    <label className="label">
                        <span className="label-text font-semibold text-xl">Title of the blog</span>
                    </label>
                    <input type="text" name='blogTitle' placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                </div>
            </div>

            <div className="" >
            <label className="label">
                        <span className="label-text font-semibold text-xl">Upload Thumbnail Tmage</span>
                    </label>
                <input type="file" id="img" name="img" accept="image/*" className="file-input file-input-bordered w-1/2  " required />
            </div>

            <div className='mt-5'>
                <label className="label">
                    <span className="label-text font-semibold text-xl">Content of the blog</span>
                </label>
              <textarea name="content" cols={180} rows={30} className="border-2" id=""></textarea>
                {/* {parse(content)} */}

            </div>

            <button type='submit' className='btn btn-lg bg-red-500 text-white my-5 w-full hover:bg-red-400'>Post Blog</button>
            </form>


            {/* <div className='grid grid-cols-1 gap-10'>
                <h3 className='text-center text-3xl font-bold my-5 uppercase border-y-2 py-3 border-y-red-500'>Your All Blogs</h3>
                {
                   blogs.length>0 ? blogs.map(blog=><BlogCard 
                        key={blog._id}
                        blog={blog}
                    ></BlogCard>) 
                    : <h3 className='text-red-500 text-4xl text-center my-10'>Opps!!! No Blog Posted Yet</h3>
                }
            </div> */}
        </div>
    );
};

export default AddBlog;