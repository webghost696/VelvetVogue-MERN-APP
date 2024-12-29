import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as yup from 'yup';
import axios from "axios";
import NavComponent from "./NavComponent";

export default function ShopLogin(){
    const [users, setUsers] = useState();
    const [showPassword, setshowPassword] = useState(false);
    const [focused, setFocused] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:4000/getusers")
        .then(res => {
            setUsers(res.data);
        });
    },[]);

    useEffect(() => {
        const userCookie = document.cookie
            .split('; ')
            .find(row => row.startsWith('name='));

        const user = userCookie ? decodeURIComponent(userCookie.split('=')[1]) : null;

        if (user) {
            navigate(`/dashboard/${user}`);
        }
    }, [navigate]);
    const formik = useFormik({
        initialValues : {
            Email : '',
            Password : ''
        },
        validationSchema : yup.object({
            Email : yup.string().required("Email is required").matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid Email"),
            Password : yup.string().required("Password is required").min(8, "Password must be at least 8 characters long")
        }),
        onSubmit : values => {
            try {
                const obj = users.find(value => value.Email === values.Email);
                if((obj.Email === values.Email) && obj.Password === values.Password){
                    alert("Login Successful");
                    navigate(`/dashboard/${obj.Name}`, {state : obj});
                }
                else {
                    alert("Wrong Password");
                }
            }
            catch {
                alert("Invalid Credentials");
            }
        }
    });

    function togglePasswordVisibility() {
        setshowPassword(!showPassword);
    }

    const handleFocus = (field) => {
        setFocused((prev) => ({ ...prev, [field]: true }));
    };
    
    const handleBlur = (field) => {
        setFocused((prev) => ({ ...prev, [field]: false }));
        formik.handleBlur(field);
    };

    return (
        <div className="container-fluid">
            <div className="nav-form"><NavComponent className="blur"/></div>
            <form onSubmit={formik.handleSubmit}>   
                <dl className="reg-form">
                    <h5 className="text-center">Login</h5>
                    <div className="form-div">
                        <dt className="mt-4">Email*</dt>
                        <dd><input value={formik.values.Email} onChange={formik.handleChange} onFocus={() => handleFocus("Email")} onBlur={() => handleBlur("Email")} name="Email" type="text" className="input-reg"/></dd>
                        <dd className="text-danger">{!focused.Email && formik.touched.Email && formik.errors.Email}</dd>
                        <dt className="mt-4">Password*</dt>
                        <dd><input value={formik.values.Password} onChange={formik.handleChange} onFocus={() => handleFocus("Password")} onBlur={() => handleBlur("Password")} name="Password" type={showPassword ? "text" : "password"} className="input-reg"/>
                        <span onClick={togglePasswordVisibility} className="eyeButton">
                            <i className={`bi ${showPassword ? "bi-eye" : "bi-eye-slash"}`}></i>
                        </span>
                        </dd>
                        <dd className="text-danger">{!focused.Password && formik.touched.Password && formik.errors.Password}</dd>
                    </div>

                    <button className="reg-btn" type="submit">Login</button>
                    <p className="para-form">DON'T HAVE AN ACCOUNT? <Link to="/signup">CREATE AN ACCOUNT</Link></p>
                </dl>
            </form>
        </div>
    )
}