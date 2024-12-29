import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import NavComponent from "./NavComponent";
import { useEffect, useState } from "react";

export default function DashSection() {
    const prop = useLocation();
    const [section, setSection] = useState(prop.state?.section);
    const [navOn, setNavOn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if(section) {
            navigate(section, {replace : true});
        }
    },[section, navigate]);

    function handleSection(SelectedSection) {
        setSection(SelectedSection);
    }

    function handleNav() {
        setNavOn(!navOn);
    }

    return (
        <div>
            <div className="nav-form"><NavComponent className="blur"/></div>
            <div className="dash-section prod-font">
                <button className={`dash-nav-btn ${navOn ? "nav-hamburger-dash-on" : "nav-hamburger-dash-off"}`} onClick={handleNav}><span className={`${navOn ? "bi bi-x-lg" : "bi bi-list"}`} /></button>
                <aside className="side-nav">
                    <h4>MY ACCOUNT</h4>
                    <div className="side-nav-btns">
                        <Link to="orders" className={section === "orders" ? "tab-active" : "nav-tab"} onClick={() => handleSection("orders")}>Orders and Returns</Link>
                        <Link to="credit" className={section === "credit" ? "tab-active" : "nav-tab"} onClick={() => handleSection("credit")}>Account Credit</Link>
                        <Link to="address" className={section === "address" ? "tab-active" : "nav-tab"} onClick={() => handleSection("address")}>Address Book</Link>
                        <Link to="connected" className={section === "connected" ? "tab-active" : "nav-tab"} onClick={() => handleSection("connected")}>Connected Services</Link>
                    </div>
                </aside>
                <main>
                    <Outlet/>
                </main>
            </div>
        </div>
    )
}