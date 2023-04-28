import React from 'react';
import axios from 'axios';
import Card from '../components/Card';
//import AppContext from '../context';

function Orders() {
    //const {onAddToFavorite, onAddToCart} = React.useContext(AppContext)
    const [orders, setOrders] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get('http://localhost:3001/orders');
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
                <img width={960} height={300} src="/img/slider1.svg" alt="Slider"/>
            </div> */}
            <div className="d-flex align-center justify-between mb-40 pr-30">
                <h1>Мои заказы</h1>
            </div>

            <div className="d-flex flex-wrap">
                {(isLoading ? [...Array(12)] : orders).map((item, index) => (
                    <Card 
                    key = {index}
                    loading={isLoading}
                    {...item}   
                    />
                ))}
            </div> 
        </div>
    )
}

export default Orders;