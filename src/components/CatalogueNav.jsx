import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const categories = [
  { id: 'news', label: 'новинки', path: '/catalogue/news' },
  { id: 'springhits', label: 'весенние хиты', path: '/catalogue/springhits' },
  { id: 'wedding', label: 'свадебные', path: '/catalogue/wedding' },
  { id: 'exotic', label: 'экзотические', path: '/catalogue/exotic' },
];

const CatalogueNav = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <div className="flex flex-wrap gap-3">
      {categories.map(({ id, label, path }) => {
        const isActive = pathname === path;
        return (
          <button
            key={id}
            className={`px-6 py-2 rounded-lg transition relative bg-[#E8E9ED] hover:bg-[#DFE0E4] ${
              isActive ? 'after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-black' : ''
            }`}
            onClick={() => navigate(path)}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
};

export default CatalogueNav;
