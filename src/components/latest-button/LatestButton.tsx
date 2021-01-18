import * as React from "react";

import styles from "./LatestButton.module.scss";
import Button from "react-bootstrap/Button";


class LatestButton extends React.Component {

  render() {
    return (
      <div className={styles.button}>
        <Button variant="outline-info" size="lg" >Latest</Button>
      </div>
    );
  }
}

export default LatestButton;