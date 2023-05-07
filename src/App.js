import React from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Header from './components/Header';
import Drawer from './components/Drawer';
import AppContext from './context';

import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Orders from './pages/Orders';

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [cartOpened, setCartOpened] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchData() { 
      try {
        //const cartResponse = await axios.get('http://localhost:3001/cart');
        const cartResponse = await axios.get('https://6447bb067bb84f5a3e47276f.mockapi.io/cart')
        //const favoritesResponse = await axios.get('http://localhost:3001/favorites');
        const favoritesResponse = await axios.get('https://644feeb1b61a9f0c4d2f2f9d.mockapi.io/favorites');
        //const itemsResponse = await axios.get('http://localhost:3001/items');
        const itemsResponse = await axios.get('https://6447bb067bb84f5a3e47276f.mockapi.io/Items');
  
        setIsLoading(false);
  
        setCartItems(cartResponse.data);
        setFavorites(favoritesResponse.data);
        setItems(itemsResponse.data);
      } catch (error) {
        alert('Ошибка при запросе данных')
      }
    }

    fetchData();
  }, []);

  const onAddToCart = async (obj) => {
    try {
      const findItem = cartItems.find((item) => Number(item.parentId) === Number(obj.id))
      if (findItem) {
        setCartItems(prev => prev.filter(item => Number(item.parentId) !== Number(obj.id)));
        //axios.delete(`http://localhost:3001/cart/${obj.id}`);
        axios.delete(`https://6447bb067bb84f5a3e47276f.mockapi.io/cart/${findItem.id}`);
      } else {
        setCartItems((prev) => [...prev, obj])
        //axios.post('http://localhost:3001/cart', obj);
        axios.post('https://6447bb067bb84f5a3e47276f.mockapi.io/cart', obj);
      }
    } catch (error) {
      alert('Ошибка при добавлении в корзину')
    }
  };

  const onRemoveItem = (id) => {
    try {
      //axios.delete(`http://localhost:3001/cart/${id}`);
      axios.delete(`https://6447bb067bb84f5a3e47276f.mockapi.io/cart/${id}`);
      setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(id)));
    } catch (error) {
      alert('Ошибка при удалении из корзины')
    }
  };

  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find((favObj) => Number(favObj.id) === Number(obj.id))) {
        //axios.delete(`http://localhost:3001/favorites/${obj.id}`);
        axios.delete(`https://644feeb1b61a9f0c4d2f2f9d.mockapi.io/favorites/${obj.id}`);
        //Мгновенно удаляет объект из Избранного
        setFavorites(prev => prev.filter(item => Number(item.id) !== Number(obj.id)));
      } else {
        //const { data } = await axios.post('http://localhost:3001/favorites', obj);
        const { data } = await axios.post('https://644feeb1b61a9f0c4d2f2f9d.mockapi.io/favorites', obj);
        setFavorites((prev) => [...prev, data]);
      }
    } catch (error) {
      alert("Не удалось добавить в фавориты")
    }
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.parentId) === Number(id))
  }
 
  return (
    <AppContext.Provider value={{items, cartItems, favorites, isItemAdded, onAddToFavorite, onAddToCart, setCartOpened, setCartItems}}>
      <div className="wrapper clear">
        <Drawer items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem} opened={cartOpened} />
        
        <Header onClickCart={() => setCartOpened(true)} />

        <Routes>
          <Route path="React-sneakers" exact element={
          <Home 
          items={items} 
          cartItems={cartItems}
          searchValue={searchValue}
          setSearchValue={setSearchValue} 
          onChangeSearchInput={onChangeSearchInput}
          onAddToFavorite={onAddToFavorite}
          onAddToCart={onAddToCart}
          isLoading={isLoading} />
          } />

          <Route path="React-sneakers/favorites" element={
          <Favorites />
          } />

          <Route path="React-sneakers/orders" element={
            <Orders />

          } />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
