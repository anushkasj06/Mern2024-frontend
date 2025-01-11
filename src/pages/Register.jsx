import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import {toast} from "react-toastify";


export const Register = () => {
    const [user, setUser] = useState({
        username: "",
        email: "",
        phone: "",
        password: "",
    });

    const {storetokenInLS, API} = useAuth();


    const navigate = useNavigate();

    const handleInput = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${API}/api/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            });

            const res_data = await response.json();
            console.log("res from server",res_data.extraDetails);

            if (response.ok) {

               
                storetokenInLS(res_data.token);
                //localStorage.setItem("token",res_data.token);
                setUser({
                    username: "",
                    email: "",
                    phone: "",
                    password: "",
                });
                toast.success("Registration successful!");
                navigate("/");
            } else {
                toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
            }
        } catch (error) {
            console.error("Error during registration:", error.message);
            toast.error(`Error: ${error.message || "Something went wrong"}`);
        }
    };

    return (
        <>
            <section>
                <main>
                    <div className="section-registration">
                        <div className="container grid grid-two-cols">
                            <div className="registration-image">
                                <img
                                    src="/images/register.png"
                                    alt="a girl"
                                    width="500"
                                    height="500"
                                />
                            </div>
                            <div className="registration-form">
                                <h1 className="main-heading mb-3">Registration Form</h1>
                                <br />
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
                                            value={user.username}
                                            onChange={handleInput}
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
                                            value={user.email}
                                            onChange={handleInput}
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="phone">Phone</label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            placeholder="Enter your phone"
                                            required
                                            autoComplete="off"
                                            value={user.phone}
                                            onChange={handleInput}
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="password">Password</label>
                                        <input
                                            type="password"
                                            id="password"
                                            name="password"
                                            placeholder="Enter your password"
                                            required
                                            autoComplete="off"
                                            value={user.password}
                                            onChange={handleInput}
                                        />
                                    </div>

                                    <br />
                                    <button type="submit" className="btn btn-submit">
                                        Register Now
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </main>
            </section>
        </>
    );
};
