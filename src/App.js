import React from 'react';
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
  const [cartOpened, setCartOpened] = React.useState(false);

  React.useEffect(() => {
    fetch('http://localhost:3001/items').then((res) => {
      return res.json();
    }).then((json) => {
      setItems(json);
    });
  }, []);

  return (
    <div className="wrapper clear">
      {cartOpened && <Drawer onClose={() => setCartOpened(false)} />}
      <Header onClickCart={() => setCartOpened(true)} />

      <div className="content p-40">
        <div className="d-flex mb-40">
          <img width={960} height={300} src="/img/slider1.svg" alt="Slider"/>
        </div>
        <div className="d-flex align-center justify-between mb-40 pr-30">
          <h1>Все кроссовки</h1>
          <div className="search-block d-flex">
            <img src="/img/search.svg" alt="Search" />
            <input placeholder="Поиск ..." />
          </div>
        </div>

        <div className="d-flex flex-wrap">
          {items.map((obj) => (
            <Card 
              title={obj.title}
              price={obj.price}
              imageUrl={obj.imageUrl}
              onFavorite={() => console.log('Добавили в закладки')}
              onPlus={() => console.log('Нажали плюс')}
            />
          ))}
        </div> 
      </div>
    </div>
  );
}

export default App;
