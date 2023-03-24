import React from "react";
import styles from "./UserInfo.module.scss";

export const UserInfo = ({ fullName, additionalText }) => {
  return (
    <div className={styles.root}>
      <div className={styles.userDetails}>
        <span className={styles.userName}>{fullName}</span>
        <span className={styles.additional}>{additionalText}</span>
      </div>
    </div>
  );
};
