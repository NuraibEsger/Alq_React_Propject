import React from 'react';
import { useSelector } from 'react-redux';
import MovieItem from '../MovieItem/MovieItem.jsx';
import './Movies.css';

const Movies = () => {
    const { searchResults, status } = useSelector(state => state.movies);

    if (status === 'loading') {
        return <h2>Loading...</h2>;
    }

    if (status === 'failed') {
        return <h2>Failed to load movies</h2>;
    }

    return (
        <ul className="movies">
            {searchResults.map((movie) => (
                <li className="movies__item" key={movie.imdbID}>
                    <MovieItem {...movie} />
                </li>
            ))}
        </ul>
    );
};

export default Movies;
