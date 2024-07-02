import { useNavigate } from "react-router-dom";
import useUserRole from "./useUserRole";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import Swal from "sweetalert2";
import parse from 'html-react-parser';

const BlogCard = ({blog, setFilter, refetch}) => {
    
    const [userRole, isLoading] = useUserRole();
    const navigate = useNavigate();
    const axiosSecure =  useAxiosSecure();
    const {user} = useContext(AuthContext);
    const {_id, blogTitle, photo, content, email, blogStatus} = blog;
    
     
    const handlePublish = () => {

        const blogStatus = 'publish';
        axiosSecure.put(`/pulish-blog/${_id}`, { blogStatus })
            .then(({ data }) => {
                if (data?.acknowledged) {

                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "published Successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    refetch();
                    navigate('/dashboard/content-management')
                }
            })

    }

    const handleDraft = () => {
        const blogStatus = 'draft';
        axiosSecure.put(`/draft-blog/${_id}`, { blogStatus })
            .then(({ data }) => {
                if (data?.acknowledged) {

                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Draft Successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    refetch();
                    navigate('/dashboard/content-management')
                }
            })

    }

    const handleDelete = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/delete-blog/${_id}`)
                    .then(({ data }) => {
                        if (data.deletedCount > 0) {

                            Swal.fire({
                                title: "Deleted!",
                                text: "Post has been deleted.",
                                icon: "success"
                            });
                            refetch();
                            setFilter('all')
                            navigate('/dashboard/content-management')
                        }
                    });
            }
        })

    }

    
    return (
        <div className="flex flex-col p-6 space-y-6 overflow-hidden rounded-lg shadow-md bg-gray-900 text-gray-100">
        <div className="flex space-x-4">
            <img alt="" src={user?.photoURL} className="object-cover w-12 h-12 rounded-full shadow bg-gray-500" />
            <div className="flex flex-col space-y-1">
                <a rel="noopener noreferrer" href="#" className="text-sm font-semibold">{user?.displayName}</a>
                {
                    userRole === 'volunteer' && blogStatus === 'draft' && <span className={`text-base uppercase ${blogStatus == 'draft' && 'text-red-500'}`}>{blogStatus == 'draft' && blogStatus} <span className='text-sm normal-case text-green-500'>-- wait for admin to publish</span></span>
                }
                {
                    userRole === 'volunteer' && blogStatus === 'publish' &&
                    <span className={`text-base uppercase ${blogStatus == 'draft' && 'text-red-500'}`}>{blogStatus == 'draft' && blogStatus} <span className='text-sm normal-case text-green-500'>published</span></span>
                }
                <div className='flex gap-5 pt-1'>
                    {
                        blogStatus === 'publish' && userRole === 'admin' && <button onClick={handleDraft} className='btn btn-sm btn-primary'>Unpublish</button>
                    }

                    {
                        userRole === 'admin' && blogStatus === 'draft' && <button onClick={handlePublish} className='btn btn-sm bg-green-800 hover:bg-green-500 text-white border-none'>Publish</button>
                    }
                    {
                        userRole === 'admin' && <button onClick={handleDelete} className='btn btn-sm bg-red-800 hover:bg-red-500 text-white border-none'>Delete</button>
                    }
                </div>


            </div>
        </div>
        <div>
            <img src={photo} alt="" className="object-cover w-full mb-4 h-60 sm:h-96 bg-gray-500" />
            <h2 className="mb-1 text-xl font-semibold">{blogTitle}</h2>
            <p className="text-sm text-gray-400">{parse(content)}</p>
        </div>
    </div>
    );
};

export default BlogCard;