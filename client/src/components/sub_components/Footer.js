import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";

function Footer() {
  return (
      <footer
        style={{
          width: "90%",
          margin: "0 auto", 
          padding: "10px",
          position: "fixed",
          bottom: "0",
          left: "45px"
        }}
      >
        <div className="row">
          <div className="col-sm-3">
            <a href="https://www.facebook.com/">
              <p style={{fontSize:"20px", color: "black"}}><FontAwesomeIcon icon={faFacebook} color="#4caf50" /> Facebook</p>
            </a>
          </div>
          <div className="col-sm-3">
            <p style={{fontSize:"19px", color: "black"}}><FontAwesomeIcon icon={faPhone} color="#4caf50" /> +92-123-456789</p>
          </div>
          <div className="col-sm-3">
            <p style={{fontSize:"19px", color: "black"}}><FontAwesomeIcon icon={faEnvelope} color="#4caf50" /> gulfarms@gmail.com</p>
          </div>
          <hr />
          <div>
            <p style={{fontSize:"19px", color: "black"}} className="col-sm">&copy; {new Date().getFullYear()}</p>
          </div>
        </div>
      </footer>
  );
}

export default Footer;
