import * as React from "react";

import logo from "../../assets/images/movu_logo.svg";
import styles from "./Header.module.scss";


class Header extends React.Component {
  render() {
    return (
      <div className={styles.header}>
        <img src={logo} className={styles.logo} alt="logo" />
      </div>
    );
  }
}

export default Header;