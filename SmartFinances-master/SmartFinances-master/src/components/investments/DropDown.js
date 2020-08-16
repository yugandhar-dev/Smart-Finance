import React from "react";
import styles from "./investments.module.css";

function DropDown() {
  return (
    <div>
      <p className={styles.subcategories}>Low Risk</p>
      <p className={styles.subcategories}>Exchange Traded Funds</p>
      <p className={styles.subcategories}>Savings Schemes</p>
    </div>
  );
}

export default DropDown;
