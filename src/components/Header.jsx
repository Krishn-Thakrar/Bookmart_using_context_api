import React, { useMemo, useState } from "react";
import Logo from '../assets/logo.png'
import { Button } from "@mui/material";
import CartImg from '@mui/icons-material/ShoppingCart';
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/auth";
import shared from "../utils/shared";

function Header(){
    const navigate = useNavigate();
    const authContext = useAuthContext();

    const logOut = () => {
        authContext.signOut();
    };

    const items = useMemo(() => {
        return shared.NavigationItems.filter(
            (item) => {
                !item.access.length || item.access.includes(authContext.user.roleId)
            }
        );
    }, [authContext.user]);

    return(
        <>
        <div style={{display: "flex", justifyContent:"space-between", marginTop: "25px"}}>
            <div style={{display: "flex"}}>
                <div style={{marginLeft: "50px"}}>
                    <img src={Logo} alt="App Logo" style={{height: "65px", width: "65px"}} />
                </div>
                <div style={{lineHeight: "5px"}}>
                    <p>
                        <h1>TatvaSoft</h1>
                        Sculpting Thoughts....
                    </p>
                </div>
            </div>
            <div style={{display: "flex", columnGap: "10px", marginRight: "15px"}}>
                {!authContext.user.id && (
                    <>
                        <Link to="/login">
                            <Button variant="text">Login</Button>
                        </Link>
                        <Link to="/register">
                            <Button variant="text">Register</Button>
                        </Link>
                    </>
                )}
                {items.map( (item, index) => {
                    <>
                        <Button key={index} variant="text" onClick={() => {navigate(item.route);}}>{item.name}</Button>
                    </>
                })}
                <Button variant="outlined" startIcon={<CartImg />}>{0} Cart</Button>
                {authContext.user.id ? (
                    <Button variant="contained" onClick={() => {logOut();}}>LogOut</Button>
                ) : null}
            </div>
        </div>
        <br />
        </>
    )
}

export default Header;