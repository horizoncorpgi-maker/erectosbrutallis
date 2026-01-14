import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Home1 from './pages/Home1';
import Home3 from './pages/Home3';
import BackRedirect from './pages/BackRedirect';
import Upsell from './pages/Upsell';
import Upsell2 from './pages/Upsell2';
import Navigation from './components/Navigation';

declare global {
  interface Window {
    fbq?: (action: string, event: string, params?: Record<string, unknown>) => void;
  }
}

function FacebookPixelTracker() {
  const location = useLocation();

  useEffect(() => {
    if (window.fbq) {
      window.fbq('track', 'PageView');
    }
  }, [location]);

  return null;
}

function Router() {
  return (
    <BrowserRouter>
      <FacebookPixelTracker />
      <Navigation />
      <Routes>
        <Route path="/" element={<Home1 />} />
        <Route path="/tst1" element={<Home1 />} />
        <Route path="/tst3" element={<Home3 />} />
        <Route path="/back-redirect" element={<BackRedirect />} />

        <Route path="/up1bt" element={<Upsell bottles={7} pricePerBottle={39} />} />
        <Route path="/up3bt" element={<Upsell bottles={6} pricePerBottle={39} checkoutLink="" />} />
        <Route path="/up6bt" element={<Upsell bottles={3} pricePerBottle={39} checkoutLink="" />} />

        <Route path="/up2-3in" element={<Upsell2 inches={3} price={148} checkoutLink="" />} />
        <Route path="/up2-5in" element={<Upsell2 inches={5} price={207} checkoutLink="" />} />
        <Route path="/up2-7in" element={<Upsell2 inches={7} price={294} checkoutLink="" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
