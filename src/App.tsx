import React, { useState, useEffect } from 'react';
import Header from './components/header/Header';
import CarouselData from './components/carousel/Carousel';

import styles from './App.module.scss';

import top_rated_test_data from './top_rated_test_data.json';
import popular_test_data from './popular_test_data.json';

type PopularData = {
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

function App() {
  //let apiKey = process.env.REACT_APP_TMDB_APIKEY;
  const [popularData, setPopularData] = useState<PopularData[]>([]);
  const [topRatedData, setTopRatedData] = useState<PopularData[]>([]);
  
  useEffect(() => { // <-- Need to use rsync later
    //const result = await axios(
    //  'https://api.themoviedb.org/3/movie/latest?api_key={apiKey}',
    //);
    setPopularData(popular_test_data.results);
    setTopRatedData(top_rated_test_data.results);
  }, []);
  
  return (
    <>
      <div>
        <Header />
      </div>
      <div>
        <p className={styles.labelText}>Popular Movies</p>
      </div>
      <div>
        <CarouselData data={popularData} />
      </div>
      <div>
        <p className={styles.labelText}>Top Rated Movies</p>
      </div>
      <div>
        <CarouselData data={topRatedData} />
      </div>
    </>
  );
}

export default App;
