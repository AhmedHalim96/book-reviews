import React from "react";
import "./Backdrop.css";

const backdrop = props =>
  props.show ? <div className="Backdrop" onClick={props.onClick} /> : null;

export default backdrop;
