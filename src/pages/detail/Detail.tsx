import React, { useState, useEffect } from 'react';
import styles from './Detail.module.scss';
import { Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface Props {
  id?: number
}

type Like = boolean;

type MovieData = {
  movie_id: number,
  overview: string,
  popularity: number,
  poster_path: string,
  title: string,
}

const initialData = {
  movie_id: 0,
  overview: "",
  popularity: 0,
  poster_path: "",
  title: ""
}

const apiKey = process.env.REACT_APP_TMDB_APIKEY;

function Detail(props: Props) {
    const [movieData, setMovieData] = useState<MovieData>(initialData);
    const [likeMode, setLikeMode] = useState<Like>(false);
    
    const imgSrc = "https://image.tmdb.org/t/p/w500/" + movieData.poster_path;
    const titleText = movieData.title;
    const overviewText = movieData.overview;
    const myStorage = localStorage;
    
    const param: {id: string} = useParams();
    const movieId = param.id;
    
    useEffect(() => {
      const getDetailData = async () => {
        const initDetailData = await axios('https://api.themoviedb.org/3/movie/' + movieId + '?api_key=' + apiKey);
        const responseData = initDetailData.data;
        const detailDatas = {
          movie_id: responseData.id,
          overview: responseData.overview,
          popularity: responseData.popularity,
          poster_path: responseData.poster_path,
          title: responseData.title,
        }
        setMovieData(detailDatas);
      }
      getDetailData();
      
      for (var i = 0; i < myStorage.length; i++) {
        if (movieId == String(myStorage.key(i)).split('movie')[1]) {
          setLikeMode(true);
          break;
        }
      }
    }, []);
    
    const onClickLikeButton = () => {
      if (likeMode) {
        setLikeMode(false);
        myStorage.removeItem("movie" + movieId);
      } else {
        setLikeMode(true);
        myStorage.setItem("movie" + movieId, JSON.stringify(movieData));
      }
    }
    
    return (
      <div className={styles.main}>
        <table className={styles.detailTable}>
          <tbody>
            <tr>
              <td rowSpan={4}>
                <img className={styles.image} src={imgSrc} />
              </td>
            </tr>
            <tr>
                <td className={styles.tableCol}>
                  <p className={styles.title}>{titleText}</p>
                </td>
            </tr>
            <tr>
              <td className={styles.tableCol}>
                <Button variant={likeMode ? 'danger': 'primary'} onClick={onClickLikeButton}>
                  {likeMode ? "Unlike" : "Like"}
                </Button>
              </td>
            </tr>
            <tr>
              <td className={styles.overViewText}>
                <p>{overviewText}</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
}

export default Detail;
