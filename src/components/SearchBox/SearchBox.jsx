import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchMoviesByTitle } from '../../store/slices/moviesSlice';
import './SearchBox.css';

const SearchBox = () => {
    const [searchLine, setSearchLine] = useState('');
    const dispatch = useDispatch();

    const searchLineChangeHandler = (e) => {
        setSearchLine(e.target.value);
    };

    const searchBoxSubmitHandler = (e) => {
        e.preventDefault();
        if (searchLine.trim()) {
            dispatch(fetchMoviesByTitle(searchLine));
        }
    };

    return (
        <div className="search-box">
            <form className="search-box__form" onSubmit={searchBoxSubmitHandler}>
                <label className="search-box__form-label">
                    Search movie by title:
                    <input
                        value={searchLine}
                        type="text"
                        className="search-box__form-input"
                        placeholder="For example, Shawshank Redemption"
                        onChange={searchLineChangeHandler}
                    />
                </label>
                <button
                    type="submit"
                    className="search-box__form-submit"
                    disabled={!searchLine}
                >
                    Search
                </button>
            </form>
        </div>
    );
};

export default SearchBox;
