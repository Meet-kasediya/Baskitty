import Card from './Card';
import type { FC } from 'react';

interface Item {
  title: string;
  cost: string;
  img: string;
  category: string;
}

interface CardsGridProps {
  items: Item[];
  cartItems: { title: string; quantity: number }[];
  onAddToCart: (item: Item) => void;
  onIncrement: (title: string) => void;
  onDecrement: (title: string) => void;
}

const CardsGrid: FC<CardsGridProps> = ({ items, cartItems, onAddToCart, onIncrement, onDecrement }) => {
  return (
    <div className="row row-cols-1 row-cols-md-5 g-4 m-2">
      {items.map((card, index) => {
        const quantity = cartItems.find((i) => i.title === card.title)?.quantity || 0;
        return (
          <div className="col" key={index}>
            <Card
              title={card.title}
              cost={card.cost}
              img={card.img}
              category={card.category}
              quantity={quantity}
              onAddToCart={() => onAddToCart(card)}
              onIncrement={() => onIncrement(card.title)}
              onDecrement={() => onDecrement(card.title)}
            />
          </div>
        );
      })}
    </div>
  );
};

export default CardsGrid;
