import * as React from "react";

import styles from "./CategoryButton.module.scss";
import Button from "react-bootstrap/Button";


class CategoryButton extends React.Component {
  render() {
    return (
      <div className={styles.button}>
        <Button variant="outline-info" size="lg">Category</Button>
      </div>
    );
  }
}

export default CategoryButton;