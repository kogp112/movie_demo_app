import * as React from "react";

import styles from "./Card.module.scss";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
interface Props {
  id: number,
  title: string,
  overview: string,
  poster_path: string
}

function CardData(props: Props) {
  const imgSrc = "https://image.tmdb.org/t/p/w500/" + props.poster_path;
  const titleText = props.title.length > 18 ? props.title.slice(0, 18) + "..." : props.title;
  const overviewText = props.overview.length > 60 ? props.overview.slice(0, 60) + "..." : props.overview;

  return (
    <Card className={styles.card}>
      <div className={styles.cardText}>
        <p className={styles.cardTitle}>{titleText}</p>
        <p>{overviewText}</p>
      </div>
      <Link to={'/detail/' + props.id}>
        <Card.Img variant="bottom" src={imgSrc} className={styles.cardImage}/>
      </Link>
    </Card>
  );
}

export default CardData;