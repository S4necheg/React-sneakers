import React from 'react';
import axios from 'axios';
import Card from '../components/Card';
import { Link } from 'react-router-dom';
//import AppContext from '../context';

function Orders() {
    //const {onAddToFavorite, onAddToCart} = React.useContext(AppContext)
    const [orders, setOrders] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        (async () => {
            try {
                //const { data } = await axios.get('http://localhost:3001/orders');
                const { data } = await axios.get('https://644feeb1b61a9f0c4d2f2f9d.mockapi.io/orders');
                setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
                setIsLoading(false);
            } catch (error) {
                alert('Ошибка при запросе заказов')
                console.error(error)
            }
        })();
    }, []);

    return (
        <div className="content p-40">
            {/* <div className="d-flex mb-40">
                <img width={960} height={300} src="img/slider1.svg" alt="Slider"/>
            </div> */}
            <div className="d-flex align-center justify-between mb-40 pr-30">
                <h1>Мои заказы</h1>
            </div>
            {/* подумать над условием */}
            {(orders.length === 0) ? (
            <div className="favoriteEmpty d-flex align-center justify-center flex-column flex">
                <img className="mt-50" src="img/order-smile.jpg" alt="Empty-cart" />
                <h2>У вас нет заказов</h2>
                <p className="opacity-6">Вы нищеброд?</p>
                <p className="opacity-6">Оформите хотя бы один заказ.</p>
                <Link to="/React-sneakers/">
                    <button className="greenButton">
                        <img src="img/arrow.svg" alt="Arrow" />
                        Вернуться назад
                    </button>
                </Link>
            </div>
            ) : (
            <div className="d-flex flex-wrap">
                {(isLoading ? [...Array(12)] : orders).map((item, index) => (
                    <Card 
                    key = {index}
                    loading={isLoading}
                    {...item}   
                    />
                ))}
            </div> 
            )}
        </div>
    )
}

export default Orders;