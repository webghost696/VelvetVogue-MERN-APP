import { useState } from "react"

export default function Orders() {
    const [active, setActive] = useState("orders");

    return (
        <div className="rno-page prod-font">
            <h2 style={{marginLeft: "3%"}}>Orders and Returns</h2>
            <div className="switch-btns">
                <button className={`${active === "orders" ? "focused" : "switch-btn"}`} onClick={() => setActive("orders")}>Orders</button>
                <button className={`${active === "returns" ? "focused" : "switch-btn"}`} onClick={() => setActive("returns")}>Returns</button>
            </div>
            <div className="section-content">
                {
                    active === "orders" && (
                        <div className="rno-content">
                            <p>Track your orders, request a return or check your order history</p>
                            <div className="rno-msg">
                                <span className="bi bi-box2-heart box-icon"/>
                                <h4>You currently have no orders</h4>
                                <p>When you've placed an order, you'll find all the details here.</p>
                            </div>
                        </div>
                    )
                }
                {
                    active === "returns" && (
                        <div className="rno-content">
                            <p>Check the progress of your returns, reschedule collection and print your return documents</p>
                            <div className="rno-msg">
                                <span className="bi bi-box2-heart box-icon"/>
                                <h4>You currently have no returns</h4>
                                <p>You can start a return request from the order tracker.</p>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}