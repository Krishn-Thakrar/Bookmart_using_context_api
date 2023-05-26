import React from "react";
import "./login.css";
import { Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Login(){
    const navigate = useNavigate()
    const initialValues = {
        email: '',
        password: '',
    }
    const validationSchema = yup.object().shape({
        email: yup.string()
        .email("Invalid email address format.")
        .required("Email is required."),
        password: yup.string()
        .min(5, "Minimum 5 characters are required.")
        .required("Password is required."),
    })
    const onSubmit = (values) => {
        axios.post("https://book-e-sell-node-api.vercel.app/api/user/login", values).then(values=>{
            console.log(values)
            toast.success("Logged in successfully");
            navigate("/product-list")
            toast.info("Welcome to Bookmart")
        }).catch((error)=>{
            console.log(error)
            toast.error(error.response.data.error)
        })
    };
    return(
        <>
        <div className="lognow">
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
                <TextField label="E-mail" name="email" style={{position:"relative"}} onChange={handleChange} onBlur={handleBlur}/>
                <p style={{position:"relative", color:"red", lineHeight:"2px", fontSize:"14px"}}>{errors.email}</p>
                <TextField label="Password" name="password" type="password" style={{position:"relative"}} onChange={handleChange} onBlur={handleBlur} />
                <p style={{position:"relative", color:"red", lineHeight:"2px", fontSize:"14px"}}>{errors.password}</p>
                <Button variant="outlined" type="submit">Login</Button>
                </form>
                }
            </Formik>
        </div>
        </>
    );
}