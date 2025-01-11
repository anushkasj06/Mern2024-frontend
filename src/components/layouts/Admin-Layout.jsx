import { Navigate, NavLink, Outlet } from "react-router-dom";
import {FaUser} from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import { FaRegListAlt } from "react-icons/fa";
import { IoMdHome } from "react-icons/io";
import {useAuth} from "../../store/auth";


export const AdminLayout = () => {
    const { user } = useAuth();
    const {isLoading} = useAuth();
    console.log("User login layout: ",user);

    if(isLoading){
        return <h1>
            Loading...
        </h1>
    }

    if(!user.isAdmin){
        return <Navigate to="/"/>
    }

    return (
        <>
            <header>
                <div className="container">
                    <nav>
                        <ul>
                            <li>
                                <NavLink to="/admin/users"><FaUser/> Users</NavLink>
                            </li>
                            <li>
                                <NavLink to="/admin/contacts"><FaMessage/> Contacts</NavLink>
                            </li>
                            <li>
                                <NavLink to="/service"><FaRegListAlt /> Services</NavLink>
                            </li>
                            <li>
                                <NavLink to="/"><IoMdHome />Home</NavLink>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>
            <Outlet/>
        </>
    );
};
