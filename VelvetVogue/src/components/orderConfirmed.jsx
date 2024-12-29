import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import NavComponent from "./NavComponent";

export default function OrderConfirmed() {
    const [showBtn, setShowBtn] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowBtn(true);
        }, 1800);

        return () => clearTimeout(timer);
    },[]);
    return (
        <div className="container-fluid prod-font">
            <div className="nav-form"><NavComponent className="blur" /></div>
            <div className="order-div">
                <h1 className="order-msg"><span className="bi bi-bag-check-fill"></span> Order Confirmed</h1>
                <Link to="/products"><button className={`return-btn ${showBtn ? "visible" : ""}`}>Continue Shopping</button></Link>
            </div>
        </div>
    )
}