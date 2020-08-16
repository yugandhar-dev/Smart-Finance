import React, { useState } from "react";
import styles from "./investments.module.css";
import DropDown from "./DropDown";

function Investments() {
  const [open, setOpen] = useState(false);

  const plusStyle = {
    fontSize: "1rem",
    float: "right",
    paddingTop: "0.5rem",
  };

  const toggle = () => {
    setOpen(!open);
  };

  return (
    <div className={styles.investmentsBg}>
      <p className={styles.categories} onClick={open && toggle}>
        <i className="fas fa-wallet"></i> Add Funds to Wallet
      </p>
      <p
        className={styles.categories}
        onClick={toggle}
        style={open ? { backgroundColor: "#8598c9", color: "#07236a" } : {}}
      >
        <i className="fas fa-hand-holding-usd"></i> Invest
        {open ? (
          <i className="fas fa-minus" style={plusStyle}></i>
        ) : (
          <i className="fas fa-plus" style={plusStyle}></i>
        )}
      </p>
      {open && <DropDown />}
      <p className={styles.categories} onClick={open && toggle}>
        <i className="far fa-arrow-alt-circle-up"></i> Sell Funds
      </p>
      <p className={styles.categories} onClick={open && toggle}>
        <i className="far fa-arrow-alt-circle-down"></i> Withdraw Funds
      </p>
      <p className={styles.categories} onClick={open && toggle}>
        <i class="fas fa-calculator"></i> Investment Calculator
      </p>
    </div>
  );
}

export default Investments;
