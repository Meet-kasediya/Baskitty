import type { FC } from 'react';

interface CartItem {
  title: string;
  cost: string;
  quantity: number;
  img: string;
}

interface CartModalProps {
  cartItems: CartItem[];
  onClose: () => void;
  onIncrement: (title: string) => void;
  onDecrement: (title: string) => void;
  onRemoveItem: (title: string) => void;
  onClearCart: () => void;
  onCheckout: () => void;
  showThankYou: boolean;
}

const CartModal: FC<CartModalProps> = ({
  cartItems,
  onClose,
  onIncrement,
  onDecrement,
  onRemoveItem,
  onClearCart,
  onCheckout,
  showThankYou,
}) => {
  const totalCost = cartItems.reduce(
    (sum, item) => sum + item.quantity * parseFloat(item.cost),
    0
  );

  return (
    <div className="modal-backdrop">
      <div className="modal" style={{ display: 'block', backgroundColor: 'white' }}>
        <div className="modal-header">
          <h5 className="modal-title">Your Cart</h5>
          <button type="button" className="btn-close" onClick={onClose}></button>
        </div>
        <div className="modal-body">
          {showThankYou ? (
            <div className="text-center p-4">
              <h4>🎉 Thank you for your purchase!</h4>
              <p>Your order has been placed successfully.</p>
            </div>
          ) : cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <ul className="list-group">
              {cartItems.map((item) => (
                <li key={item.title} className="list-group-item d-flex align-items-center">
                  <img
                    src={item.img}
                    alt={item.title}
                    style={{ width: '50px', marginRight: '10px' }}
                  />
                  <div className="flex-grow-1">
                    <strong>{item.title}</strong> - ${item.cost} x {item.quantity}
                    <div>Total: ${(parseFloat(item.cost) * item.quantity).toFixed(2)}</div>
                    <div className="btn-group mt-1">
                      <button
                        className="btn btn-sm btn-secondary"
                        onClick={() => onDecrement(item.title)}
                      >
                        -
                      </button>
                      <button
                        className="btn btn-sm btn-secondary"
                        onClick={() => onIncrement(item.title)}
                      >
                        +
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => onRemoveItem(item.title)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        {!showThankYou && cartItems.length > 0 && (
          <div className="modal-footer">
            <div className="me-auto">
              <strong>Total: ${totalCost.toFixed(2)}</strong>
            </div>
            <button className="btn btn-outline-danger" onClick={onClearCart}>
              Clear Cart
            </button>
            <button className="btn btn-success" onClick={onCheckout}>
              Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartModal;
