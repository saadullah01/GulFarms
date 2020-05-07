import React from "react";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

function Footer() {
  return (
    <div
      className="footer"
      style={{
        color: "#4caf50",
        height: "2.5rem",
        width: "100%",
        bottom: "0",
        position: "relative",
      }}
    >
      <div className="Container">
        <div className="row">
          <div className="col1">
            <a href="https://www.facebook.com/" className="fb">
              <FontAwesomeIcon icon={faFacebook} size="2x" color="white" />
            </a>
          </div>

          <div className="col2">
            <FontAwesomeIcon icon={faPhone} size="2x" color="white" />
            Phone Number
          </div>
          <div className="col3">
            <FontAwesomeIcon icon={faEnvelope} size="2x" color="white" />
            Email Address
          </div>
          <hr />
          <div>
            <p className="col-sm">&copy; {new Date().getFullYear()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
