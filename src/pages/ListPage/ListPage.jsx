import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchListById, fetchMovieById } from '../../store/slices/listsSlice';
import './ListPage.css';
import { useParams } from 'react-router-dom';

const ListPage = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const { currentList, currentListMovies, status } = useSelector(state => state.lists);

    useEffect(() => {
        dispatch(fetchListById(id));
    }, [dispatch, id]);

    useEffect(() => {
        if (currentList && currentList.movies) {
            currentList.movies.forEach(imdbID => {
                dispatch(fetchMovieById(imdbID));
            });
        }
    }, [currentList, dispatch]);

    return (
        <div className="list-page">
            {status === 'loading' && <h2>Loading...</h2>}
            {status === 'failed' && <h2>Failed to load the list</h2>}
            {status === 'succeeded' && currentList && (
                <>
                    <h1 className="list-page__title">{currentList.title}</h1>
                    <ul>
                        {currentListMovies.map((item) => {
                            return (
                                <li key={item.imdbID}>
                                    <a href={`https://www.imdb.com/title/${item.imdbID}/`} target="_blank" rel="noreferrer">
                                        {item.title} ({item.year})
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                </>
            )}
        </div>
    );
};

export default ListPage;
