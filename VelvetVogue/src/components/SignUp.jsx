import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as yup from 'yup';
import axios from "axios";
import NavComponent from "./NavComponent";

export default function ShopSignUp(){
    const [showPassword, setshowPassword] = useState(false);
    const [focused, setFocused] = useState({});
    const [users, setUsers] = useState();
    const [showMessage, setShowMsg] = useState(false);
    const [messageOpacity ,setMessageOpacity] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:4000/getusers")
        .then(res => {
            setUsers(res.data);
        })
        .catch((err) => {
            console.log("Some Error Occured", err);
        })
    },[])
    const formik = useFormik({
        initialValues : {
            Name : '',
            Email : '',
            Mobile : '',
            Password : ''
        },
        validationSchema : yup.object({
            Name : yup.string().required("Name required"),
            Email : yup.string().required("Email required").matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid Email"),
            Mobile : yup.string().matches(/^\d{10}$/, "Invalid Mobile Number"),
            Password : yup.string().min(8, "Password must be at least 8 characters long")
        }),
        onSubmit : (res) => {
            try {
                const findUser = users.find(user => user.Email === res.Email);
                if(findUser){
                    setShowMsg(true);
                    setMessageOpacity(1);

                    setTimeout(() => {
                        setMessageOpacity(0);
                        setTimeout(() => {
                            setShowMsg(false);
                        }, 500);
                    }, 3000);
                }
                else {
                    var reg = axios.post("http://localhost:4000/registeruser", res);
                    console.log("User Registered Successfully");
                    navigate("/");
                }
                
            }
            catch {
                console.error("There was a problem");
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
            <div className="nav-form"><NavComponent className="blur" /></div>
            <form onSubmit={formik.handleSubmit}>   
                <dl className="reg-form">
                    <h5 className="text-center">Register</h5>
                    <div className="form-div">
                        <dt>Name*</dt>
                        <dd><input value={formik.values.Name} onChange={formik.handleChange} onFocus={() => handleFocus("Name")} onBlur={() => handleBlur("Name")} name="Name" type="text" className="input-reg"/></dd>
                        <dd className="text-danger">{!focused.Name && formik.touched.Name && formik.errors.Name}</dd>
                        <dt className="mt-4">Email*</dt>
                        <dd><input value={formik.values.Email} onChange={formik.handleChange} onFocus={() => handleFocus("Email")} onBlur={() => handleBlur("Email")} name="Email" type="text" className="input-reg"/></dd>
                        <dd className="text-danger">{!focused.Email && formik.touched.Email && formik.errors.Email}</dd>
                        <dt className="mt-4">Mobile*</dt>
                        <dd><input value={formik.values.Mobile} onChange={formik.handleChange} onFocus={() => handleFocus("Mobile")} onBlur={() => handleBlur("Mobile")} name="Mobile" type="text" className="input-reg"/></dd>
                        <dd className="text-danger">{!focused.Mobile && formik.touched.Mobile && formik.errors.Mobile}</dd>
                        <dt className="mt-4">Password*</dt>
                        <dd><input value={formik.values.Password} onChange={formik.handleChange} onFocus={() => handleFocus("Password")} onBlur={() => handleBlur("Password")} name="Password" type={showPassword ? "text" : "password"} className="input-reg"/>
                        <span onClick={togglePasswordVisibility} className="eyeButton">
                            <i className={`bi ${showPassword ? "bi-eye" : "bi-eye-slash"}`}></i>
                        </span>
                        </dd>
                        <dd className="text-danger">{!focused.Password && formik.touched.Password && formik.errors.Password}</dd>
                    </div>

                    <button className="reg-btn" type="submit">Create Account</button>
                    <p className="para-form">ALREADY HAVE AN ACCOUNT? <Link to="/login" >LOGIN</Link></p>
                </dl>
            </form>
            {showMessage && <div className="message" style={{ opacity: messageOpacity }}>User Already Exist</div>}
        </div>
    );
}