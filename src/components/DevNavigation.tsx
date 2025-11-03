import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Home } from 'lucide-react';

function DevNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const pages = [
    { path: '/', label: 'Home' },
    { path: '/up1bt', label: 'Upsell 1BT (8x $29)' },
    { path: '/up3bt', label: 'Upsell 3BT (6x $39)' },
    { path: '/up6bt', label: 'Upsell 6BT (3x $49)' },
    { path: '/up21', label: 'Upsell 21 (8x $29)' },
    { path: '/up23', label: 'Upsell 23 (6x $39)' },
    { path: '/up26', label: 'Upsell 26 (3x $49)' },
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 bg-gray-900 text-white p-3 rounded-full shadow-lg hover:bg-gray-800 transition-all"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="fixed top-0 left-0 h-full w-72 bg-white shadow-2xl z-40 overflow-y-auto">
            <div className="p-6 pt-20">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Home className="w-5 h-5" />
                Dev Navigation
              </h2>
              <nav className="space-y-2">
                {pages.map((page) => (
                  <Link
                    key={page.path}
                    to={page.path}
                    onClick={() => setIsOpen(false)}
                    className={`block px-4 py-3 rounded-lg transition-all ${
                      location.pathname === page.path
                        ? 'bg-[#B80000] text-white font-semibold'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {page.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-xs text-gray-500 text-center">
                  This menu only appears in development
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default DevNavigation;
