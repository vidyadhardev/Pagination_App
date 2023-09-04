import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import "./CreateUser.css";
 
const Create = () => {
    const [name, nameChange] = useState("");
    const [email, emailChange] = useState("");
    const [phone, phoneChange] = useState("");
    const [age, ageChange] = useState("");
    const [active, activeChange] = useState(true);

    // State to store validation errors
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();
    const isValidEmail = (email) => {
        // Regular expression to check email validity
        const emailVailedationCheck = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailVailedationCheck.test(email);
    };
    const handleSubmit = (event) => {
        event.preventDefault();

        // Basic validation: Check if required fields are present.
        if (!name || !email || !phone || !age) {
            setErrors({ general: 'Please fill in all required fields.' });
            return;
        }
        // Check if the email is valid using the isValidEmail function.
        if (!isValidEmail(email)) {
            console.log("Please provide a valid email address.");
            return;
        }

        // Check if age is greater than or equal to 18.
        if (parseInt(age) < 18) {
            console.log("Age must be at least 18.");
            return;
        }

        const userData = { name, email, phone, age, active };
        console.log(name, email, phone, age, active);

        axios.post("http://localhost:8080/createUser", userData)
            .then(result => {
                console.log(result);
                navigate('/');
            })
            .catch(err => console.log(err));
    };
    //     fetch("http://localhost:8080/userData/", {
    //         method: "POST",
    //         headers: { "content-type": "application/json" },
    //         body: JSON.stringify(userData)
    //     }).then((res) => {
    //         // alert('saved successfully');
    //         navigate('/create');
    //     }).catch((err) => {
    //         console.log(err)
    //     })
    return (

        <div className="row d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className="lg-3 col-lg-6 " >
                <form className="container" onSubmit={handleSubmit}>
                    <div className="card">
                        <div className="card-title">
                            <h1 className="text-center">User_Create Form</h1>
                        </div>
                        <div className="card-body">
                            <div className="row ">
                                {/* Display general validation error message */}
                                {errors.general && <div className="text-danger mb-3">{errors.general}</div>}

                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label htmlFor=""> NAME</label>
                                        <input value={name}  placeholder="ENTER NAME" onChange={event => nameChange(event.target.value)} className="form-control" />
                                        {errors.name && <div className="text-danger">{errors.name}</div>}
                                    </div>
                                </div>

                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label htmlFor=""> EMAIL</label>
                                        <input value={email} placeholder="ENTER E-MAIL"  onChange={event => emailChange(event.target.value)} className="form-control" />
                                        {errors.email && <div className="text-danger">{errors.email}</div>}
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label htmlFor=""> PHONE</label>
                                        <input required value={phone} placeholder="ENTER PHONE NO." onChange={event => phoneChange(event.target.value)} className="form-control" />
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label htmlFor=""> Age </label>
                                        <input value={age} className="form-control" placeholder="ENTER AGE" onChange={event => ageChange(event.target.value)} />
                                    </div>
                                </div>
                                <div className="form-check">
                                    <input checked={active} value={active}  onChange={(event) => activeChange(event.target.checked)} type="checkbox" className="form-check-input" />
                                    <label className="form-check-label" htmlFor=""> This is Active</label>
                                </div>
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <button className="btn btn-success ms-1 mt-3" type="submit">SAVE</button>
                                        <Link to="/" className="btn btn-danger ms-5 mt-3">Back</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default Create;