import { useEffect, useState } from "react";
import NavComponent from "./NavComponent";
import axios from "axios";
import ShopCart from "./cartItems";
import { Link } from "react-router-dom";

export default function ShopProducts() {
    const [products, setProd] = useState([]);
    const [filteredProds, setFilteredProds] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [cartTotal, setCartTotal] = useState(0);
    const [cartMsg, setCartMsg] = useState(false);
    const [Msg, setMsg] = useState("");
    const [msgClass, setMsgClass] = useState("cart-msg");
    const [iconClass, setIconClass] = useState("bi bi-cart-check-fill");
    const user = document.cookie;

    const openPopup = () => setIsPopupOpen(true);
    const closePopup = () => setIsPopupOpen(false);

    useEffect(() => {
        const getProds = async () => {
            const prods = await axios.get("http://localhost:4001/clothing")
            .then(res => {
                setProd(res.data);
                setFilteredProds(res.data);
            })
            .catch(err => {
                console.log(`There was an error in fetching data ${err}`, prods?.status);
            });
        }

        getProds();
    }, []);

    useEffect(() => {
        getTotalPrice();
    }, [cartItems]);

    function handleCategoryChange(e) {
        const val = e.target.value.toLowerCase();
        if (val === "men") {
            setFilteredProds(products.filter(prod => prod.category === "men"));
        } else if (val === "women") {
            setFilteredProds(products.filter(prod => prod.category === "women"));
        } else {
            setFilteredProds(products);
        }
    }

    async function handleCartItems(id) {
        const prod_id = parseInt(id);
        if (cartItems.some(item => item.id === prod_id)) {
            setMsg("Item Already In Cart");
            setCartMsg(true);
            setTimeout(() => {
                setCartMsg(false);
            }, 2000);
            return;
        }
        
        try {
            const res = await axios.get(`http://localhost:4001/clothing/${prod_id}`);
            setCartItems([...cartItems, res.data]);
            setMsg("Item Added To Cart")
            setCartMsg(true);
            setTimeout(() => {
                setCartMsg(false);
            }, 2000);
        }
        catch (err){
            console.error("There was an error fetching the cart data", err);
        }
    }

    function getTotalPrice() {
        const total = cartItems.reduce((a, b) => a + (b.price || 0), 0);
        setCartTotal(total);
    }

    function handleRemoveCart(itemId) {
        const updatedCart = cartItems.filter(cartItem => cartItem.id !== itemId);
        setCartItems(updatedCart);
    }

    function userCheck() {
        if(!user) {
            setMsg("You should login to checkout");
            setMsgClass("cart-err-msg");
            setIconClass("bi bi-x-circle");
            setCartMsg(true);
            setTimeout(() => {
                setCartMsg(false);
                setMsgClass("cart-msg");
                setIconClass("bi bi-cart-check-fill");
            }, 2000);
        }
    }

    return (
        <div className="container-fluid prod-container">
            <div className="nav-form"><NavComponent className="blur" /></div>
            <main className="prod-main prod-font">
                <div className="select-div">
                    <select onChange={handleCategoryChange} className="category-select">
                        <option hidden disabled selected>Category</option>
                        <option>All</option>
                        <option>Men</option>
                        <option>Women</option>
                    </select>
                    <button className="bi bi-cart cart-icon" onClick={openPopup}> Cart</button>
                </div>
                
                {
                    cartMsg && (
                        <p className={msgClass}><span className={iconClass}> {Msg}</span></p>
                    )
                }

                <div className="cartPopup">
                    <ShopCart isOpen={isPopupOpen} onClose={closePopup}>
                        <h1>Shopping Cart</h1>
                        {
                            cartItems.length ? (
                                <main className="cart-prod-content">
                                    <div className="cart-prod-details">
                                        {cartItems.map(item =>
                                            <div className="cart-prod" key={item.id}>
                                                <div className="cart-content prod-desc">
                                                    <img className="cart-prod-img" src={item.image} alt="Product" />
                                                    <div className="prod-description">
                                                        <p>{item.title}</p>
                                                        <p>Price : {item.price}</p>
                                                    </div>
                                                    <button className="remove-btn" onClick={() => handleRemoveCart(item.id)}>X</button>
                                                </div>
                                                <hr />
                                            </div>
                                        )}
                                    </div>
                                    <div className="cart-summary">
                                        <h2>Summary</h2>
                                        <hr />
                                        <p>Subtotal <span className="value">Rs. {cartTotal}</span></p>
                                        <p>Delivery <span className="value">Rs. 299</span></p>
                                        <hr />
                                        <h4>Total <span className="value">Rs.{cartTotal + 299}</span></h4>
                                        <Link to={`${user ? "/products/order" : "/products"}`}><button onClick={userCheck} className="checkout-btn">Checkout</button></Link>
                                    </div>
                                </main>
                            ) : (
                                <div className="empty-cart-div">
                                    <h1>Cart Is Empty</h1>
                                    <span className="bi bi-cart2 empty-cart"></span>
                                </div>
                            )
                        }
                    </ShopCart>
                </div>

                <div className="prods">
                    {filteredProds.map(prod =>
                        <div className="card-div card m-2 p-2" key={prod.id} style={{ width: "20vw" }}>
                            <img src={prod.image} alt="Product" loading="lazy" className="prod-img" />
                            <button className="cart-button" onClick={() => handleCartItems(prod.id)}><span className="bi bi-cart"/></button>
                            <div className="card-det card card-body" style={{ height: "160px" }}>
                                <p>{prod.title}</p>
                                <dl style={{ position: "absolute", top: "70%" }}>
                                    <dt>Rs. {prod.price}</dt>
                                    <dt>Rating : {prod.rating}</dt>
                                </dl>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}