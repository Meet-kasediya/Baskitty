import type { FC } from 'react';

interface Props {
  title: string;
  cost: string;
  img: string;
  category: string;
  quantity?: number;
  onAddToCart: () => void;
  onIncrement: () => void;
  onDecrement: () => void;
}

const Card: FC<Props> = ({
  title,
  cost,
  img,
  category,
  quantity = 0,
  onAddToCart,
  onIncrement,
  onDecrement,
}) => {
  const numericCost = parseFloat(cost.replace(/[^0-9.]/g, ''));

  return (
    <div className="card h-100">
      <img
        src={img}
        className="card-img-top"
        alt={title}
        style={{
          height: '200px',
          objectFit: 'cover',
          objectPosition: 'center',
        }}
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{title}</h5>
        <p className="card-text fw-bold">${numericCost.toFixed(2)}</p>

        {quantity > 0 ? (
          <div className="d-flex align-items-center justify-content-between mt-auto">
            <button className="btn btn-outline-secondary btn-sm" onClick={onDecrement}>
              –
            </button>
            <span>{quantity}</span>
            <button className="btn btn-outline-secondary btn-sm" onClick={onIncrement}>
              +
            </button>
          </div>
        ) : (
          <button className="btn btn-success rounded-pill px-4 py-2 shadow-sm" onClick={onAddToCart}>
            Add to cart
          </button>
        )}
      </div>
    </div>
  );
};

export default Card;
