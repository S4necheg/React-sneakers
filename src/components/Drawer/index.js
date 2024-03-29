import React from 'react'
import axios from 'axios';

import Info from '../Info'
import {useCart} from '../../hooks/useCart'

import styles from './Drawer.module.scss'

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function Drawer({onClose, onRemove, items = [], opened}) {
    const { cartItems, setCartItems, totalPrice } = useCart();
    const [orderId, setOrderId] = React.useState(null);
    const [isOrderComplete, setIsOrderComplete] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);

    const onClickOrder = async () => {
        try {
            setIsLoading(true);
            //const {data} = await axios.post('http://localhost:3001/orders', {
            const {data} = await axios.post('https://644feeb1b61a9f0c4d2f2f9d.mockapi.io/orders', {
                items: cartItems,
            });
            //
            //await axios.put('http://localhost:3001/cart', []);
            setOrderId(data.id);
            setIsOrderComplete(true);
            setCartItems([]);
            
            //КОСТЫЛЬ для очистки содержимого корзины при нажатии кнопки "Оформить заказ"
            for (let i = 0; i < cartItems.length; i++) {
                const item = cartItems[i];
                //await axios.delete('http://localhost:3001/cart/' + item.id);
                await axios.delete('https://6447bb067bb84f5a3e47276f.mockapi.io/cart/' + item.id);
                await delay(1000);
            }
        } catch (error) {
            alert('Ошибка при создании заказа :(');
        }
        setIsLoading(false);
    };

    return (
        <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ''}`}>
            <div className={styles.drawer}>
                <h2 className="d-flex justify-between mb-30">Корзина <img onClick={onClose} className="removeBtn cu-p" src="img/btn-remove.svg" alt="Close" />
                </h2>
                
                {
                    items.length > 0 ? (
                    <div className="d-flex flex-column flex">
                        <div className="items flex">
                            {items.map((obj) => (
                                <div key={obj.id} className="cartItem d-flex align-center mb-20">
                                    <div style={{ backgroundImage: `url(${obj.imageUrl})`}} className="cartItemImg"></div>
                                    <div className="mr-20 flex">
                                        <p className="mb-5">{obj.title}</p>
                                        <b>{obj.price} руб.</b>
                                    </div>
                                    <img onClick={() => onRemove(obj.id)} className="removeBtn" src="img/btn-remove.svg" alt="Remove" />
                                </div>
                            ))}
                        </div>
                        <div className="cartTotalBlock">
                        <ul>
                            <li className="d-flex">
                            <span>Итого:</span>
                            <div></div>
                            <b>{totalPrice !== 0 ? String(Math.floor(totalPrice / 1000)) + " " + String(totalPrice).substr(String(totalPrice).length - 3) : 0} руб.</b>
                            </li>
                            <li className="d-flex">
                            <span>Налог 5%:</span>
                            <div></div>
                            <b>{ Math.floor(totalPrice * 0.05) } руб.</b>
                            </li>
                        </ul>
                        <button disabled={isLoading} onClick={onClickOrder} className="greenButton">Оформить заказ<img src="img/arrow.svg" alt="Arrow" /></button>
                        </div>
                    </div>
                ) : ( 
                <Info 
                title={isOrderComplete ? "Заказ оформлен!" : "Корзина пустая" }
                image={isOrderComplete ? "img/complete-order.jpg" : "img/empty-cart.jpg"} 
                description={isOrderComplete ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке` : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."} />
                )}
            </div>
        </div>
    );
}

export default Drawer;