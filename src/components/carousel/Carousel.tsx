import * as React from "react";

import Carousel from "react-multi-carousel";
import CardData from "../card/Card";
import 'react-multi-carousel/lib/styles.css';
import styles from "./Carousel.module.scss";

const responsive = {
  desktop: {
    breakpoint: { max: 2000, min: 1024 },
    items: 5,
    slidesToSlide: 3
  }
};

interface Props {
  data: LatestData[]
}

type LatestData = {
  adult: boolean,
  backdrop_path: string,
  genre_ids: number[],
  id: number,
  original_language: string,
  original_title: string,
  overview: string,
  popularity: number,
  poster_path: string,
  release_date: string,
  title: string,
  video: boolean,
  vote_average: number,
  vote_count: number
}

function CarouselData(prop: Props) {
  let data = prop.data;
    return (
        <Carousel containerClass={styles.carouselContainer} itemClass={styles.carouselItem} showDots={false} arrows swipeable responsive={responsive} infinite={false}>
          {data.length > 0 && data.map(item => {
            return (
              <>
                <CardData id={item.id} title={item.title} overview={item.overview} poster_path={item.poster_path}/>
              </>
            )
          })}
        </Carousel>
    );
}

export default CarouselData;
