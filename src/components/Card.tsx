import { useEffect } from 'react';
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
  // Prevent unused variable TypeScript errors
  useEffect(() => {
    void category;
    void quantity;
    void onAddToCart;
    void onIncrement;
    void onDecrement;
  }, [category, quantity, onAddToCart, onIncrement, onDecrement]);

  return (
    <div className="card">
      <img src={img} alt={title} />
      <h3>{title}</h3>
      <p>{cost}</p>
    </div>
  );
};

export default Card;
