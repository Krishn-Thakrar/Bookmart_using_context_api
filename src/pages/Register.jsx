import React from "react";
import "./register.css";
import { Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";

export default function Register(){
    const initialValues = {
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        confirmPassword: '',
    }
    const validationSchema = yup.object().shape({
        firstname: yup.string()
        .required("Firstname is required."),
        lastname: yup.string()
        .required("Lastname is required."),
        email: yup.string()
        .email("Invalid email address format.")
        .required("Email is required."),
        password: yup.string()
        .min(5, "Minimum 5 characters are required.")
        .required("Password is required."),
        confirmPassword: yup.string()
        .oneOf(
            [yup.ref("password"), null],
            "Password and Confirm password must be matched."
        )
        .required("Confirm password is required."),
    })
    const onSubmit = (values) => {
        alert(`Firstname: ${values.firstname}. Lastname: ${values.lastname}. Email: ${values.email}. Password: ${values.password}. Confirm Password: ${values.confirmPassword}.`);
    };
    return(
        <>
        <div className="newreg">
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleBlur,
                    handleChange,
                    handleSubmit,
                }) =>
                <form onSubmit={handleSubmit}>
                    <center><h1>Personal Details</h1></center>
                    <TextField label="Firstname" name="firstname" style={{position:"relative", left:"30%"}} onChange={handleChange} onBlur={handleBlur}/>
                    <p style={{position:"relative", left:"30%", color:"red"}}>{errors.firstname}</p>
                    <TextField label="Lastname" name="lastname" style={{position:"relative", left:"30%"}} onChange={handleChange} onBlur={handleBlur}/>
                    <p style={{position:"relative", left:"30%", color:"red"}}>{errors.lastname}</p>
                    <center><h1>Login Details</h1></center>
                    <TextField label="E-mail" name="email" style={{position:"relative", left:"30%"}} onChange={handleChange} onBlur={handleBlur}/>
                    <p style={{position:"relative", left:"30%", color:"red"}}>{errors.email}</p>
                    <TextField label="Password" name="password" type="password" style={{position:"relative", left:"30%"}} onChange={handleChange} onBlur={handleBlur}/>
                    <p style={{position:"relative", left:"30%", color:"red"}}>{errors.password}</p>
                    <TextField label="Confirm Password" name="confirmPassword" type="password" style={{position:"relative", left:"30%"}} onChange={handleChange} onBlur={handleBlur}/>
                    <p style={{position:"relative", left:"30%", color:"red"}}>{errors.confirmPassword}</p>
                    <center><Button variant="outlined" type="submit">Register</Button></center>
                </form>
                }
            </Formik>
        </div>
        </>
    );
}