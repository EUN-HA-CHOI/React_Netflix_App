import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'
import axios from "../api/axios";

function DetailPage() {
  const [movie, setMovie] = useState({});

  let {movieId} = useParams();
  //console.log("movieId",movieId);
  //console.log("useParams()",useParams());

  const fetchData = async () => {
    const request = await axios.get(`/movie/${movieId}`);
    console.log("request",request);
    setMovie(request.data);
  }

  useEffect(() => {
      fetchData() 
   }, [movieId]);
  
  if (!movie) return <div>...loading</div>;

  return (
    <section>
    <img
      className="modal__poster-img"
      src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
      alt="poster"
    />
    {/* */}
  </section>
  )
}

export default DetailPage