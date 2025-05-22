import type { FC } from 'react';

export interface CartItem {
  title: string;
  quantity: number;
  cost: string;
  img: string;
}

interface CartModalProps {
  cartItems: CartItem[];
  onClose: () => void;
  onIncrement: (title: string) => void;
  onDecrement: (title: string) => void;
}

const CartModal: FC<CartModalProps> = ({ cartItems, onClose, onIncrement, onDecrement }) => {
  // Calculate total price per item and overall total
  const totalPrice = cartItems.reduce((acc, item) => {
    // Convert cost string to number, assuming format like "$10"
    const costNumber = parseFloat(item.cost.replace(/[^0-9.-]+/g, ''));
    return acc + costNumber * item.quantity;
  }, 0);

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button onClick={onClose}>Close</button>
        <h2>Your Cart</h2>
        {cartItems.length === 0 && <p>Your cart is empty.</p>}
        {cartItems.map(item => (
          <div key={item.title} className="cart-item" style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
            <img src={item.img} alt={item.title} style={{ width: 60, height: 60, objectFit: 'cover', marginRight: 10 }} />
            <div style={{ flexGrow: 1 }}>
              <h4>{item.title}</h4>
              <p>Unit Price: {item.cost}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Total: ${(parseFloat(item.cost.replace(/[^0-9.-]+/g, '')) * item.quantity).toFixed(2)}</p>
              <button onClick={() => onIncrement(item.title)}>+</button>
              <button onClick={() => onDecrement(item.title)}>-</button>
            </div>
          </div>
        ))}
        <h3>Total: ${totalPrice.toFixed(2)}</h3>
      </div>
    </div>
  );
};

export default CartModal;
