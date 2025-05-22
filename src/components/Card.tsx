import type { FC } from 'react';

interface Props {
  title: string;
  cost: string;
  img: string;
  category: string;
  quantity?: number;
  onAddToCart?: () => void;
  onIncrement?: () => void;
  onDecrement?: () => void;
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
  return (
    <div className="card h-100">
      <img src={img} alt={title} className="card-img-top" style={{ height: '200px', objectFit: 'cover' }} />
      <div className="card-body d-flex flex-column justify-content-between">
        <div>
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{cost}</p>
          <p className="text-muted">{category}</p>
        </div>

        {quantity > 0 ? (
          <div className="d-flex justify-content-between align-items-center">
            <button className="btn btn-outline-danger" onClick={onDecrement}>
              –
            </button>
            <span>{quantity}</span>
            <button className="btn btn-outline-success" onClick={onIncrement}>
              +
            </button>
          </div>
        ) : (
          <button className="btn btn-primary mt-2" onClick={onAddToCart}>
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default Card;
