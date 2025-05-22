import { useState } from 'react';

import CardsGrid from './components/CardsGrid';
import CartModal from './components/CartModal';
import { cardData } from './data/groceryItems';

interface CartItem {
  title: string;
  quantity: number;
  cost: string;
  img: string;
}

function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Add item to cart
  function onAddToCart(item: typeof cardData[0]) {
    setCartItems(prev => {
      const existing = prev.find(ci => ci.title === item.title);
      if (existing) {
        return prev.map(ci =>
          ci.title === item.title ? { ...ci, quantity: ci.quantity + 1 } : ci
        );
      } else {
        return [...prev, { title: item.title, quantity: 1, cost: item.cost, img: item.img }];
      }
    });
  }

  function onIncrement(title: string) {
    setCartItems(prev =>
      prev.map(ci =>
        ci.title === title ? { ...ci, quantity: ci.quantity + 1 } : ci
      )
    );
  }

  function onDecrement(title: string) {
    setCartItems(prev =>
      prev
        .map(ci =>
          ci.title === title ? { ...ci, quantity: Math.max(ci.quantity - 1, 0) } : ci
        )
        .filter(ci => ci.quantity > 0)
    );
  }

  // Prepare cartItems with img — actually already done in add/increment/decrement above
  // If your cartItems don’t have img for some reason, you can map here:
  // const cartItemsWithImg = cartItems.map(cartItem => {
  //   const product = cardData.find(item => item.title === cartItem.title);
  //   return {...cartItem, img: product ? product.img : ''};
  // });

  return (
    <>
      <button onClick={() => setIsCartOpen(true)}>Open Cart ({cartItems.length})</button>

      <CardsGrid
        items={cardData}
        cartItems={cartItems}
        onAddToCart={onAddToCart}
        onIncrement={onIncrement}
        onDecrement={onDecrement}
      />

      {isCartOpen && (
        <CartModal
          cartItems={cartItems}
          onClose={() => setIsCartOpen(false)}
          onIncrement={onIncrement}
          onDecrement={onDecrement}
        />
      )}
    </>
  );
}

export default App;
