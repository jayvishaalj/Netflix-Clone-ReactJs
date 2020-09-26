import React, { useState, useEffect } from 'react'
import YouTube from 'react-youtube';
import axios from '../../axios';
import './Row.styles.css';
import movieTrailer from 'movie-trailer';

const baseUrl = "https://image.tmdb.org/t/p/original"
function Row({ title, fetchUrl, isLargeRow }) {
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");
    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);

        }
        fetchData();
    }, [fetchUrl]);

    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
            autoplay: 1
        }
    }

    const handleClick = (movie) => {
        if (trailerUrl) {
            setTrailerUrl("");
        }
        movieTrailer(movie?.name || "").then((url) => {
            const urlParams = new URLSearchParams(new URL(url).search);
            if (trailerUrl !== urlParams.get('v')) {
                setTrailerUrl(urlParams.get('v'));
            }
        }).catch((err) => console.log(err));
    }

    return (
        <div className="row">
            <h2 className="row_title">{title}</h2>
            <div className="row_posters">
                {movies.map((movie) => (
                    <img
                        onClick={() => handleClick(movie)}
                        key={movie.id}
                        className={`row_poster ${isLargeRow && "row_posterLarge"}`}
                        src={`${baseUrl}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                        alt={movie.name}
                    />
                ))}
            </div>
            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
        </div>
    )
}

export default Row;
