import logo from "../../assets/images/movu_logo.svg";
import styles from "./Header.module.scss";
import { Link } from "react-router-dom";

function Header() {
    return (
      <>
        <div className={styles.header}>
          <Link to={'/'}>
            <img src={logo} className={styles.logo} alt="logo" />
          </Link>
        </div>
      </>
    );
}

export default Header;
