import Card from '../components/Card';

function Favorites({items, onAddToFavorite}) {
    return (
        <div className="content p-40">
            {/* <div className="d-flex mb-40">
                <img width={960} height={300} src="/img/slider1.svg" alt="Slider"/>
            </div> */}
            <div className="d-flex align-center justify-between mb-40 pr-30">
                <h1>Мои закладки</h1>
            </div>

            <div className="d-flex flex-wrap">
                {items.map((item, index) => (
                    <Card 
                        key = {index}
                        favorited={true}
                        onFavorite={onAddToFavorite}
                        {...item}
                    />
                ))}
            </div> 
        </div>
    )
}

export default Favorites;