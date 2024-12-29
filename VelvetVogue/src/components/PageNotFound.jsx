import { useNavigate } from "react-router-dom"

export default function PageNotFound() {
    const navigate = useNavigate();
    return (
        <div>
            <img src="404-Page.gif"  className="error_404" alt="Err-404"/>
            <button onClick={() => navigate("/")} className="go-to-home-btn" >Go To Home</button>
        </div>
    )
}