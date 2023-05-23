import React from "react";
import "./register.css";
import { Button, TextField } from "@mui/material";

export default function Register(){
    return(
        <>
        <div className="newreg">
            <TextField label="Username"/><br /><br />
            <TextField label="E-mail"/><br /><br />
            <TextField label="Password" type="password"/><br /><br />
            <Button variant="outlined" href="./login">Register</Button><br /><br />
            Already registered to Bookmart? ,<Button href="./login">Login</Button>
        </div>
        </>
    );
}