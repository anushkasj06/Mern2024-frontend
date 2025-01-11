import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import {Link} from "react-router-dom";
import {toast} from "react-toastify";




export const AdminUsers = () => {
    const { authorizationToken } = useAuth();
    const [users, setUsers] = useState([]);

    const getAllUserData = async () => {
        try {
            const response = await fetch(`https://mern2024-backend.onrender.com/api/admin/users`, {
                method: "GET",
                headers: {
                    Authorization: authorizationToken,
                },
            });
            const data = await response.json();
            console.log(`users: ${data}`);
            setUsers(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllUserData();
    }, []);

    const deleteUser = async (id) => {
        try {
            const response = await fetch(`https://mern2024-backend.onrender.com/api/admin/users/delete/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: authorizationToken,
                },
            });
            const data = await response.json();
            console.log(`users after delete: ${data}`);
            if(response.ok){
                getAllUserData();
                toast.success("User deleted successfully");
            }else{
                toast.error("Failed to delete user");
            }
        } catch (error) {
            console.log(error);
        }
        
    }

    return (
        <>
            <section className="admin-users-section">
                <div className="container">
                    <h1>Admin Users Data</h1>
                </div>
                <div className="container admin-users">
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((curUser, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{curUser.username}</td>
                                        <td>{curUser.email}</td>
                                        <td>{curUser.phone}</td>
                                        <td>
                                            <Link className="updateLink" to={`/admin/users/${curUser._id}/edit`}>Edit</Link>
                                        </td>
                                        <td>
                                            <button className="btn" onClick={()=> deleteUser(curUser._id)}>Delete</button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </section>
        </>
    );
};
