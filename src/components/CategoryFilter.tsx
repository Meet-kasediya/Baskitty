import type { FC } from 'react';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onCategorySelect: React.Dispatch<React.SetStateAction<string>>;
}

const CategoryFilter: FC<CategoryFilterProps> = ({ categories, selectedCategory, onCategorySelect }) => {
  return (
    <div className="category-filter mb-3">
      <select
        className="form-select"
        value={selectedCategory}
        onChange={e => onCategorySelect(e.target.value)}
      >
        <option value="">All Categories</option>
        {categories.map(category => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryFilter;
