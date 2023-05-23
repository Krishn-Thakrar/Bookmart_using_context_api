import React from "react";
import "./footer.css";
import Logo from '../assets/images/logo.png'
import CrIcon from '@mui/icons-material/Copyright';

function Footer(){
    return(
        <>
            <div className="foot1">
                <div className="foot2">
                    <div className="foot3">
                        <img src={Logo} alt="App Logo" height="32px" width="32px" />
                    </div>
                    <div className="foot4">
                        <p>
                            Tatvasoft<br />
                            sculpting thoughts...
                        </p>
                    </div>
                </div>
                <center><p>
                        <CrIcon fontSize="small" /> 2015 Tatvasoft.com all rights reserved
                </p></center>
            </div>
        </>
    );
}

export default Footer;