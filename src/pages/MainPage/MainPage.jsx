import React from 'react';
import Header from '../../components/Header/Header.jsx';
import SearchBox from '../../components/SearchBox/SearchBox.jsx';
import Movies from '../../components/Movies/Movies.jsx';
import Favorites from '../../components/Favorites/Favorites.jsx';
import './MainPage.css';

const MainPage = () => {
    return (
        <div className="main-page">
            <Header />
            <main className="main-page__content">
                <section className="main-page__main-section">
                    <div className="main-page__search-box">
                        <SearchBox />
                    </div>
                    <div className="main-page__movies">
                        <Movies />
                    </div>
                </section>
                <aside className="main-page__favorites">
                    <Favorites />
                </aside>
            </main>
        </div>
    );
};

export default MainPage;
