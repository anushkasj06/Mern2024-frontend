import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

export const AdminUpdate = () => {
    const { authorizationToken } = useAuth();
    const [data, setData] = useState({
        username: "",
        email: "",
        phone: "",
    });

    const params = useParams();

    const getSingleUserData = async (id) => {
        try {
            const response = await fetch(`https://mern2024-backend.onrender.com/api/admin/users/${id}`, {
                method: "GET",
                headers: {
                    Authorization: authorizationToken,
                },
            });
            const result = await response.json();
            if (response.ok) {
                setData(result);
            } else {
                toast.error("Failed to fetch user data");
            }
        } catch (error) {
            console.error(error);
            toast.error("An error occurred while fetching user data.");
        }
    };

    useEffect(() => {
        getSingleUserData(params.id);
    }, [params.id]);

    const handleInput = (e) => {
        const fieldName = e.target.name;
        const fieldValue = e.target.value;
        setData({ ...data, [fieldName]: fieldValue });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await fetch(`https://mern2024-backend.onrender.com/api/admin/users/update/${params.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: authorizationToken,
                },
                body: JSON.stringify(data),
            });
    
            if (response.ok) {
                toast.success("User updated successfully");
                getSingleUserData(params.id);
            } else {
                const errorData = await response.json();
                toast.error(`Error: ${errorData.message || "Failed to update user"}`);
            }
        } catch (error) {
            console.error("Fetch error:", error);
            toast.error("An error occurred while updating user data. Please check your server.");
        }
    };
    
    return (
        <>
            <section className="admin-section-form">
                <div className="contact-content container">
                    <h1 className="main-heading">Update User Data</h1>
                </div>

                <div className="container grid grid-two-cols">
                    <div className="section-form">
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="username">Username</label>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    placeholder="Enter your username"
                                    required
                                    autoComplete="off"
                                    value={data.username}
                                    onChange={handleInput}
                                    aria-label="Username"
                                />
                            </div>

                            <div>
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    required
                                    autoComplete="off"
                                    value={data.email}
                                    onChange={handleInput}
                                    aria-label="Email"
                                />
                            </div>

                            <div>
                                <label htmlFor="phone">Phone</label>
                                <input
                                    type="text"
                                    id="phone"
                                    name="phone"
                                    placeholder="Enter your phone"
                                    required
                                    autoComplete="off"
                                    value={data.phone}
                                    onChange={handleInput}
                                    aria-label="Phone"
                                />
                            </div>

                            <div>
                                <button className="btn btn-submit" type="submit">
                                    Update
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
};
