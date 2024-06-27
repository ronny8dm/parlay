/** @format */

import React from "react";
import "./Footer.css";
import SvgImg from "../../assets/mascot.svg";

export default function Footer() {
  return (
    <footer className="bottom-0 footer-component">
      <div className="line-divider w-full h-px"></div>
      <div className="footer-wrapper justify-between items-center max-w-7xl ml-auto mr-auto w-full flex h-20 color">
        <div className="footer-credits w-full">
          © 2024 Parlay. All Rights Reserved
        </div>
        <a className="footer-logo_link justify-center" href="">
          <img
            className="footer-logo max-w-64"
            src={SvgImg}
            alt="mascot image"
          />
        </a>
      </div>
    </footer>
  );
}
