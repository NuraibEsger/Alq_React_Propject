import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setFavoritesTitle,
  removeFavoriteMovie,
} from "../../store/slices/favoritesSlice";
import { saveList } from "../../store/slices/listsSlice";
import { Link } from "react-router-dom";
import "./Favorites.css";

const Favorites = () => {
  const dispatch = useDispatch();
  const { title, movies } = useSelector((state) => state.favorites);
  const { currentList, status, savedLists } = useSelector(
    (state) => state.lists
  );
  const [saved, setSaved] = useState(false);

  const uniqueLists = [];
  const ids = new Set();
  for (let lst of savedLists) {
    if (!ids.has(lst.id)) {
      ids.add(lst.id);
      uniqueLists.push(lst);
    }
  }

  const handleTitleChange = (e) => {
    dispatch(setFavoritesTitle(e.target.value));
  };

  useEffect(() => {
    setSaved(false);
  }, []);

  const handleRemove = (imdbID) => {
    dispatch(removeFavoriteMovie(imdbID));
  };

  const handleSave = () => {
    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      alert("List name cannot be empty!");
      return;
    }

    const imdbIDs = movies.map((m) => m.imdbID);
    dispatch(saveList({ title: trimmedTitle, movies: imdbIDs }))
      .unwrap()
      .then(() => setSaved(true))
      .catch(() => alert("Error saving the list"));
  };

  return (
    <div className="favorites">
      {!saved && (
        <>
          <input
            value={title}
            className="favorites__name"
            onChange={handleTitleChange}
            placeholder="New list"
          />
          <ul className="favorites__list">
            {movies.map((item) => (
              <li key={item.imdbID}>
                {item.title} ({item.year})
                <button onClick={() => handleRemove(item.imdbID)}>x</button>
              </li>
            ))}
          </ul>
          <button
            type="button"
            className="favorites__save"
            onClick={handleSave}
            disabled={movies.length === 0 || status === "saving"}
          >
            {status === "saving" ? "Saving..." : "Save list"}
          </button>
        </>
      )}
      {saved && currentList && (
        <div>
          <p>The current list has been saved. Access it here:</p>
          <Link to={`/list/${currentList.id}`}>{currentList.title}</Link>
        </div>
      )}

      {savedLists.length > 0 && (
        <div className="favorites__saved-lists">
          <h3>Previously Saved Lists:</h3>
          <ul>
            {savedLists.map((list) => (
              <li key={list.id}>
                <Link to={`/list/${list.id}`}>{list.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Favorites;
