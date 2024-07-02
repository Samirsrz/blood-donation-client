import { FaPencil, FaUserGear } from "react-icons/fa6";

const UserDataTable = ({ user, onMakeAdminClick, onMakeVolunteerClick,statusChange }) => {


    const {_id, name, email, role, status, photo, bloodGroup, district, upazila } = user;
   



    return (
        <tr>
        <td>
            <div className="avatar">
                <div className=" w-12 h-12">
                    <img src={photo} className="object-cover" alt="Avatar Tailwind CSS Component" />
                </div>
            </div>
        </td>
        <td>
            <div className="">
                <div className="font-bold">{name}</div>
            </div>
        </td>
        <td>

            <span className="badge badge-ghost badge-sm text-lg">{email}</span>
        </td>
        <td className="uppercase text-orange-500 font-bold">{role}</td>
        <th>
            <p className={`font-semibold uppercase
             ${status === "blocked" && 'text-red-500'}
             ${status === "active" && 'text-green-500'}
             `}>{status}</p>
        </th>
        <td>
            {
                role === 'admin' ? <FaUserGear className="text-4xl ml-5"/> :


                    <div className="dropdown dropdown-top dropdown-end">
                        <label tabIndex={0}
                       
                         className="btn m-1">
                        <FaPencil className="text-xl"/>

                        </label>
                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                        <li>
                                <a onClick={onMakeAdminClick}>Make Admin</a>
                            </li>
                            <li>
                                <a onClick={onMakeVolunteerClick}>Make Volunteer</a>
                            </li>
                            {
                                status === 'blocked' ? <li  onClick={()=>statusChange("active")}><a>Active</a></li>
                                : <li  onClick={statusChange} ><a>Block</a></li>
                            }
                        </ul>
                    </div>
            }
        </td>
    </tr>
    );
};

export default UserDataTable;