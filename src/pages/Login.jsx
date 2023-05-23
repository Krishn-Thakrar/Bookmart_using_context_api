import React from "react";
import "./login.css";
import { Button, TextField } from "@mui/material";

export default function Login(){
    return(
        <>
        <div className="lognow">
            <TextField label="E-mail"/><br /><br />
            <TextField label="Password" type="password"/><br /><br />
            <Button variant="outlined" href="./product-list">Login</Button>
        </div>
        </>
    );
}