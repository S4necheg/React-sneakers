import Card from '../components/Card';

function Home({
    items, 
    cartItems,
    searchValue, 
    setSearchValue, 
    onAddToCart, 
    onAddToFavorite, 
    onChangeSearchInput,
    isLoading
    }) {
    
    const renderItems = () => {
        const filtredItems = items.filter((item) => 
        item.title.toLowerCase().includes(searchValue.toLowerCase())
        );
        return (isLoading ? [...Array(12)] : filtredItems).map((item, index) => (
            <Card 
                key = {index}

                // id={item.id}
                // title={item.title}
                // price={item.price}
                // imageUrl={item.imageUrl}

                onFavorite={(obj) => onAddToFavorite(obj)}
                onPlus={(obj) => onAddToCart(obj)}
                added={cartItems.some((obj) => Number(obj.id) === Number(item.id))}
                loading={isLoading}
                {...item}
            />
        ))
    };

    return (
        <div className="content p-40">
            <div className="d-flex mb-40">
                <img width={960} height={300} src="/img/slider1.svg" alt="Slider"/>
            </div>
            <div className="d-flex align-center justify-between mb-40 pr-30">
                <h1>{searchValue ? `Поиск по запросу: "${searchValue}"` : 'Все кроссовки'}</h1>
                <div className="search-block d-flex">
                    <img src="/img/search.svg" alt="Search" />
                    {searchValue && <img onClick={() => setSearchValue('')} className="clear cu-p" src="/img/btn-remove.svg" alt="Clear" />}
                    <input onChange={onChangeSearchInput} value={searchValue} placeholder="Поиск ..." />
                </div>
            </div>

            <div className="d-flex flex-wrap">
                {renderItems()}
            </div> 
        </div>
    )
}

export default Home;