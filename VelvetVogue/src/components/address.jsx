import axios from "axios";
import { useState, useEffect } from "react";
import AddressForm from "./addressForm";

export default function AddressSection() {
    const [savedAddress, setSavedAddress] = useState([]);
    const [saved, setSaved] = useState(false);
    const [addAddress, setAddAddress] = useState(false);
    const [msg, setMsg] = useState("");
    const [msgOpacity, setMsgOpacity] = useState(0);
    const value = document.cookie;
    let user = value.split("name=");
    user =  user.pop().split(';').shift();
    user = user.replaceAll("%20", "");

    useEffect(() => {
        fetchAddresses();
    });

    const fetchAddresses = async () => {
        await axios.get(`http://localhost:4001/getaddress/${user}`)
        .then(res => {
            setSavedAddress(res.data);
            setSaved(res.data.length > 0);
        })
        .catch((err) => {
            console.log("There was an error", err);
        });
    };

    function handleAddressSubmit(val) {
        if(val) setMsg("Address Already Exists");
        else setMsg("Address Saved Successfully");
        fetchAddresses();
        setAddAddress(false);
        setMsgOpacity(1);
        setTimeout(() => {
            setMsgOpacity(0);
            setMsg("");
        }, 2000); 
    }

    async function removeAddress(id) {
        try {
            const res = await axios.delete(`http://localhost:4001/delete/${user}/${id}`);
            if(res.status === 200) {
                console.log("Address Deleted Successfully");
                setSavedAddress(savedAddress.filter(address => address._id !== id));
                fetchAddresses();
            }
            else {
                console.error("There was an error");
            }
        }
        catch {
            console.error("There was an error removing the address");
        }

    }
    
    return (
        <div>
            <h1>Address Book</h1>
            {
                saved ? (
                    <div className="mt-5">
                        <p style={{ opacity : `${msgOpacity}`}} className="address-add-msg"><span className="bi bi-check"/>{msg}</p>
                        {
                            savedAddress.map(address => 
                                <div className="saved-add" key={address._id}>
                                    <div className="add-name" style={{fontWeight : "600"}}>{address.Name}</div>
                                    <div className="add-info">
                                        <p>{address.Address}</p>
                                        <p>{address.City}</p>
                                        <p>{address.Zipcode}</p>
                                    </div>
                                    <button onClick={() => removeAddress(address._id)} className="del-btn"><span className="bi bi-trash-fill" ></span> Delete</button>
                                </div>
                            )
                        }
                        <button onClick={() => setAddAddress(!addAddress)} className="btn btn-dark mb-3"><span className="bi bi-plus"/> Add Address</button>
                        {addAddress && <AddressForm onSubmit={handleAddressSubmit} state={{userName : user}}/>}
                    </div>

                ) : (
                    <div className="address-content">
                        <p>Your saved addresses</p>
                        <h6 style={{fontWeight : "600"}}>You currently have no saved addresses</h6>
                        <h6>Add an address for a quicker checkout experience</h6>
                        <p className="mt-4">Please complete the form in alphanumeric characters only</p>
                        <AddressForm onSubmit={handleAddressSubmit} state={{userName : user}}/>
                    </div>
                )
            }
        </div>
    )
}