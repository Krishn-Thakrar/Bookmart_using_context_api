import React from "react";
import "./header.css"
import Logo from '../assets/images/logo.png'
import SearchIcon from '@mui/icons-material/SearchOutlined';
import Cart from '@mui/icons-material/ShoppingCart';
import { Button, TextField } from "@mui/material";

function Header(){
    return(
        <>
        <div className="head1">
            <div className="head2">
                <div className="head3">
                    <div className="he">
                        <img src={Logo} alt="App Logo" height="72px" width="72px" />
                    </div>
                    <div className="hea">
                        <h1>Tatvasoft</h1>
                        <p>sculpting thoughts...</p>
                    </div>
                </div>
                <div className="head4">
                    <Button variant="text">Login</Button>
                    <Button variant="text">Register</Button>
                    <Button variant="outlined" startIcon={<Cart />}>Cart</Button>
                </div>
            </div>
            <div className="head5">
                <TextField id="outlined-basic" label="What are you looking for..." variant="outlined" size="small" style={{marginRight:"10px"}} />
                <Button variant="contained" color="success" startIcon={<SearchIcon />} style={{marginRight:"10px"}} >Search</Button>
                <Button variant="contained" color="error">Cancel</Button>
            </div>
        </div>
        </>
    );
}

export default Header;