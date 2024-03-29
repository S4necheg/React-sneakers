import React from 'react'
import { Link } from 'react-router-dom';

import {useCart} from '../hooks/useCart'

function Header(props) {
    const { totalPrice } = useCart();

    return (
    <header className="d-flex justify-between align-center p-40">
        <Link to="React-sneakers/">
          <div className="d-flex align-center">
            <img width={40} height={40} src="img/logo.png" alt="Logotype" />
            <div>
              <h3 className="text-uppercase">React Sneakers</h3>
              <p className="opacity-5">Магазин лучших кроссовок</p>
            </div>
          </div>
        </Link>
        <ul className="d-flex">
          <li onClick={props.onClickCart} className="mr-30 cu-p">
            <img width={18} height={17.18} src="img/cart.svg" alt="Корзина" />
            <span>{totalPrice !== 0 ? String(Math.floor(totalPrice / 1000)) + " " + String(totalPrice).substr(String(totalPrice).length - 3) : 0} руб.</span>
          </li>
          <li className="mr-20 cu-p">
            <Link to="React-sneakers/favorites">
              <img width={20.87} height={18.95} src="img/favorit.svg" alt="Закладки" />
            </Link>
          </li>
          <li>
            <Link to="React-sneakers/orders">
              <img width={20} height={20} src="img/user.svg" alt="Пользователь" />
            </Link>
          </li>
        </ul>
    </header>
    );
}

export default Header;