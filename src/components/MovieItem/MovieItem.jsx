import React from 'react';
import './MovieItem.css';
import { useDispatch } from 'react-redux';
import { addFavoriteMovie } from '../../store/slices/favoritesSlice';

const MovieItem = ({ imdbID, title, year, poster }) => {
    const dispatch = useDispatch();

    const handleAdd = () => {
        dispatch(addFavoriteMovie({ imdbID, title, year, poster }));
    };

    return (
        <article className="movie-item">
            <img className="movie-item__poster" src={poster} alt={title} />
            <div className="movie-item__info">
                <h3 className="movie-item__title">{title}&nbsp;({year})</h3>
                <button type="button" className="movie-item__add-button" onClick={handleAdd}>
                    Add to list
                </button>
            </div>
        </article>
    );
};

export default MovieItem;
