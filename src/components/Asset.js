import React from "react";
import { Spinner } from "react-bootstrap";
import styles from "../styles/Asset.module.css";

// Functional component representing an Asset (with optional Spinner, image, and message)
const Asset = ({ spinner, src, message }) => {
  return (
    <div className={`${styles.Asset} p-4`}>
      {spinner && <Spinner animation="border" />}
      {src && <img src={src} alt={message} />}
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
};

export default Asset;