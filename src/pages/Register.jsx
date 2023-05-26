import React, { useEffect, useState } from "react";
import "./register.css";
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Register(){
    const [roleList, setRoleList] = useState();
    const navigate = useNavigate()
    useEffect(() => {
        axios.get('https://book-e-sell-node-api.vercel.app/api/user/roles').then((response)=>{
            setRoleList(response);
        }).catch((error) => {
            console.log(error)
        })
    }, [])
    const initialValues = {
        firstName: '',
        lastName: '',
        roleId: '',
        email: '',
        password: '',
        confirmPassword: '',
    }
    const validationSchema = yup.object().shape({
        firstName: yup.string()
        .required("Firstname is required."),
        lastName: yup.string()
        .required("Lastname is required."),
        roleId: yup.number()
        .required("Role is required"),
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
        delete values.confirmPassword;
        axios.post("https://book-e-sell-node-api.vercel.app/api/user", values).then(values=>{
            console.log(values)
            toast.success("Registered Successfully")
            navigate("/login")
        }).catch((error)=>{
            console.log(error)
            toast.error(error.response.data.error)
        })
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
                    <center><h1>Personal Details</h1>
                    <TextField label="Firstname" name="firstName" style={{position:"relative"}} onChange={handleChange} onBlur={handleBlur}/>
                    <p style={{position:"relative", color:"red", lineHeight:"2px", fontSize:"14px"}}>{errors.firstName}</p>
                    <TextField label="Lastname" name="lastName" style={{position:"relative"}} onChange={handleChange} onBlur={handleBlur}/>
                    <p style={{position:"relative", color:"red", lineHeight:"2px", fontSize:"14px"}}>{errors.lastName}</p>
                    <h1>Login Details</h1>
                    <FormControl style={{width:"30dvh"}}>
                    <InputLabel>Role</InputLabel>
                    <Select
                        name="roleId"
                        label="Role"
                        onBlur={handleBlur}
                        onChange={handleChange}
                    >
                        {roleList && roleList.data.result.map((role) => (
                            <MenuItem value={role.id} key={"name" + role.id}>
                                {role.name}
                            </MenuItem>
                        ))}
                    </Select>
                    </FormControl>
                    <p style={{position:"relative", color:"red", lineHeight:"2px", fontSize:"14px"}}>{errors.roleId}</p>
                    <TextField label="E-mail" name="email" style={{position:"relative"}} onChange={handleChange} onBlur={handleBlur}/>
                    <p style={{position:"relative", color:"red", lineHeight:"2px", fontSize:"14px"}}>{errors.email}</p>
                    <TextField label="Password" name="password" type="password" style={{position:"relative"}} onChange={handleChange} onBlur={handleBlur} />
                    <p style={{position:"relative", color:"red", lineHeight:"2px", fontSize:"14px"}}>{errors.password}</p>
                    <TextField label="Confirm Password" name="confirmPassword" type="password" style={{position:"relative"}} onChange={handleChange} onBlur={handleBlur}/>
                    <p style={{position:"relative", color:"red", lineHeight:"2px", fontSize:"14px"}}>{errors.confirmPassword}</p>
                    <Button variant="outlined" type="submit">Register</Button></center>
                </form>
                }
            </Formik>
        </div>
        </>
    );
}