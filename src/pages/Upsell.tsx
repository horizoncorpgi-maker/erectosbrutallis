import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { appendParamsToUrl } from '../utils/urlParams';
import SpecialOffer from '../components/SpecialOffer';

interface UpsellProps {
  bottles: number;
  pricePerBottle: number;
  checkoutLink?: string;
}

function Upsell({ bottles, pricePerBottle, checkoutLink }: UpsellProps) {
  const total = bottles * pricePerBottle;
  const location = useLocation();
  const isUp1bt = location.pathname === '/up1bt';
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const videoScript = 'https://scripts.converteai.net/6c140fb2-fd70-48d5-8d70-c2f66a937ef9/players/694b13b163476f09ce02d94e/v4/player.js';
    const existingScript = document.querySelector(`script[src="${videoScript}"]`);
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = videoScript;
      script.async = true;
      document.head.appendChild(script);
    }
  }, []);

  useEffect(() => {
    (window as any).pixelId = "694352c02c9b8add9117f60a";
    const utmifyScript = 'https://cdn.utmify.com.br/scripts/pixel/pixel.js';
    const existingUtmifyScript = document.querySelector(`script[src="${utmifyScript}"]`);
    if (!existingUtmifyScript) {
      const a = document.createElement("script");
      a.setAttribute("async", "");
      a.setAttribute("defer", "");
      a.setAttribute("src", utmifyScript);
      document.head.appendChild(a);
    }
  }, []);

  useEffect(() => {
    const utmifyUtmsScript = 'https://cdn.utmify.com.br/scripts/utms/latest.js';
    const existingUtmsScript = document.querySelector(`script[src="${utmifyUtmsScript}"]`);
    if (!existingUtmsScript) {
      const script = document.createElement("script");
      script.setAttribute("src", utmifyUtmsScript);
      script.setAttribute("data-utmify-prevent-xcod-sck", "");
      script.setAttribute("data-utmify-prevent-subids", "");
      script.setAttribute("data-utmify-ignore-iframe", "");
      script.setAttribute("data-utmify-is-cartpanda", "");
      script.setAttribute("async", "");
      script.setAttribute("defer", "");
      document.head.appendChild(script);
    }
  }, []);

  useEffect(() => {
    if (location.pathname === '/up3bt' || location.pathname === '/up6bt') {
      const ocuExternalScript = 'https://assets.mycartpanda.com/cartx-ecomm-ui-assets/js/libs/ocu-external.js';
      const existingOcuScript = document.querySelector(`script[src="${ocuExternalScript}"]`);

      if (!existingOcuScript) {
        const script = document.createElement('script');
        script.src = ocuExternalScript;
        script.onload = () => {
          const initScript = document.createElement('script');
          initScript.textContent = 'new OcuExternal();';
          document.head.appendChild(initScript);
        };
        document.head.appendChild(script);
      }
    }
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-red-50">
      <section className={`min-h-screen flex items-center justify-center px-4 py-8 md:py-20 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative w-full max-w-sm md:max-w-md mx-auto bg-black rounded-[20px] overflow-hidden shadow-2xl mb-8" style={{ aspectRatio: '9/16', minHeight: '500px' }}>
            <vturb-smartplayer id="vid-694b13b163476f09ce02d94e" style={{ display: 'block', margin: '0 auto', width: '100%', maxWidth: '400px' }}></vturb-smartplayer>
          </div>

          <div
            id="vturb-scroll-target"
            className="smartplayer-scroll-event"
            style={{
              width: '1px',
              height: '1px',
              opacity: 0,
              pointerEvents: 'none',
              margin: '20px auto'
            }}
            aria-hidden="true"
          />

          {isUp1bt ? (
            <>
              <SpecialOffer
                bottles={bottles}
                pricePerBottle={pricePerBottle}
                onAccept={() => window.location.href = appendParamsToUrl('https://pay.erectosbrutallis.com/checkout/205578144:1')}
              />
            </>
          ) : location.pathname === '/up3bt' ? (
            <>
              <SpecialOffer
                bottles={bottles}
                pricePerBottle={pricePerBottle}
                onAccept={() => window.location.href = appendParamsToUrl('https://pay.erectosbrutallis.com/checkout/201842174:1')}
              />
            </>
          ) : location.pathname === '/up6bt' ? (
            <>
              <SpecialOffer
                bottles={bottles}
                pricePerBottle={pricePerBottle}
                onAccept={() => window.location.href = appendParamsToUrl('https://pay.erectosbrutallis.com/ex-ocu/next-offer/8rj73r9j6N?accepted=yes')}
              />
            </>
          ) : (
            <>
              <SpecialOffer
                bottles={bottles}
                pricePerBottle={pricePerBottle}
                onAccept={() => window.location.href = appendParamsToUrl(checkoutLink || '')}
              />
            </>
          )}
        </div>
      </section>
    </div>
  );
}

export default Upsell;
