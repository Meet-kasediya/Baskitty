import { useState } from 'react';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Carousel from './components/Carousel';
import CardsGrid from './components/CardsGrid';
import CartModal from './components/CartModal';
import CategoryFilter from './components/CategoryFilter';
import WhyShopWithUs from './components/WhyShopWithUs';

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
const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const [searchTerm, setSearchTerm] = useState('');
  const [showThankYou, setShowThankYou] = useState(false);
 
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
  function onRemoveItem(title: string) {
    setCartItems(prev => prev.filter(ci => ci.title !== title));
  }

  function onClearCart() {
    setCartItems([]);
  }
function onCheckout() {
  setCartItems([]);
  setShowThankYou(true);

  setTimeout(() => {
    setIsCartOpen(false);
    setShowThankYou(false);
  }, 3000); // Close modal after 3 seconds
}
const filteredItems = cardData.filter(item => {
  const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
  const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
  return matchesCategory && matchesSearch;
});
  return (
    <>
      <Navbar
        onCartClick={() => setIsCartOpen(true)}
      cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)} // inline instead of totalItems
      
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



      {/* Cards grid shows filtered items */}
      <CardsGrid
        items={filteredItems}
        cartItems={cartItems}
        onAddToCart={onAddToCart}
        onIncrement={onIncrement}
        onDecrement={onDecrement}
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
  </>
  );
}

export default App;
