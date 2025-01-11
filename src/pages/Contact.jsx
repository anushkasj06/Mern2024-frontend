import { useState } from "react";
import { useAuth } from "../store/auth";
import {toast} from "react-toastify";

const defaultContactFormData = {
    username: "",
    email: "",
    message: "",
};

export const Contact = () => {
    const [contact, setContact] = useState(defaultContactFormData);

    const [userData, setUserData] = useState(true);
    const { user, API } = useAuth();

    if(userData && user){
        setContact({
            username: user.username,
            email: user.email,
            message: "",    
        });
        setUserData(false);
    }

    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setContact({ ...contact, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(contact);
        
        try {
            const response = await fetch(
                `${API}/api/form/contact`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(contact),
                }
            );

            if(response.ok){
                setContact(defaultContactFormData);
                const data = await response.json();
                console.log(data);
                toast.success("Message submitted successfully");
            }
        } catch (error) {

            toast.error(`Error: ${error.message || "Something went wrong"}`);
            console.log(error.message);
            
        }
    };

    return (
        <>
            <section className="section-contact">
                <div className="contact-content container">
                    <h1 className="main-heading">Contact Us</h1>
                </div>

                <div className="container grid grid-two-cols">
                    <div className="contact-img">
                        <img src="images/support.png" alt="Support" width="500" height="500" />
                    </div>

                    <div className="section-form">
                        {/* Corrected 'for' to 'form' */}
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
                                    value={contact.username}
                                    onChange={handleInput}
                                />
                            </div>

                            <div>
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email" // Changed type to 'email' for better validation
                                    id="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    required
                                    autoComplete="off"
                                    value={contact.email}
                                    onChange={handleInput}
                                />
                            </div>

                            <div>
                                <label htmlFor="message">Message</label>
                                <textarea
                                    name="message"
                                    id="message"
                                    cols="30"
                                    rows="10"
                                    required
                                    autoComplete="off"
                                    value={contact.message}
                                    onChange={handleInput}
                                    placeholder="Enter your message"
                                ></textarea>
                            </div>

                            <div>
                                <button className="btn btn-submit" type="submit">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>

                <section>
    <iframe 
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3594.3089666997475!2d73.75658339999998!3d18.60062060000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2b9dc4ce5ac9f%3A0x7fdeb0087efc3a7f!2sPhoenix%20Mall%20of%20the%20Millennium!5e1!3m2!1sen!2sin!4v1735979299925!5m2!1sen!2sin"
        width="100%"
        height="450"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
</section>

            </section>
        </>
    );
};
