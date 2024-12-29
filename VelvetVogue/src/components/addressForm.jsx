import { useFormik } from "formik";
import { useState } from "react";
import * as yup from "yup";
import axios from "axios";
export default function AddressForm({onSubmit, state}) {
    const [focused, setFocused] = useState({});


    const formik = useFormik({
        initialValues : {
            Name : "",
            Address : "",
            City : "",
            Zipcode : null
        },
        validationSchema : yup.object({
            Name : yup.string().required("Name required"),
            Address : yup.string().required("Address required"),
            City : yup.string().required("City required"),
            Zipcode : yup.number().required("Zipcode required")
        }),
        onSubmit : (values) => {
            axios.get(`http://localhost:4001/getaddress/${state.userName}/${values.Name}`)
            .then((res) => {
                if(res.data.length === 0){
                    axios.post(`http://localhost:4001/savedaddresses/${state.userName}`, values)
                    .then(() => onSubmit(false));
                }
                else {
                    onSubmit(true);
                }
            })
            .catch(() => {
                console.error("There was a problem");
            });   
        }
    });

    const handleFocus = (field) => {
        setFocused((prev) => ({ ...prev, [field]: true }));
    };
    
    const handleBlur = (field) => {
        setFocused((prev) => ({ ...prev, [field]: false }));
        formik.handleBlur(field);
    };

    return (
        <div className="address-content">
            <form onSubmit={formik.handleSubmit}>
                <dl>
                    <dt className="label">Name*</dt>
                    <dd><input value={formik.values.Name} onFocus={() => handleFocus("Name")} onBlur={() => handleBlur("Name")} onChange={formik.handleChange} name="Name" type="text" className="input-box-address" /></dd>
                    <dd className="text-danger mb-4">{!focused.Name && formik.touched.Name && formik.errors.Name}</dd>
                    <dt className="label">Address*</dt>
                    <dd><input value={formik.values.Address} onFocus={() => handleFocus("Address")} onBlur={() => handleBlur("Address")} onChange={formik.handleChange} name="Address" type="text" className="input-box-address"/></dd>
                    <dd className="text-danger mb-4">{!focused.Address && formik.touched.Address && formik.errors.Address}</dd>
                    <dt className="label">City*</dt>
                    <dd><input value={formik.values.City} onFocus={() => handleFocus("City")} onBlur={() => handleBlur("City")} onChange={formik.handleChange} name="City" type="text" className="input-box-address"/></dd>
                    <dd className="text-danger mb-4">{!focused.City && formik.touched.City && formik.errors.City}</dd>
                    <dt className="label">Zip Code*</dt>
                    <dd><input value={formik.values.Zipcode} onFocus={() => handleFocus("Zipcode")} onBlur={() => handleBlur("Zipcode")} onChange={formik.handleChange} name="Zipcode" type="number" className="input-box-address" /></dd>
                    <dd className="text-danger mb-4">{!focused.Zipcode && formik.touched.Zipcode && formik.errors.Zipcode}</dd>
                </dl>
                <button type="submit" className="btn btn-dark">Save</button>
            </form>
        </div>
    )
}