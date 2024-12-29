import { Link, useLocation, useNavigate } from "react-router-dom"
import NavComponent from "./NavComponent"
import { useCookies } from "react-cookie";
import { useEffect } from "react";

export default function ShopDashboard(){
    const location = useLocation();
    const [cookie, setCookie, removeCookie] = useCookies(["name"]);
    const navigate = useNavigate()
    const userDetails = location.state;
    
    useEffect(() => {
        if (userDetails && userDetails.Name && !cookie.name) {
            setCookie("name", userDetails.Name, {path : "/", expires : new Date("2025-11-23 21:42")});
        }
    }, [userDetails, setCookie, cookie.name]);

    const username = cookie.name;
    
    function handleSignOut() {
        removeCookie("name", {path : "/"});
        navigate("/login");
    }

    return (
        <div>
            <div className="nav-form"><NavComponent className="blur" /></div>
            {
                username && (
                    <div className="user-content prod-font">
                        <main className="dashboard-main">
                            <h1 className="mt-5" style={{fontWeight : "700"}}>WELCOME TO YOUR ACCOUNT, {username}</h1>
                            <div className="services">
                                <Link to="dashSection" className="service-box" state={{user : username, section : "orders"}}>
                                    <h4>ORDERS AND RETURNS</h4>
                                    <p>Track your orders or arrange a return</p>
                                </Link>
                                <Link to="dashSection" className="service-box" state={{user : username, section : "credit"}}>
                                    <h4>ACCOUNT CREDIT</h4>
                                    <p>View your credit balance and history</p>
                                </Link>
                                <Link to="dashSection" className="service-box" state={{user : username, section : "address"}}>
                                    <h4>ADDRESS BOOK</h4>
                                    <p>View your saved billing and delivery address</p>
                                </Link>
                                <Link to="dashSection" className="service-box" state={{user : username, section : "connected"}}>
                                    <h4>CONNECTED SERVICES</h4>
                                    <p>Manage your linked apps and services</p>
                                </Link>
                            </div>
                        </main>
                        <footer className="dash-foot">
                            <div className="foot-content">
                                <p>Not {username}?</p>
                                <p style={{cursor : "pointer", textDecoration : "underline"}} onClick={handleSignOut}>Sign-out</p>
                            </div>
                        </footer>
                    </div>
                )
            }
        </div>
    )
}