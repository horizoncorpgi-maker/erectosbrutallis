import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { initFacebookPixel, trackPageView } from '../utils/facebookPixel';

export const useFacebookPixel = () => {
  const location = useLocation();

  useEffect(() => {
    initFacebookPixel();
  }, []);

  useEffect(() => {
    trackPageView();
  }, [location.pathname]);
};
