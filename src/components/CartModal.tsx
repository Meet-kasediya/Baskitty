import { useEffect, useRef, useState } from 'react';

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
}

export default function CartModal({ cartItems, onClose, onIncrement, onDecrement }: CartModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [checkedOut, setCheckedOut] = useState(false);

  useEffect(() => {
    const modalElement = modalRef.current;
    if ((window as any).bootstrap && modalElement) {
      const modal = new (window as any).bootstrap.Modal(modalElement);
      modal.show();

      modalElement.addEventListener('hidden.bs.modal', onClose);

      return () => {
        modalElement.removeEventListener('hidden.bs.modal', onClose);
      };
    }
  }, [onClose]);

  const handleCheckout = () => {
    setCheckedOut(true);
    setTimeout(() => {
      setCheckedOut(false);
      onClose();
    }, 2500);
  };

  const totalPrice = cartItems.reduce((sum, item) => {
    const price = parseFloat(item.cost.replace(/[^\d.]/g, ''));
    return sum + price * item.quantity;
  }, 0);

  return (
    <div className="modal fade" tabIndex={-1} ref={modalRef}>
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Your Cart</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>

          <div className="modal-body">
            {checkedOut ? (
              <div className="text-center p-4">
                <h4 className="text-success">🎉 Thank you for your purchase!</h4>
              </div>
            ) : cartItems.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              cartItems.map((item, idx) => (
                <div key={idx} className="d-flex align-items-center mb-3 border-bottom pb-2">
                  <img src={item.img} alt={item.title} width={80} height={80} className="me-3 rounded" />
                  <div className="flex-grow-1">
                    <h6 className="mb-0">{item.title}</h6>
                    <small>{item.cost} × {item.quantity}</small>
                  </div>
                  <div className="d-flex align-items-center">
                    <button className="btn btn-sm btn-outline-secondary me-1" onClick={() => onDecrement(item.title)}>-</button>
                    <span>{item.quantity}</span>
                    <button className="btn btn-sm btn-outline-secondary ms-1" onClick={() => onIncrement(item.title)}>+</button>
                  </div>
                </div>
              ))
            )}
          </div>

          {!checkedOut && cartItems.length > 0 && (
            <div className="modal-footer justify-content-between">
              <h5>Total: ₹{totalPrice.toFixed(2)}</h5>
              <button className="btn btn-primary" onClick={handleCheckout}>
                Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
