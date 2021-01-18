import * as React from "react";

import logo from "../../assets/images/movu_logo.svg";
import styles from "./Header.module.scss";
import CategoryButton from "../category-button/CategoryButton";
import LatestButton from "../latest-button/LatestButton";
import PopularButton from "../popular-button/PopularButton";

function Header() {
    return (
      <>
        <div className={styles.header}>
          <img src={logo} className={styles.logo} alt="logo" />
        </div>
        <div className={styles.button_group}>
          <CategoryButton />
          <LatestButton />
          <PopularButton />
        </div>
      </>
    );
}

export default Header;
