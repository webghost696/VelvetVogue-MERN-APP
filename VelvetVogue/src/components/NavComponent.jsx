import { Link } from "react-router-dom"

export default function NavComponent(props) {
    const user = document.cookie;
    let value = user.split("name=");
    if (value.length === 2) value =  value.pop().split(';').shift();
    else value = "";

    return (
        <div className={`position-fixed nav-fixed ${props.className}`}>
            <h1 className="text-center font">Velvet Vogue</h1>
                <div className="z-1 links">
                    <Link to="/">Home</Link>
                    <Link to="/login">SignUp/Login</Link>
                    <Link to="/products">Products</Link>
                    <Link to={`/dashboard/${value}`}>Dashboard</Link>
                </div>
        </div>
    )
}