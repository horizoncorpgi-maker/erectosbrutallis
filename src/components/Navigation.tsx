import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Home, Clock, Check, AlertCircle, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useTimerSettings } from '../hooks/useTimerSettings';

function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const {
    delaySeconds,
    isSaving,
    error,
    successMessage,
    saveTimerSettings
  } = useTimerSettings();

  const [inputValue, setInputValue] = useState(delaySeconds);

  useEffect(() => {
    setInputValue(delaySeconds);
  }, [delaySeconds]);

  const isDevelopment = import.meta.env.DEV;

  const handleSaveClick = async () => {
    const success = await saveTimerSettings(inputValue);
    if (success) {
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  };

  const handleQuickSelect = async (value: number) => {
    setInputValue(value);
    const success = await saveTimerSettings(value);
    if (success) {
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  };

  const routes = [
    { path: '/tst1', label: 'Home1' },
    { path: '/tst3', label: 'Home3' },
    { path: '/up1bt', label: 'Upsell 1BT' },
    { path: '/up3bt', label: 'Upsell 3BT' },
    { path: '/up6bt', label: 'Upsell 6BT' },
    { path: '/up2-3in', label: 'Upsell 2 - 3in' },
    { path: '/up2-5in', label: 'Upsell 2 - 5in' },
    { path: '/up2-7in', label: 'Upsell 2 - 7in' },
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
                value={inputValue}
                onChange={(e) => setInputValue(Math.max(0, parseInt(e.target.value) || 0))}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSaveClick();
                  }
                }}
                disabled={isSaving}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B80000] focus:border-transparent text-lg font-semibold text-center disabled:opacity-50"
              />
              <span className="text-sm text-gray-600">seconds</span>
            </div>

            <button
              onClick={handleSaveClick}
              disabled={isSaving || inputValue === delaySeconds}
              className="w-full mb-3 px-4 py-2.5 bg-[#B80000] hover:bg-[#900000] text-white font-semibold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSaving ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Check size={18} />
                  Save Timer
                </>
              )}
            </button>

            {successMessage && (
              <div className="mb-3 p-2 bg-green-100 text-green-800 text-sm rounded-lg flex items-center gap-2">
                <Check size={16} />
                {successMessage}
              </div>
            )}

            {error && (
              <div className="mb-3 p-2 bg-red-100 text-red-800 text-sm rounded-lg flex items-center gap-2">
                <AlertCircle size={16} />
                {error}
              </div>
            )}

            <div className="text-xs text-gray-500 mb-3 text-center">
              Current saved: {delaySeconds}s
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleQuickSelect(0)}
                disabled={isSaving}
                className="flex-1 px-3 py-1.5 text-xs bg-gray-200 hover:bg-gray-300 rounded transition-colors disabled:opacity-50"
              >
                Instant
              </button>
              <button
                onClick={() => handleQuickSelect(10)}
                disabled={isSaving}
                className="flex-1 px-3 py-1.5 text-xs bg-gray-200 hover:bg-gray-300 rounded transition-colors disabled:opacity-50"
              >
                10s
              </button>
              <button
                onClick={() => handleQuickSelect(30)}
                disabled={isSaving}
                className="flex-1 px-3 py-1.5 text-xs bg-gray-200 hover:bg-gray-300 rounded transition-colors disabled:opacity-50"
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
                    {(route.path === '/tst1' || route.path === '/tst3') && <Home size={18} />}
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
