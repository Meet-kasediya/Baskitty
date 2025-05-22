import { useEffect } from 'react';
import { cardData } from '../data/groceryItems';

const bootstrap = (window as any).bootstrap;

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
        {cardData.map((item, index) => (
          <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
            <img
              src={item.img}
              className="d-block w-100"
              alt={item.title}
              style={{ maxHeight: '500px', objectFit: 'cover', width: '100%' }}
            />
            <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded p-2">
              <h5>{item.title}</h5>
              <p>{item.cost}</p>
            </div>
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
