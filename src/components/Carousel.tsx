import { useEffect } from 'react';
import { cardData as groceryItems } from '../data/groceryItems';

const bootstrap = (window as any).bootstrap;

interface Item {
  title: string;
  cost: string;
  img: string;
  category: string;
}

export default function Carousel() {
  useEffect(() => {
    const carouselElement = document.querySelector('#foodCarousel');
    if (bootstrap && carouselElement) {
      new bootstrap.Carousel(carouselElement, {
        interval: 3000,
        ride: 'carousel',
      });
    }
  }, []);

  return (
    <div
      id="foodCarousel"
      className="carousel slide carousel-fade w-100"
      data-bs-ride="carousel"
      data-bs-interval="3000"
    >
      <div className="carousel-inner">
        {groceryItems.map((item: Item, index: number) => (
          <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
            <img
              src={item.img}
              className="d-block w-100"
              alt={item.title}
              style={{ maxHeight: '500px', objectFit: 'cover', width: '100%' }}
            />
          </div>
        ))}
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#foodCarousel" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#foodCarousel" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}
