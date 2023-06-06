import React, { useState } from "react";
import { useAuthContext } from "../context/auth";
import userService from "../service/user.service";
import shared from "../utils/shared";
import { Formik } from "formik";
import * as Yup from "yup";
import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function UpdateProfile() {
    const navigate = useNavigate();
    const authContext = useAuthContext();
    const { user } = useAuthContext();

    const initialValuestate = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        newPassword: "",
        confirmPassword: "",
    };

    const [updatePassword, setUpdatePassword] = useState(false);

    const validate = Yup.object().shape({
        firstName: Yup.string()
            .min(2, "Too Short!")
            .max(50, "Too Long!")
            .required("FirstName is Required"),
        lastName: Yup.string()
            .min(2, "Too Short!")
            .max(50, "Too Long!")
            .required("LastName is Required"),
        email: Yup.string().email("Invalid email").required("Email is Required"),
        newPassword: Yup.string().min(5, "minimum 5 Charator is required"),
        confirmPassword: updatePassword
            ? Yup.string()
                .required("Required")
                .oneOf([Yup.ref("newPassword")], "Passwords not match")
            : Yup.string().oneOf([Yup.ref("newPassword")], "Passwords is not match"),
    });

    const onSubmit = async (values) => {
        const password = values.newPassword ? values.newPassword : user.password;
        delete values.confirmPassword;
        delete values.newPassword;
        const data = Object.assign(user, { ...values, password });
        const res = await userService.updateProfile(data);
        if (res) {
          authContext.setUser(res.data.reult);
          toast.success(shared.messages.UPDATED_SUCCESS);
          navigate("/");
        }
    };

    return(
        <>
            <h1>Update Profile</h1>
            <Formik
                initialValues={initialValuestate}
                validationSchema={validate}
                enableReinitialize={true}
                onSubmit={onSubmit}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                }) => (
                    <form onSubmit={handleSubmit}>
                        <TextField value={values.firstName} label="First Name" name="firstName" onChange={handleChange} onBlur={handleBlur} />
                        <p style={{position:"relative", color:"red", lineHeight:"2px", fontSize:"14px"}}>{errors.firstName}</p>
                        <TextField value={values.lastName} label="Last Name" name="lastName" onChange={handleChange} onBlur={handleBlur} />
                        <p style={{position:"relative", color:"red", lineHeight:"2px", fontSize:"14px"}}>{errors.lastName}</p>
                        <TextField value={values.email} label="Email" name="email" onChange={handleChange} onBlur={handleBlur} />
                        <p style={{position:"relative", color:"red", lineHeight:"2px", fontSize:"14px"}}>{errors.email}</p>
                        <TextField value={values.newPassword} label="New Password" name="newPassword" onChange={handleChange} onBlur={handleBlur} />
                        <p style={{position:"relative", color:"red", lineHeight:"2px", fontSize:"14px"}}>{errors.newPassword}</p>
                        <TextField value={values.confirmPassword} label="Confirm Password" name="confirmPassword" onChange={handleChange} onBlur={handleBlur} />
                        <p style={{position:"relative", color:"red", lineHeight:"2px", fontSize:"14px"}}>{errors.confirmPassword}</p>
                        <Button variant="contained" type="submit">Save</Button>
                        <Button variant="contained" onClick={() => {navigate("/product-list")}}>Cancel</Button>
                    </form>
                )}
            </Formik>
        </>
    );
}

export default UpdateProfile;