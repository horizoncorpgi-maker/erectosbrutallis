import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Upsell from './pages/Upsell';
import DevNavigation from './components/DevNavigation';

function Router() {
  return (
    <BrowserRouter>
      <DevNavigation />
      <Routes>
        <Route path="/" element={<App />} />

        <Route path="/up1bt" element={<Upsell bottles={6} pricePerBottle={19.5} checkoutLink="" />} />
        <Route path="/up3bt" element={<Upsell bottles={6} pricePerBottle={39} />} />
        <Route path="/up6bt" element={<Upsell bottles={3} pricePerBottle={49} />} />

        <Route path="/up21" element={<Upsell bottles={8} pricePerBottle={29} />} />
        <Route path="/up23" element={<Upsell bottles={6} pricePerBottle={39} />} />
        <Route path="/up26" element={<Upsell bottles={3} pricePerBottle={49} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
