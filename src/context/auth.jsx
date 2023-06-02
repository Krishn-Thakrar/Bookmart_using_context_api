import React, { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import shared from "../utils/shared";
import { toast } from "react-toastify";

const initialUserValue = {
    email: "",
    firstName: "",
    id: 0,
    lastName: "",
    password: "",
    role: "",
    roleId: 0,
};

const initialstate = {
    setUser: () => {},
    user: initialUserValue,
    signOut: () => {},
};

const authContext = createContext(initialstate);

export const AuthWrapper = ({ children }) => {
    const [user, _setUser] = useState(initialUserValue);
    const navigate = useNavigate();
    const { pathname } = useLocation();

    useEffect(() => {
        const str = JSON.parse(localStorage.getItem("user")) || initialUserValue;
        if (str.id) {
            _setUser(str);
        }
        if (!str.id) {
            navigate("/");
        }
    }, []);

    useEffect(() => {
        if (pathname === "/login" && user.id) {
            navigate("/productlist")
        }
        if (!user.id) {
            return;
        }
        const access = shared.hasAccess(pathname, user);
        if (!access) {
            toast.error("You are not authorized to access the page");
            navigate("/productlist");
            return;
        }
    }, [user, pathname]);

    const setUser = (user) => {
        localStorage.setItem("user", JSON.stringify(user));
        _setUser(user);
    };

    const signOut = () => {
        setUser(initialUserValue);
        localStorage.removeItem("user");
        navigate("/login");
    };

    const value = {
        user,
        setUser,
        signOut,
    };

    return <authContext.Provider value={value}>{children}</authContext.Provider>
};

export const useAuthContext = () => {
    return useContext(authContext);
};