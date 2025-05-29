import { useEffect, useState } from 'react';
import './index.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Carousel from './components/Carousel';
import CardsGrid from './components/CardsGrid';
import CartModal from './components/CartModal';
import CategoryFilter from './components/CategoryFilter';
import WhyShopWithUs from './components/WhyShopWithUs';
import ToastMessage from './components/ToastMessage';
import Pagination from './components/Pagination';
import { cardData } from './data/groceryItems';

interface CartItem {
  title: string;
  quantity: number;
  cost: string;
  img: string;
}



function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [showThankYou, setShowThankYou] = useState(false);

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('cartItems');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Toast state
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  function showToastMsg(msg: string) {
    setToastMessage(msg);
    setShowToast(true);
  }

    const [isLoading, setIsLoading] = useState(true);
  // Simulate loading screen
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // Show loading for 1.5 seconds
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  function onAddToCart(item: typeof cardData[0]) {
    setCartItems(prev => {
      const existing = prev.find(ci => ci.title === item.title);
      if (existing) {
        showToastMsg(`Increased quantity of "${item.title}"`);
        return prev.map(ci =>
          ci.title === item.title ? { ...ci, quantity: ci.quantity + 1 } : ci
        );
      } else {
        showToastMsg(`Added "${item.title}" to cart`);
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

  function onRemoveItem(title: string) {
    setCartItems(prev => {
      showToastMsg(`Removed "${title}" from cart`);
      return prev.filter(ci => ci.title !== title);
    });
  }

  function onClearCart() {
    setCartItems([]);
    showToastMsg('Cart cleared');
  }

  function onCheckout() {
    setCartItems([]);
    setShowThankYou(true);
    showToastMsg('Thank you for your purchase!');

    setTimeout(() => {
      setIsCartOpen(false);
      setShowThankYou(false);
    }, 3000);
  }

  const filteredItems = cardData.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const [currentPage, setCurrentPage] = useState(1);
const itemsPerPage = 12;
const startIndex = (currentPage - 1) * itemsPerPage;
const pagedItems = filteredItems.slice(startIndex, startIndex + itemsPerPage);

// inside your App component:
const [showScrollTop, setShowScrollTop] = useState(false);

useEffect(() => {
  function handleScroll() {
    setShowScrollTop(window.pageYOffset > 300);
  }
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);
if (isLoading) {
  return (
    <div className="loading-screen">
      <div className="paw-trail">
        {[...Array(2)].map((_, i) => (
          <img
            key={i}
            src="/paw.png"
            alt="paw"
            className="paw"
            style={{ animationDelay: `${i * 0.3}s` }}
          />
        ))}
      </div>
      <p className="loading-text">Your fresh groceries are on their way...</p>
    </div>
  );
}

  return (
    <>
      <Navbar
        onCartClick={() => setIsCartOpen(true)}
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        totalItems={cartItems.length}
      />
      <Carousel />

      <section className="container my-5">
        <h2 className="text-center mb-4">About Baskitty</h2>
        <p className="lead text-center">
          Baskitty is your neighborhood online grocery store bringing you the freshest fruits and vegetables at the best prices.
          We believe in quality, speed, and putting a smile on your face — every single time.
        </p>
      </section>

      <div className="text-center my-4">
        <h2 className="display-6 fw-bold">
          What's in Your Basket Today?
        </h2>
      </div>

      <CategoryFilter
        selectedCategory={selectedCategory}
        onCategorySelect={setSelectedCategory}
      />

  <CardsGrid
    items={pagedItems}
    cartItems={cartItems}
    onAddToCart={onAddToCart}
    onIncrement={onIncrement}
    onDecrement={onDecrement}
  />
  
  <Pagination
    currentPage={currentPage}
    totalPages={Math.ceil(filteredItems.length / itemsPerPage)}
    onPageChange={setCurrentPage}
  />
      <WhyShopWithUs />
      <Footer />

      {isCartOpen && (
        <CartModal
          cartItems={cartItems}
          onClose={() => setIsCartOpen(false)}
          onIncrement={onIncrement}
          onDecrement={onDecrement}
          onRemoveItem={onRemoveItem}
          onClearCart={onClearCart}
          onCheckout={onCheckout}
          showThankYou={showThankYou}
        />
      )}

      <ToastMessage
        message={toastMessage}
        show={showToast}
        onClose={() => setShowToast(false)}
      />
      {showScrollTop && (
  <button
    className="scroll-to-top btn btn-primary"
    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    aria-label="Scroll to top"
  >
    ↑
  </button>
)}

    </>
  );
}

export default App;
