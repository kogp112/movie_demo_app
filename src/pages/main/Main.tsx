import React, { useState, useEffect } from 'react';

import CarouselData from '../../components/carousel/Carousel';
import CardData from '../../components/card/Card';
import { RiSearch2Line } from "react-icons/ri";
import { Button } from 'react-bootstrap';
import styles from './Main.module.scss';
import axios from 'axios';

type ApiFetchData = {
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

type FavoriteData = {
  movie_id: number,
  overview: string,
  popularity: number,
  poster_path: string,
  title: string,
}

const apiKey = process.env.REACT_APP_TMDB_APIKEY;

function Main() {
  useEffect(() => {
    const getPopularData = async () => {
      const initPopularData = await axios('https://api.themoviedb.org/3/movie/popular?api_key=' + apiKey);
      setPopularData(initPopularData.data.results);
    }
    const getTopRatedData = async () => {
      const initTopRatedData = await axios('https://api.themoviedb.org/3/movie/top_rated?api_key=' + apiKey);
      setTopRatedData(initTopRatedData.data.results);
    }
    getPopularData();
    getTopRatedData();
    setMode("top");
  }, []);
  
  const [popularData, setPopularData] = useState<ApiFetchData[]>([]);
  const [topRatedData, setTopRatedData] = useState<ApiFetchData[]>([]);
  const [searchData, setSearchData] = useState<ApiFetchData[]>([]);
  const [upcomingData, setUpcomingData] = useState<ApiFetchData[]>([]);
  const [favoriteData, setFavoriteData] = useState<FavoriteData[]>([]);
  const [mode, setMode] = useState('');
  const myStorage = localStorage;
  
  const onEnterSearchArea = (e: any) => {
    if (e.key == 'Enter') {
      e.preventDefault();
      const param = e.target.value;
      const getKeywordSearchData = async () => {
        const keywordSearchData = await axios('https://api.themoviedb.org/3/search/movie?api_key=' + apiKey + "&query=" + param);
        setSearchData(keywordSearchData.data.results);
      }
      getKeywordSearchData();
      setMode("search");
    }
  }
  
  const onClickFavoriteButton = () => {
    const favoriteData: FavoriteData[] = [];
    for (var i = 0; i < myStorage.length; i++) {
      if (String(myStorage.key(i)).match("movie*")) {
        const key = String(myStorage.key(i));
        const value = myStorage.getItem(key);
        const newMovieData: FavoriteData = JSON.parse(String(value));
        setMode("favorite");
        favoriteData.push(newMovieData)
      }
    }
    setFavoriteData(favoriteData);
  }
  
  const onClickPopularButton = () => {
    setMode("popular");
  }

  const onClickUpcomingButton = () => {
    const getUpcomingData = async () => {
      const upcomingData = await axios('https://api.themoviedb.org/3/movie/upcoming?api_key=' + apiKey);
      setUpcomingData(upcomingData.data.results);
    }
    getUpcomingData();
    setMode("upcoming");
  }
  
  function renderMainArea(mode: string) {
    if (mode == "top") {
      return (
        <>
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
      )
    } else if (mode == "search") {
      if (searchData.length == 0) {
        return <p className={styles.labelText}>Sorry, Nothing Search Result</p>
      } else {
        return searchData.length > 0 && renderDataTable(searchData)
      }
    } else if (mode == "upcoming") {
      return upcomingData.length > 0 && renderDataTable(upcomingData)
    } else if (mode == "popular") {
      return popularData.length > 0 && renderDataTable(popularData)
    } else if (mode == "favorite") {
      return favoriteData.length > 0 && renderFavoriteDataTable(favoriteData)
    }
  }
  
  function renderDataTable(data: ApiFetchData[]) {
    return (
      <div className={styles.tableBody}>
        {data && data.map((item, key) => {
          if (key % 4 == 0 && key !== 0) {
            return(
              <>
                <div className={styles.tableRow}>
                  <CardData id={data[key].id && data[key].id} title={data[key].title && data[key].title} overview={item.overview} poster_path={item.poster_path}/>
                </div>
                <br />
              </>
            )
          } else {
            return(
              <div className={styles.tableRow}>
                <CardData id={data[key].id && data[key].id} title={data[key].title && data[key].title} overview={item.overview} poster_path={item.poster_path}/>
              </div>
            )
          }
        })}
      </div>
    )
  }
  
  function renderFavoriteDataTable(data: FavoriteData[]) {
    return (
      <div className={styles.tableBody}>
        {data && data.map((item, key) => {
          if (key % 4 == 0 && key !== 0) {
            return(
              <>
                <div className={styles.tableRow}>
                  <CardData id={data[key].movie_id && data[key].movie_id} title={data[key].title && data[key].title} overview={item.overview} poster_path={item.poster_path}/>
                </div>
                <br />
              </>
            )
          } else {
            return(
              <div className={styles.tableRow}>
                <CardData id={data[key].movie_id && data[key].movie_id} title={data[key].title && data[key].title} overview={item.overview} poster_path={item.poster_path}/>
              </div>
            )
          }
        })}
      </div>
    )
  }
  
  return (
    <>
      <div className={styles.formArea}>
        <form>
          <RiSearch2Line color={"white"}/>
          <input type="text" placeholder=" Search" className={styles.formInput} onKeyPress={onEnterSearchArea} />
        </form>
      </div>
      <div className={styles.buttonGroup}>
        <div className={styles.button}>
          <Button variant="outline-info" size="lg" onClick={onClickFavoriteButton}>Favorite</Button>
        </div>
        <div className={styles.button}>
          <Button variant="outline-info" size="lg" onClick={onClickUpcomingButton}>Upcoming</Button>
        </div>
        <div className={styles.button}>
          <Button variant="outline-info" size="lg" onClick={onClickPopularButton}>Popular</Button>
        </div>
      </div>
      {renderMainArea(mode)}
    </>
  );
}

export default Main;
