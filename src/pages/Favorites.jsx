import React from 'react';
import Card from '../components/Card';
import AppContext from '../context';
import { Link } from 'react-router-dom';

// eslint-disable-next-line
function Favorites({}) {
    const {favorites, onAddToFavorite} = React.useContext(AppContext);

    return (
        <div className="content p-40">
            {/* <div className="d-flex mb-40">
                <img width={960} height={300} src="/img/slider1.svg" alt="Slider"/>
            </div> */}
            <div className="d-flex align-center justify-between mb-40 pr-30">
                <h1>Мои закладки</h1>
            </div>
            {/* подумать над условием */}
            {(favorites.length === 0) ? (
            <div className="favoriteEmpty d-flex align-center justify-center flex-column flex">
                <img className="mt-50" src="/img/favorite-smile.jpg" alt="Empty-cart" />
                <h2>Закладок нет :(</h2>
                <p className="opacity-6">Вы ничего не добавляли в закладки</p>
                <Link to="/">
                    <button className="greenButton">
                        <img src="/img/arrow.svg" alt="Arrow" />
                        Вернуться назад
                    </button>
                </Link>
            </div>
            ) : (
            <div className="d-flex flex-wrap">
                {favorites.map((item, index) => (
                    <Card 
                        key = {index}
                        favorited={true}
                        onFavorite={onAddToFavorite}
                        {...item}
                    />
                ))}
            </div> 
            )}
        </div>
    )
}

export default Favorites;