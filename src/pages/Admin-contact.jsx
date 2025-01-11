import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import {toast} from "react-toastify";


export const AdminContacts = () =>{

    const {authorizationToken} = useAuth();
    const [contactData , setContactData] = useState([]);


    const getAllContactsData = async ()=>{
        try {
            const response = await fetch(`https://mern2024-backend.onrender.com/api/admin/contacts`,{
                method:"GET",
                headers:{
                    Authorization: authorizationToken,
                },
            });
            const data = await response.json();
            if(response.ok){
            setContactData(data);
            console.log(data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const deleteContactById = async(id)=>{
        try {
            const response = await fetch(`https://mern2024-backend.onrender.com/api/admin/contacts/delete/${id}`,{
                method:"DELETE",
                headers:{
                    Authorization: authorizationToken,
                },
            });
            if(response.ok){
               getAllContactsData();
               toast.success("Contact Deleted Successfully");

            }else{
                toast.error("Something Went Wrong");
            }
        } catch (error) {
            console.log(error);
        }
    };
 
    useEffect(() => {
        getAllContactsData();
    },[]);

    return (
        <>
            <section className="admin-contacts-section">
                <div className="container">
                    <h1>Admin Contacts Data</h1>
                </div>
                <div className="container admin-users">
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Message</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {contactData.map((curUser, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{curUser.username}</td>
                                        <td>{curUser.email}</td>
                                        <td>{curUser.message}</td>
                                        <td>
                                            <button className="btn" onClick={()=>deleteContactById(curUser._id)}>Delete</button>
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
