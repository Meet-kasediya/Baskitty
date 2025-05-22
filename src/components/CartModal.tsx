import { FC } from 'react';

interface CartItem {
  title: string;
  quantity: number;
  cost: string;
}

interface CartModalProps {
  cartItems: CartItem[];
  onClose: () => void;
  onIncrement: (title: string) => void;
  onDecrement: (title: string) => void;
}

const CartModal: FC<CartModalProps> = ({ cartItems, onClose, onIncrement, onDecrement }) => {
  const total = cartItems.reduce((acc, item) => {
    const cost = parseFloat(item.cost.replace(/[^0-9.]/g, ''));
    return acc + cost * item.quantity;
  }, 0);

  return (
    <div className="modal show d-block" tabIndex={-1} role="dialog" aria-modal="true" aria-labelledby="cartModalLabel">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="cartModalLabel">Your Cart</h5>
            <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
          </div>
          <div className="modal-body">
            {cartItems.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              <ul className="list-group">
                {cartItems.map((item) => (
                  <li key={item.title} className="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                      <strong>{item.title}</strong> x {item.quantity}
                    </div>
                    <div>
                      <button className="btn btn-sm btn-outline-secondary me-2" onClick={() => onDecrement(item.title)}>
                        –
                      </button>
                      <button className="btn btn-sm btn-outline-secondary" onClick={() => onIncrement(item.title)}>
                        +
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="modal-footer">
            <h5 className="me-auto">Total: ${total.toFixed(2)}</h5>
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
            <button type="button" className="btn btn-primary" disabled={cartItems.length === 0}>
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartModal;
