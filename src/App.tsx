import { useState } from 'react';
import Navbar from './components/Navbar';
import Carousel from './components/Carousel';
import About from './components/About';
import CategoryFilter from './components/CategoryFilter';
import CardsGrid from './components/CardsGrid';
import WhyShopWithUs from './components/WhyShopWithUs';
import Footer from './components/Footer';
import CartModal from './components/CartModal';
import { cardData } from './data/groceryItems';

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cartItems, setCartItems] = useState<{ title: string; quantity: number }[]>([]);
  const [showCart, setShowCart] = useState(false);

  const filteredItems = cardData.filter(({ title, category }) => {
    const matchesSearch = title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const addToCart = (item: { title: string }) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.title === item.title);
      if (existing) {
        return prev.map((i) =>
          i.title === item.title ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { title: item.title, quantity: 1 }];
    });
  };

  const incrementQuantity = (title: string) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.title === title ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrementQuantity = (title: string) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.title === title ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  return (
    <>
      <Navbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        totalItems={totalItems}
        onCartClick={() => setShowCart(true)}
      />
      <Carousel />
      <About />
      <CategoryFilter selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} />
      <CardsGrid
        items={filteredItems}
        cartItems={cartItems}
        onAddToCart={addToCart}
        onIncrement={incrementQuantity}
        onDecrement={decrementQuantity}
      />
      <WhyShopWithUs />
      <Footer />
      {showCart && (
        <CartModal
          cartItems={cartItems.map((cartItem) => {
            const item = cardData.find((card) => card.title === cartItem.title);
            return { ...cartItem, cost: item?.cost || '' };
          })}
          onClose={() => setShowCart(false)}
          onIncrement={incrementQuantity}
          onDecrement={decrementQuantity}
        />
      )}
    </>
  );
}
