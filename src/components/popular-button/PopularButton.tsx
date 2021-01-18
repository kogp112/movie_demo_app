import * as React from "react";

import styles from "./PopularButton.module.scss";
import Button from "react-bootstrap/Button";


class PopularButton extends React.Component {
  render() {
    return (
      <div className={styles.button}>
        <Button variant="outline-info" size="lg">Popular</Button>
      </div>
    );
  }
}

export default PopularButton;