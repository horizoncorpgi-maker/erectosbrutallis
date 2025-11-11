import { Link } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { useState } from 'react';

function DevNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const isDevelopment = import.meta.env.MODE === 'development';

  if (!isDevelopment) {
    return null;
  }

  return (
    <div className="fixed top-4 left-4 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-slate-800 text-white p-2 rounded-lg hover:bg-slate-700"
      >
        <Menu size={24} />
      </button>

      {isOpen && (
        <div className="absolute top-12 left-0 bg-slate-800 text-white rounded-lg shadow-lg w-48">
          <nav className="flex flex-col p-2 gap-1">
            <Link
              to="/"
              className="px-3 py-2 rounded hover:bg-slate-700"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/up1bt"
              className="px-3 py-2 rounded hover:bg-slate-700 text-sm"
              onClick={() => setIsOpen(false)}
            >
              Up1bt
            </Link>
            <Link
              to="/up3bt"
              className="px-3 py-2 rounded hover:bg-slate-700 text-sm"
              onClick={() => setIsOpen(false)}
            >
              Up3bt
            </Link>
            <Link
              to="/up6bt"
              className="px-3 py-2 rounded hover:bg-slate-700 text-sm"
              onClick={() => setIsOpen(false)}
            >
              Up6bt
            </Link>
            <Link
              to="/up21"
              className="px-3 py-2 rounded hover:bg-slate-700 text-sm"
              onClick={() => setIsOpen(false)}
            >
              Up21
            </Link>
            <Link
              to="/up23"
              className="px-3 py-2 rounded hover:bg-slate-700 text-sm"
              onClick={() => setIsOpen(false)}
            >
              Up23
            </Link>
            <Link
              to="/up26"
              className="px-3 py-2 rounded hover:bg-slate-700 text-sm"
              onClick={() => setIsOpen(false)}
            >
              Up26
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
}

export default DevNavigation;
