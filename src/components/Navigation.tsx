import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Home, Clock } from 'lucide-react';
import { useState, useEffect } from 'react';

function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const [revealDelay, setRevealDelay] = useState(() => {
    const saved = localStorage.getItem('revealDelay');
    return saved ? parseInt(saved) : 10;
  });

  const isDevelopment = import.meta.env.DEV;

  const handleDelayChange = (newDelay: number) => {
    setRevealDelay(newDelay);
    localStorage.setItem('revealDelay', newDelay.toString());
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  const routes = [
    { path: '/', label: 'Home' },
    { path: '/up1bt', label: 'Upsell 1BT' },
    { path: '/up3bt', label: 'Upsell 3BT' },
    { path: '/up6bt', label: 'Upsell 6BT' },
    { path: '/up21', label: 'Upsell 21' },
    { path: '/up23', label: 'Upsell 23' },
    { path: '/up26', label: 'Upsell 26' },
  ];

  if (!isDevelopment) {
    return null;
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 right-4 z-50 p-3 bg-[#B80000] text-white rounded-lg shadow-lg hover:bg-[#9a0000] transition-colors"
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      <nav
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-40 transform transition-transform duration-300 ease-in-out overflow-y-auto ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-6 pt-20">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Dev Menu</h2>

          <div className="mb-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-center gap-2 mb-3">
              <Clock size={20} className="text-[#B80000]" />
              <h3 className="font-semibold text-gray-900">Content Reveal Timer</h3>
            </div>
            <p className="text-sm text-gray-600 mb-3">Time until content appears</p>
            <div className="flex items-center gap-2 mb-3">
              <input
                type="number"
                min="0"
                max="300"
                value={revealDelay}
                onChange={(e) => setRevealDelay(Math.max(0, parseInt(e.target.value) || 0))}
                onBlur={(e) => handleDelayChange(Math.max(0, parseInt(e.target.value) || 0))}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleDelayChange(Math.max(0, parseInt(e.currentTarget.value) || 0));
                  }
                }}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B80000] focus:border-transparent text-lg font-semibold text-center"
              />
              <span className="text-sm text-gray-600">seconds</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleDelayChange(0)}
                className="flex-1 px-3 py-1.5 text-xs bg-gray-200 hover:bg-gray-300 rounded transition-colors"
              >
                Instant
              </button>
              <button
                onClick={() => handleDelayChange(10)}
                className="flex-1 px-3 py-1.5 text-xs bg-gray-200 hover:bg-gray-300 rounded transition-colors"
              >
                10s
              </button>
              <button
                onClick={() => handleDelayChange(30)}
                className="flex-1 px-3 py-1.5 text-xs bg-gray-200 hover:bg-gray-300 rounded transition-colors"
              >
                30s
              </button>
            </div>
          </div>

          <h3 className="font-semibold text-gray-700 mb-3">Pages</h3>
          <ul className="space-y-2">
            {routes.map((route) => (
              <li key={route.path}>
                <Link
                  to={route.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-3 rounded-lg transition-colors ${
                    location.pathname === route.path
                      ? 'bg-[#B80000] text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {route.path === '/' && <Home size={18} />}
                    {route.label}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navigation;
