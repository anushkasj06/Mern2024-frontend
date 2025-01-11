import { NavLink } from "react-router-dom";
import { useAuth } from "../store/auth";

export const About =()=>{

    const {user} = useAuth();
    return (
        <>
        <main>
        <section className="section-hero">
            <div className="container grid grid-two-cols">
                <div className="hero-content">
                    <p>Welcome, {user ? `${user.username} to our website` : "to our Website"}</p>
                    <h1>Why Choose Us?</h1>
                    <p>
                    Expertise: Our team consists of experienced IT professionals who are
                    passionate about stoying up-to-date with the latest industry trend's
                    <br />
                    <br />
                    Customnization: We understand that every business Is unique. That's why
                    we create solutions that are tailored to your specific needs and goals
                    <br />
                    <br />
                    Customer-Contric Approach: We prioritize your satisfaction and provide
                    top-notch support to oddress your IT concerns
                    <br />
                    <br />
                    Affordability: We offer competitive pricing without compromising on the
                    quality of our services.
                    <br />
                    <br />
                    Reliability: Count on us to be there when you need us. We're committed
                    to ensuring your IT environment is reliable and avalilable 24/7
                    </p>
                    <div className="btn btn-group">
                        <NavLink to="/contact">
                            <button className="btn"> connect now</button>
                        </NavLink>
                        <NavLink to="/service">
                            <button className="btn secondary-btn">Learn More</button>
                        </NavLink>
                    </div>
                </div>

                <div className="hero-image">
                    <img src="/images/about.png" alt="" width="400" height="400"/>
                </div>

            </div>
        </section>
        </main>

        <section className="section-analytics">
            <div className="container grid grid-four-cols">
                <div className="div1">
                    <h2>50+</h2>
                    <p>registered companies</p>
                </div>
                <div className="div1">
                    <h2>100,00+</h2>
                    <p>Happy Clients</p>
                </div>
                <div className="div1">
                    <h2>500+</h2>
                    <p>Well Known Developers</p>
                </div>
                <div className="div1">
                    <h2>24/7</h2>
                    <p>Services</p>
                </div>
            </div>
        </section>

        </>
    )
};

