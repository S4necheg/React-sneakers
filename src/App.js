import React from 'react';
import axios from 'axios';
import Card from './components/Card';
import Header from './components/Header';
import Drawer from './components/Drawer';

// const arr = [
//   { title: 'Мужские Кроссовки Nike Blazer Mid Suede', price: '12 999', imageUrl:'/img/sneakers/1.jpg'},
//   { title: 'Мужские Кроссовки Nike Air Max 270', price: '12 999', imageUrl: '/img/sneakers/2.jpg'},
//   { title: 'Мужские Кроссовки Nike Blazer Mid Suede', price: '8 499', imageUrl: '/img/sneakers/3.jpg'},
//   { title: 'Кроссовки Puma X Aka Boku Future Rider', price: '8 999', imageUrl: '/img/sneakers/4.jpg'}
// ];

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [cartOpened, setCartOpened] = React.useState(false);

  React.useEffect(() => {
    axios.get('http://localhost:3001/items').then(res => {
      setItems(res.data);
    });
    axios.get('http://localhost:3001/cart').then(res => {
      setCartItems(res.data);
    });
  }, []);

  const onAddToCart = (obj) => {
    axios.post('http://localhost:3001/cart', obj);
    setCartItems(prev => [...prev, obj])
  };

  const omRemoveItem = (id) => {
    axios.delete(`http://localhost:3001/cart/${id}`);
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  }

  const onChangeSeachInput = (event) => {
    setSearchValue(event.target.value);
  }
 
  return (
    <div className="wrapper clear">
      {cartOpened && <Drawer items={cartItems} onClose={() => setCartOpened(false)} onRemove={omRemoveItem} />}
      <Header onClickCart={() => setCartOpened(true)} />

      <div className="content p-40">
        <div className="d-flex mb-40">
          <img width={960} height={300} src="/img/slider1.svg" alt="Slider"/>
        </div>
        <div className="d-flex align-center justify-between mb-40 pr-30">
          <h1>{searchValue ? `Поиск по запросу: "${searchValue}"` : 'Все кроссовки'}</h1>
          <div className="search-block d-flex">
            <img src="/img/search.svg" alt="Search" />
            {searchValue && <img onClick={() => setSearchValue('')} className="clear cu-p" src="/img/btn-remove.svg" alt="Clear" />}
            <input onChange={onChangeSeachInput} value={searchValue} placeholder="Поиск ..." />
          </div>
        </div>

        <div className="d-flex flex-wrap">
          {items.filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase())).map((item, index) => (
            <Card 
              key = {index}
              title={item.title}
              price={item.price}
              imageUrl={item.imageUrl}
              onFavorite={() => console.log('Добавили в закладки')}
              onPlus={(obj) => onAddToCart(obj)}
            />
          ))}
        </div> 
      </div>
    </div>
  );
}

export default App;
