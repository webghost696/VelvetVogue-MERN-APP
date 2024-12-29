import { BrowserRouter, Link, Route, Routes, useNavigate } from "react-router-dom";
import "./index.css";
import { useEffect } from "react";
import ShopLogin from "./Login";
import ShopProducts from "./Products";
import ShopSignUp from "./SignUp";
import NavComponent from "./NavComponent";
import ScrollReveal from "scrollreveal";
import ShopDashboard from "./ShopDashboard";
import OrderConfirmed from "./orderConfirmed";
import DashSection from "./dashSection";
import Orders from "./orders";
import Credit from "./credit";
import AddressSection from "./address";
import ConnectedServices from "./connected";
import PageNotFound from "./PageNotFound";

export function Home() {
    const navigate = useNavigate();

    useEffect(() => {
        ScrollReveal().reveal('.reveal', {
            distance : "150px",
            duration : 1000,
            easing : "ease-in-out",
            origin : "bottom",
            reset : false
        });
        ScrollReveal().reveal('.reveal2', {
            distance : "150px",
            duration : 1000,
            easing : "ease-in-out",
            origin : "bottom",
            reset : false
        });
        ScrollReveal().reveal('.rightReveal', {
            distance : "150px",
            duration : 1000,
            easing : "ease-in-out",
            origin : "right",
            reset : false
        });
        ScrollReveal().reveal('.leftReveal', {
            distance : "150px",
            duration : 1000,
            easing : "ease-in-out",
            origin : "left",
            reset : false
        });
    }, []);

    return (
        <div>
            <nav className="nav d-flex flex-column">
                <img className="position-absolute" src="coverImg.jpg" alt="CoverImg"/>
                <NavComponent className="blur"/>
            </nav>
            <section className="mt-5 section2">
                <div>
                    <h1 className="text-center reveal bebas-neue-regular">New Arrivals</h1>
                        <div className="imgs bebas-neue-regular">
                            <div className="img-boxes">
                                <div className="box leftReveal img1" onClick={() => navigate("/products")}></div>
                                <p>Abstract Monochrome Print Midi Skirt with Cutout Long Sleeve Crop Top</p>
                            </div>
                            <div className="img-boxes">
                                <div className="box reveal2 img2" onClick={() => navigate("/products")}></div>
                                <p>Unisex Beige Blazer Suit Set - Modern Minimalist Collection</p>
                            </div>
                            <div className="img-boxes">
                                <div className="box reveal2 img3" onClick={() => navigate("/products")}></div>
                                <p>Urban Streetwear Layered Look - Plaid Overshirt & Vintage Dye Top Combo</p>
                            </div>
                            <div className="img-boxes">
                                <div className="box rightReveal img4" onClick={() => navigate("/products")}></div>
                                <p>Edgy Chic Ensemble - Asymmetric Blazer & Grid Pattern Skirt Set</p>
                            </div>
                        </div>
                    </div>
                <div className="reveal2 mt-5 d-flex justify-content-center">
                    <div className="outer-box1"><div className="box1 bebas-neue-regular"></div></div>
                    <Link to="/products"><button className="view-text bebas-neue-regular">VIEW</button></Link>
                </div>
            </section>
            <footer className="footer bebas-neue-regular">
                <div className="useful-links">
                    <div className="link-sets">
                        <p>Shipping To</p>
                        <a href="#">India <span className="bi bi-currency-rupee adjust-font"></span> / In</a>
                    </div>
                    <div className="link-sets">
                        <a href="#">Client Service</a>
                        <a href="#">Shipping And Returns</a>
                        <a href="#">Email Us</a>
                        <a href="#">Track Order</a>
                        <a href="#">Return Your Order</a>
                        <a href="#">Make an Appointment <span className="bi bi-chevron-right adjust-font"></span></a>
                    </div>
                    <div className="link-sets">
                        <a href="#">Cookie Settings</a>
                        <a href="#">Legal Notices</a>
                        <a href="#">Accessibility</a>
                        <a href="#">Career</a>
                    </div>
                    <div className="link-sets">
                        <a href="#">Subscribe To Our Newsletter <span className="bi bi-chevron-right adjust-font"></span></a>
                    </div>
                </div>
                <div className="icon-container">
                    <a href="https://www.instagram.com/yasshh16_/" className="bi bi-instagram icons" ></a>
                    <a href="https://www.linkedin.com/in/yash-habib-386304238/" className="bi bi-linkedin icons" ></a>
                    <a href="https://x.com/yash_habib16" className="bi bi-twitter-x icons" ></a>
                    <a href="https://www.facebook.com/yash.habib.3/" className="bi bi-facebook icons" ></a>
                </div>
            </footer>
        </div>
    );
}

export default function Routings(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/dashboard" element={<ShopLogin />} />
                <Route path="login" element={<ShopLogin/>} />
                <Route path="products" element={<ShopProducts />} />
                <Route path="signup" element={<ShopSignUp/>} />
                <Route path="/products/order" element={<OrderConfirmed/>} />
                <Route path="/dashboard/:user" element={<ShopDashboard />} />
                <Route path="/dashboard/:user/dashSection" element={<DashSection/>} >
                    <Route path="orders" element={<Orders/>} />
                    <Route path="address" element={<AddressSection/>} />
                    <Route path="credit" element={<Credit/>} />
                    <Route path="connected" element={<ConnectedServices/>} />
                </Route>
                <Route path="/dashboard/:user" element={<ShopDashboard />} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </BrowserRouter>
    );
}
