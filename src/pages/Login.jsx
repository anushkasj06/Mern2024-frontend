import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import {toast} from 'react-toastify';
//import 'react-toastify/dist/ReactToastify.css';





export const Login =()=>{

    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    const {storetokenInLS, API} = useAuth();

    const handleInput = (e)=>{
        const name = e.target.name;
        const value = e.target.value;

      setUser((prev)=>({
        ...prev,
        [name]: value
      }));
    };

    const navigate = useNavigate();


    const handleSubmit = async (e)=>{
        e.preventDefault();
        try{
           const response = await fetch(`${API}/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
           }); 

           console.log("login form: ",response);
           const res_data = await response.json();
            console.log("res from server",res_data);
           
           if(response.ok){
            storetokenInLS(res_data.token);
            //localStorage.setItem("token",res_data.token);

            setUser({
                email: "",
                password: ""
            });
            toast.success("Login successful!");
            navigate("/");
           }else{
            toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
            console.log("invalid credentials")
           }
        }catch(error){
            console.log("login", error);
        }

    };



    return (
        <>
        <section>
            <main>
                <div className="section-registration">
                    <div className="container grid grid-two-cols">
                        <div className="registration-image">
                            <img src="/images/login.png" alt="a girl" width="500" height="500" />
                        </div>
                        <div className="registration-form">
                            <h1 className="main-heading mb-3">Login Form</h1>
                            <br />
                            <form onSubmit={handleSubmit}>

                                <div>
                                <label htmlFor="email">email</label>
                                <input
                                type="text" 
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
                                <label htmlFor="password">password</label>
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
                                <button type="submit" className="btn btn-submit">Login</button>

                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </section>
        
        </>
    )
};