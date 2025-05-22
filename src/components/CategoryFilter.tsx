import type { FC } from 'react';
interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const categories = [
  { key: 'All', label: 'All' },
  { key: 'Fruits', label: '🍓 Fruits' },
  { key: 'Veggies', label: '🥦 Veggies' },
];

const CategoryFilter: FC<CategoryFilterProps> = ({ selectedCategory, onCategoryChange }) => {
  return (
    <div className="d-flex justify-content-center gap-4 my-4">
      {categories.map(({ key, label }) => (
        <button
          key={key}
          className={`btn rounded-pill px-3 py-2 ${selectedCategory === key ? 'btn-success' : 'btn-outline-success'}`}
          onClick={() => onCategoryChange(key)}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
