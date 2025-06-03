import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import Footer from './Footer';
import FlowerO from './FlowerO';

const Layout = ({ cartItemsCount = 0 }) => {
  const { pathname } = useLocation();

  if (pathname === '/404') return <Outlet />;

  const navLinks = [
    { to: '/profile', label: 'Профиль' },
    { to: '/favorites', label: 'Избранное' },
    { to: '/cart', label: 'Корзина', count: cartItemsCount },
  ];

  return (
    <div className="min-h-screen bg-[#F5F5F8] flex flex-col">
      <header className="sticky top-0 z-50 bg-[#F5F5F8] py-4 md:py-6 px-6">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <Link to="/" className="text-2xl md:text-3xl text-center md:text-left">
            Цвет<FlowerO />чная<br />лавка
          </Link>
          <nav className="flex flex-wrap justify-center gap-2 md:gap-4">
            {navLinks.map(({ to, label, count }) => (
              <Link
                key={to}
                to={to}
                className="bg-[#E8E9ED] px-4 md:px-6 py-2 rounded-lg hover:bg-[#DFE0E4] transition-colors flex items-center gap-2"
              >
                {label}
                {count > 0 && (
                  <span className="bg-black text-white rounded-full w-5 h-5 flex items-center justify-center text-sm">
                    {count}
                  </span>
                )}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <main className="flex-grow">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
