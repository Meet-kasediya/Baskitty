import { useState } from 'react';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import About from './components/About';
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
  const [selectedCategory, setSelectedCategory] = useState<string>('');

const [searchTerm, setSearchTerm] = useState('');
const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
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

const filteredItems = selectedCategory
  ? cardData.filter(item => item.category === selectedCategory)
  : cardData;
  return (
    <>
<Navbar
  onCartClick={() => setIsCartOpen(true)}
  cartCount={cartItems.length}     // if still needed
  searchTerm={searchTerm}
  setSearchTerm={setSearchTerm}
  totalItems={totalItems}
/>
      <Carousel />

<CategoryFilter
  categories={[...new Set(cardData.map(item => item.category))]}
  selectedCategory={selectedCategory || ''}
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

      <About />

      <Footer />


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
