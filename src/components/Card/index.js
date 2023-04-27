import React from 'react';
import ContentLoader from "react-content-loader";
import styles from './Card.module.scss';
import AppContext from '../../context';

function Card({
    id, 
    title, 
    imageUrl, 
    price, 
    onFavorite, 
    onPlus, 
    favorited = false, 
    loading = false
}) {
    const {isItemAdded} = React.useContext(AppContext);
    const [isFavorite, setIsFavorite] = React.useState(favorited);

    const onClickPlus = () => {
        onPlus({id, title, imageUrl, price});
    };

    const onClickFavorite = () => {
        onFavorite({id, title, imageUrl, price});
        setIsFavorite(!isFavorite);
    };

    return (
        <div className={styles.card}>
            {
                loading ? (<ContentLoader 
                speed={2}
                width={240}
                height={228}
                viewBox="0 0 240 220"
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb">
                <rect x="0" y="0" rx="10" ry="10" width="145" height="132" />
                <rect x="0" y="146" rx="5" ry="5" width="145" height="15" /> 
                <rect x="0" y="165" rx="5" ry="5" width="89" height="15" /> 
                <rect x="0" y="190" rx="5" ry="5" width="69" height="29" /> 
                <rect x="109" y="184" rx="10" ry="10" width="36" height="36" />
              </ContentLoader>) : (
              <>
                <div className={styles.favorite} onClick={onClickFavorite}>
                    <img src={isFavorite ? '/img/sneakers/liked.svg' : '/img/sneakers/unliked.svg'} alt="Unliked" />
                </div>
                <img width={133} height={112} src={imageUrl} alt="Sneakers" />
                <h5>{title}</h5>
                <div className="d-flex justify-between align-center">
                    <div className="d-flex flex-column">
                        <span>Цена:</span>
                        <b>{price} руб.</b>
                    </div>
                    <img className={styles.plus} onClick={onClickPlus} src={isItemAdded(id) ? "/img/sneakers/btn-checked.svg" : "/img/sneakers/btn-plus.svg"} alt="Plus" />
                </div>
               </>
            )}
        </div>
    );
}
export default Card;