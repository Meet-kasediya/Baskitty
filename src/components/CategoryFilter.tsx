import type { FC } from 'react';

interface CategoryFilterProps {
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
}

const CategoryFilter: FC<CategoryFilterProps> = ({ selectedCategory, onCategorySelect }) => {
  return (
    <div className="d-flex justify-content-center gap-4 my-4 flex-wrap">
      <button
        className={`btn rounded-pill px-3 py-2 ${
          selectedCategory === 'All' ? 'btn-success' : 'btn-outline-success'
        }`}
        onClick={() => onCategorySelect('All')}
      >
        All
      </button>

      <button
        className={`btn rounded-pill px-3 py-2 ${
          selectedCategory === 'Fruits' ? 'btn-success' : 'btn-outline-success'
        }`}
        onClick={() => onCategorySelect('Fruits')}
      >
        🍓 Fruits
      </button>

      <button
        className={`btn rounded-pill px-3 py-2 ${
          selectedCategory === 'Veggies' ? 'btn-success' : 'btn-outline-success'
        }`}
        onClick={() => onCategorySelect('Veggies')}
      >
        🥦 Veggies
      </button>
    </div>
  );
};

export default CategoryFilter;
