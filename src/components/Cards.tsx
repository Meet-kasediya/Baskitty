import { useState } from "react";

type CardData = {
  id: number;
  title: string;
  description: string;
  price: string;
};

const initialCards: CardData[] = [
  { id: 1, title: "Apple", description: "Fresh and juicy apples.", price: "$1.99" },
  { id: 2, title: "Banana", description: "Ripe bananas full of energy.", price: "$0.99" },
  { id: 3, title: "Carrot", description: "Organic carrots, crunchy and sweet.", price: "$2.49" },
];

export default function Cards() {
  const [cards, setCards] = useState(initialCards);

  // Example of a JS interaction: Remove a card when clicking "Remove"
  function removeCard(id: number) {
    setCards(cards.filter(card => card.id !== id));
  }

  return (
    <section className="py-5">
      <div className="container">
        <h2 className="mb-4">Our Products</h2>
        <div className="row">
          {cards.map(card => (
            <div key={card.id} className="col-md-4 mb-4">
              <div className="card h-100">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{card.title}</h5>
                  <p className="card-text flex-grow-1">{card.description}</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="text-primary fw-bold">{card.price}</span>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => removeCard(card.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {cards.length === 0 && <p>No products left!</p>}
        </div>
      </div>
    </section>
  );
}
