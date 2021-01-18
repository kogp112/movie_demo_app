import * as React from "react";

import styles from "./Card.module.scss";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

interface Props {
  title: string,
  overview: string,
  poster_path: string
}

function CardData(props: Props) {
  const imgSrc = "https://image.tmdb.org/t/p/w500/" + props.poster_path;
  const titleText = props.title.length > 20 ? props.title.slice(0, 20) + "..." : props.title;
  const overviewText = props.overview.length > 60 ? props.overview.slice(0, 60) + "..." : props.overview;
  
  return (
    <Card className={styles.card} >
      <Card.Img variant="top" src={imgSrc} className={styles.cardImage}/>
      <Card.Body>
        <Card.Text>
          <p className={styles.cardTitle} >{titleText}</p>
          <p className={styles.cardText}>{overviewText}</p>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default CardData;