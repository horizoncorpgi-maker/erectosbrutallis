import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Upsell from './pages/Upsell';
import Upsell2 from './pages/Upsell2';
import Navigation from './components/Navigation';

function Router() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<App />} />

        <Route path="/up1bt" element={<Upsell bottles={8} pricePerBottle={29} />} />
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
