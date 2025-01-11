

export const Home =()=>{
    return (
        <>
        <main>
        <section className="section-hero">
            <div className="container grid grid-two-cols">
                <div className="hero-content">
                    <p>Hi Anushka Here, Happy to connects.</p>
                    <h1>Welcome to Anushka's Page</h1>
                    <p>
                    Are you ready to take your business to the next level and achieve 
                    unprecedented success with cutting-edge innovations by your side?
                    Look no further! At Anushka's Page, we specialize in delivering top-notch,
                     innovative IT services and solutions that are meticulously tailored to meet your
                      specific and unique needs.
                    Let us help you unlock the true potential of your business by combining creativity, 
                    technology, and expertise to drive remarkable results.
                    </p>
                    <div className="btn btn-group">
                        <a href="/contact">
                            <button className="btn"> connect now</button>
                        </a>
                        <a href="/service">
                            <button className="btn secondary-btn">Learn More</button>
                        </a>
                    </div>
                </div>

                <div className="hero-image">
                    <img src="/images/home.png" alt="" width="400" height="400"/>
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


        <section className="section-hero">
            <div className="container grid grid-two-cols">

                <div className="hero-image">
                    <img src="/images/design.png" alt="" width="400" height="400"/>
                </div>

                <div className="hero-content">
                    <p>We are here to help you</p>
                    <h1>Get Started Today</h1>
                    <p>
                        Ready to take the first step toward a more efficient and secure IT infastructure? 
                        Contact us Today for a fress consultation and Let's disscuss how
                        Anushka's page can help your bussiness thrive in the digital age.
                    </p>
                    <div className="btn btn-group">
                        <a href="/contact">
                            <button className="btn"> connect now</button>
                        </a>
                        <a href="/service">
                            <button className="btn secondary-btn">Learn More</button>
                        </a>
                    </div>
                </div>

                

            </div>
        </section>
        </>
    );
};
