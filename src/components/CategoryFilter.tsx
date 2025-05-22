import type { FC } from 'react';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
}

const CategoryFilter: FC<CategoryFilterProps> = ({ categories, selectedCategory, onCategorySelect }) => {
  return (
    <div className="d-flex gap-2 flex-wrap mb-3">
      <button
        type="button"
        className={`btn btn-sm ${selectedCategory === 'All' ? 'btn-primary' : 'btn-outline-primary'}`}
        onClick={() => onCategorySelect('All')}
      >
        All
      </button>

      {categories.map((category) => (
        <button
          key={category}
          type="button"
          className={`btn btn-sm ${selectedCategory === category ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => onCategorySelect(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
