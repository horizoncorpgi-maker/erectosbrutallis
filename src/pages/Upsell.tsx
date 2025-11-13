import { Play, Volume2, AlertTriangle, CheckCircle, Truck, Shield, Star } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';

interface UpsellProps {
  bottles: number;
  pricePerBottle: number;
  checkoutLink?: string;
}

function Upsell({ bottles, pricePerBottle, checkoutLink }: UpsellProps) {
  const total = bottles * pricePerBottle;
  const location = useLocation();
  const isUp1bt = location.pathname === '/up1bt';
  const isUp3bt = location.pathname === '/up3bt';

  // Detecta ambiente Bolt
  const isBoltEnvironment = window.location.hostname.includes('bolt.new') ||
                           window.location.hostname.includes('stackblitz') ||
                           window.location.hostname.includes('webcontainer') ||
                           window.location.hostname === 'localhost' ||
                           window.location.hostname === '127.0.0.1';

  const [contentUnlocked, setContentUnlocked] = useState(isBoltEnvironment);
  const contentUnlockedRef = useRef(isBoltEnvironment);

  useEffect(() => {
    console.log('%c📡 Inicializando detector VTurb (Upsell)...', 'color: #00aaff; font-weight: bold');
    console.log('%c🔍 Hostname atual:', 'color: #00aaff', window.location.hostname);
    console.log('%c🔍 Ambiente Bolt detectado:', 'color: #00aaff', isBoltEnvironment);
    console.log('%c🔍 contentUnlocked:', 'color: #00aaff', contentUnlocked);
    console.log('%c🔍 contentUnlockedRef.current:', 'color: #00aaff', contentUnlockedRef.current);

    // Se estiver no Bolt, já mostra o conteúdo
    if (isBoltEnvironment) {
      console.log('%c✅ Ambiente Bolt - conteúdo sempre visível', 'color: #00ff00; font-weight: bold');
      console.log('%c✅ contentUnlocked está setado como:', 'color: #00ff00', contentUnlocked);
      return;
    }

    const unlockContent = () => {
      if (!contentUnlockedRef.current) {
        console.log('%c🔓 Desbloqueando conteúdo (Upsell)', 'color: #00ff00; font-weight: bold');
        contentUnlockedRef.current = true;
        setContentUnlocked(true);
      }
    };

    // 🔧 FLAG para identificar scroll do VTurb vs scroll manual
    let lastScrollY = window.scrollY;
    let scrollCheckCount = 0;
    let lastUserInteraction = Date.now();

    // Detecta interação manual do usuário
    const markUserInteraction = () => {
      lastUserInteraction = Date.now();
      console.log('%c👆 Interação manual detectada (Upsell)', 'color: #00ff00');
    };

    // Listeners para detectar interação manual
    window.addEventListener('wheel', markUserInteraction, { passive: true });
    window.addEventListener('touchstart', markUserInteraction, { passive: true });
    window.addEventListener('touchmove', markUserInteraction, { passive: true });

    const detectScrollAttempt = () => {
      const currentScrollY = window.scrollY;
      scrollCheckCount++;

      // Log a cada 60 verificações
      if (scrollCheckCount % 60 === 0) {
        console.log('%c📊 Monitorando scroll (Upsell)...', 'color: #888', {
          currentScrollY,
          lastScrollY,
          contentUnlocked: contentUnlockedRef.current,
          timeSinceUserInteraction: Date.now() - lastUserInteraction
        });
      }

      const scrollDiff = Math.abs(currentScrollY - lastScrollY);
      const timeSinceInteraction = Date.now() - lastUserInteraction;

      // Se houve mudança significativa no scroll E não foi interação manual do usuário
      if (scrollDiff > 10 && !contentUnlockedRef.current && timeSinceInteraction > 500) {
        console.log('%c🎯 SCROLL AUTOMÁTICO (VTurb) DETECTADO! (Upsell)', 'color: #ff0000; font-weight: bold; font-size: 16px');
        console.log('%c📊 ScrollY anterior:', 'color: #ff9900', lastScrollY);
        console.log('%c📊 ScrollY atual:', 'color: #ff9900', currentScrollY);
        console.log('%c📊 Diferença:', 'color: #ff9900', scrollDiff);
        console.log('%c📊 Tempo desde interação:', 'color: #ff9900', timeSinceInteraction + 'ms');
        unlockContent();
      } else if (scrollDiff > 10 && timeSinceInteraction <= 500) {
        console.log('%c👆 Scroll manual ignorado (Upsell)', 'color: #ffaa00', {
          scrollDiff,
          timeSinceInteraction
        });
      }

      lastScrollY = currentScrollY;
    };

    // Monitora scroll com requestAnimationFrame
    let rafId: number;
    const checkScroll = () => {
      detectScrollAttempt();
      rafId = requestAnimationFrame(checkScroll);
    };
    rafId = requestAnimationFrame(checkScroll);

    const handleVTurbScrollEvent = (e: Event) => {
      console.log('%c🎯 Evento VTurb detectado! (Upsell)', 'color: #ff00ff; font-weight: bold', e.type);
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      unlockContent();
    };

    // Eventos principais do VTurb
    window.addEventListener('smartplayer-scroll-event', handleVTurbScrollEvent, true);
    window.addEventListener('smartplayer:video:ended', handleVTurbScrollEvent, true);
    window.addEventListener('smartplayer:cta:show', handleVTurbScrollEvent, true);

    return () => {
      if (!isBoltEnvironment) {
        console.log('%c🧹 Limpando listeners (Upsell)...', 'color: #ff9900');
        cancelAnimationFrame(rafId);
        window.removeEventListener('wheel', markUserInteraction);
        window.removeEventListener('touchstart', markUserInteraction);
        window.removeEventListener('touchmove', markUserInteraction);
        window.removeEventListener('smartplayer-scroll-event', handleVTurbScrollEvent, true);
        window.removeEventListener('smartplayer:video:ended', handleVTurbScrollEvent, true);
        window.removeEventListener('smartplayer:cta:show', handleVTurbScrollEvent, true);
      }
    };
  }, [isBoltEnvironment]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-red-50 flex flex-col">
      <div className="w-full bg-[#B80000] py-4 px-4 flex items-center justify-center gap-2 md:gap-3 text-white font-bold text-sm md:text-base lg:text-lg sticky top-0 z-50 shadow-lg">
        <AlertTriangle className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0 animate-pulse" />
        <AlertTriangle className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0 animate-pulse" />
        <span className="text-center tracking-wide">WAIT! YOUR ORDER IS NOT COMPLETE</span>
        <AlertTriangle className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0 animate-pulse" />
        <AlertTriangle className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0 animate-pulse" />
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-gray-900 mb-3 md:mb-4 leading-tight">
          {isUp3bt ? (
            <>There's still time to increase the <span className="text-[#B80000]">size</span> of your <span className="text-[#B80000]">instrument!</span></>
          ) : (
            <>You're Just <span className="text-[#B80000]">ONE</span> Step<br />Away From <span className="text-[#B80000]">Success</span></>
          )}
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-8 md:mb-12 font-light max-w-3xl mx-auto">
          {isUp3bt ? (
            <>Congratulations on completing a full treatment, <span className="font-semibold text-gray-800">but now this product will <span className="text-[#B80000]">make you even more powerful!</span></span></>
          ) : (
            <>Congratulations on securing your first bottles - but now, <span className="font-semibold text-gray-800">one last step could <span className="text-[#B80000]">change everything</span></span></>
          )}
        </p>

        <div className="bg-yellow-50 border-2 border-yellow-400 rounded-xl p-3 mb-4 max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-2 text-gray-800">
            <Volume2 className="w-5 h-5 flex-shrink-0" />
            <p className="text-sm md:text-base font-bold">
              Please make sure your sound is on!
            </p>
          </div>
        </div>

        <div className="relative w-full max-w-sm md:max-w-md mx-auto bg-black rounded-[20px] overflow-hidden shadow-2xl aspect-[9/16] mb-4">
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
            <button className="w-16 h-16 md:w-20 md:h-20 bg-[#B80000] rounded-full flex items-center justify-center hover:bg-[#900000] transition-all hover:scale-110 shadow-xl">
              <Play className="w-8 h-8 md:w-10 md:h-10 text-white ml-1" fill="white" />
            </button>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 text-gray-700 mb-3">
          <Volume2 className="w-5 h-5" />
          <p className="text-sm md:text-base font-medium">
            Please make sure your sound is on
          </p>
        </div>
        <p className="text-xs md:text-sm text-gray-500 mb-8">
          This video contains important audio information
        </p>

        <div className="bg-yellow-50 border-2 border-yellow-400 rounded-xl p-4 mb-8 max-w-2xl mx-auto">
          <p className="text-sm md:text-base font-semibold text-gray-800">
            This is a unique, one-time offer
          </p>
          <p className="text-xs md:text-sm text-gray-600 mt-1">
            Once you leave this page, this offer will never be available again
          </p>
        </div>

        {isBoltEnvironment && (
          <div className="bg-blue-500 text-white p-2 rounded mb-4 text-center text-sm">
            🔧 DEBUG: Ambiente Bolt detectado - Conteúdo visível | contentUnlocked: {contentUnlocked.toString()}
          </div>
        )}

        <div style={{ display: contentUnlocked ? 'block' : 'none' }}>
        {isUp1bt ? (
          <>
            <div className="bg-gradient-to-br from-[#C62828] to-[#B71C1C] rounded-[30px] p-8 md:p-12 shadow-2xl mb-6 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[#FFD600] text-gray-900 px-6 py-2 rounded-full font-bold text-sm md:text-base shadow-lg">
                BEST VALUE
              </div>
              <div className="text-white mb-6">
                <div className="text-4xl md:text-6xl font-bold mb-2">
                  {bottles} Bottles
                </div>
                <div className="text-xl md:text-3xl font-semibold">
                  ${pricePerBottle} per bottle
                </div>
                <div className="text-2xl md:text-4xl font-bold text-[#FFD600] mt-4">
                  Total: ${total}
                </div>
              </div>

              <button
                onClick={() => window.location.href = 'https://pay.erectosbrutallis.com/checkout/201842174:1'}
                className="smartplayer-scroll-event w-full max-w-md mx-auto bg-[#FFD600] text-gray-900 py-4 md:py-6 rounded-full font-bold hover:bg-[#FFC400] transition-all shadow-lg text-xl md:text-2xl"
              >
                UPGRADE MY ORDER NOW
              </button>
            </div>

            <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-[20px] p-6 md:p-8 shadow-lg">
              <div className="text-white mb-4">
                <div className="text-2xl md:text-4xl font-bold mb-2">
                  2 Bottles
                </div>
                <div className="text-lg md:text-2xl font-semibold">
                  $34.5 per bottle
                </div>
                <div className="text-xl md:text-3xl font-bold mt-3">
                  Total: $69
                </div>
              </div>

              <button
                onClick={() => window.location.href = 'https://pay.erectosbrutallis.com/checkout/201842172:1'}
                className="w-full max-w-md mx-auto bg-[#FFD600] text-gray-900 py-3 md:py-5 rounded-full font-bold hover:bg-[#FFC400] transition-all shadow-md text-lg md:text-xl"
              >
                SELECT THIS OPTION
              </button>
            </div>
          </>
        ) : location.pathname === '/up3bt' ? (
          <>
            <div className="mb-4 md:mb-8">
              <div className="relative bg-gradient-to-br from-[#C62828] to-[#B71C1C] rounded-[30px] p-4 md:p-12 lg:p-16 shadow-2xl">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#FFD600] text-gray-900 px-6 py-2 rounded-full text-sm md:text-lg font-bold shadow-lg flex items-center gap-1 md:gap-2">
                  <Star className="w-4 h-4 md:w-5 md:h-5 fill-gray-900" />
                  BEST VALUE
                </div>
                <div className="text-center">
                  <img
                    src="/erectos pulse-9 copy copy.png"
                    alt="9 Drops Package"
                    className="w-full h-48 md:h-80 lg:h-96 object-contain mb-3 md:mb-8 mt-2 md:mt-4"
                  />
                  <h3 className="text-2xl md:text-5xl font-bold text-white mb-1 md:mb-2 tracking-wide">ERECTOS PULSE</h3>
                  <p className="text-base md:text-2xl text-white/90 font-semibold mb-2 md:mb-4">9 DROPS PACKAGE</p>
                  <div className="text-2xl md:text-4xl font-bold text-[#FFD600] mb-3 md:mb-6">
                    YOU'RE SAVING $1317
                  </div>
                  <button
                    onClick={() => window.location.href = 'https://pay.erectosbrutallis.com/checkout/198160252:1'}
                    className="smartplayer-scroll-event w-full max-w-md mx-auto bg-[#FFD600] text-gray-900 py-3 md:py-6 rounded-full font-bold hover:bg-[#FFC400] transition-all shadow-lg text-base md:text-2xl mb-3 md:mb-6"
                  >
                    CLAIM OFFER NOW
                  </button>
                  <div className="text-white/90 text-sm md:text-lg mb-3 md:mb-6">
                    only <span className="font-bold">$32.66 per drop</span>
                  </div>
                  <div className="flex justify-center items-center gap-3 md:gap-6 text-white/90 text-xs md:text-base mb-3 md:mb-6">
                    <div className="flex items-center gap-1 md:gap-2">
                      <CheckCircle className="w-4 h-4 md:w-5 md:h-5" />
                      <span>180-Day</span>
                    </div>
                    <div className="flex items-center gap-1 md:gap-2">
                      <Truck className="w-4 h-4 md:w-5 md:h-5" />
                      <span>Free Ship</span>
                    </div>
                    <div className="flex items-center gap-1 md:gap-2">
                      <Shield className="w-4 h-4 md:w-5 md:h-5" />
                      <span>Secure</span>
                    </div>
                  </div>
                  <div className="bg-white/10 rounded-2xl p-2 md:p-4 max-w-lg mx-auto">
                    <img
                      src="https://i.imgur.com/1in1oo5.png"
                      alt="Payment Methods"
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 md:gap-8 mb-8 md:mb-12">
              <div className="relative bg-gradient-to-br from-[#EF5350] to-[#E53935] rounded-[30px] p-4 md:p-10 shadow-xl">
                <div className="text-center">
                  <img
                    src="/erectos pulse-7 copy copy.png"
                    alt="6 Drops Package"
                    className="w-full h-32 md:h-56 object-contain mb-2 md:mb-4"
                  />
                  <h3 className="text-lg md:text-3xl font-bold text-white mb-0.5 md:mb-1 tracking-wide">ERECTOS PULSE</h3>
                  <p className="text-sm md:text-lg text-white/90 font-semibold mb-2 md:mb-3">6 DROPS PACKAGE</p>
                  <div className="text-xl md:text-3xl font-bold text-[#FFD600] mb-2 md:mb-4">
                    SAVE $867
                  </div>
                  <button
                    onClick={() => window.location.href = 'https://pay.erectosbrutallis.com/checkout/197882331:1'}
                    className="smartplayer-scroll-event w-full bg-[#FFD600] text-gray-900 py-3 md:py-5 rounded-full font-bold hover:bg-[#FFC400] transition-all text-base md:text-xl mb-2 md:mb-4"
                  >
                    BUY NOW
                  </button>
                  <div className="text-white/90 text-xs md:text-base mb-2 md:mb-4">
                    $34.50 per drop
                  </div>
                  <div className="flex justify-center items-center gap-3 md:gap-4 text-white/90 text-xs md:text-sm">
                    <div className="flex items-center gap-1">
                      <CheckCircle className="w-3 h-3 md:w-4 md:h-4" />
                      <span>180d</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Truck className="w-3 h-3 md:w-4 md:h-4" />
                      <span>Free</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Shield className="w-3 h-3 md:w-4 md:h-4" />
                      <span>Safe</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative bg-gradient-to-br from-[#FF7043] to-[#FF5722] rounded-[30px] p-4 md:p-10 shadow-xl">
                <div className="text-center">
                  <img
                    src="/erectos pulse-10 copy copy.png"
                    alt="3 Drops Package"
                    className="w-full h-32 md:h-56 object-contain mb-2 md:mb-4"
                  />
                  <h3 className="text-lg md:text-3xl font-bold text-white mb-0.5 md:mb-1 tracking-wide">ERECTOS PULSE</h3>
                  <p className="text-sm md:text-lg text-white/90 font-semibold mb-2 md:mb-3">3 DROPS PACKAGE</p>
                  <div className="text-xl md:text-3xl font-bold text-[#FFD600] mb-2 md:mb-4">
                    SAVE $389
                  </div>
                  <button
                    onClick={() => window.location.href = 'https://pay.erectosbrutallis.com/checkout/197882332:1'}
                    className="w-full bg-[#FFD600] text-gray-900 py-3 md:py-5 rounded-full font-bold hover:bg-[#FFC400] transition-all text-base md:text-xl mb-2 md:mb-4"
                  >
                    BUY NOW
                  </button>
                  <div className="text-white/90 text-xs md:text-base mb-2 md:mb-4">
                    $49.33 per drop
                  </div>
                  <div className="flex justify-center items-center gap-3 md:gap-4 text-white/90 text-xs md:text-sm">
                    <div className="flex items-center gap-1">
                      <CheckCircle className="w-3 h-3 md:w-4 md:h-4" />
                      <span>180d</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Truck className="w-3 h-3 md:w-4 md:h-4" />
                      <span>Free</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Shield className="w-3 h-3 md:w-4 md:h-4" />
                      <span>Safe</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="bg-gradient-to-br from-[#C62828] to-[#B71C1C] rounded-[30px] p-8 md:p-12 shadow-2xl mb-6 relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[#FFD600] text-gray-900 px-6 py-2 rounded-full font-bold text-sm md:text-base shadow-lg">
              BEST VALUE
            </div>
            <div className="text-white mb-6">
              <div className="text-4xl md:text-6xl font-bold mb-2">
                {bottles} Bottles
              </div>
              <div className="text-xl md:text-3xl font-semibold">
                ${pricePerBottle} per bottle
              </div>
              <div className="text-2xl md:text-4xl font-bold text-[#FFD600] mt-4">
                Total: ${total}
              </div>
            </div>

            <button
              onClick={() => window.location.href = checkoutLink || ''}
              className="w-full max-w-md mx-auto bg-[#FFD600] text-gray-900 py-4 md:py-6 rounded-full font-bold hover:bg-[#FFC400] transition-all shadow-lg text-xl md:text-2xl"
            >
              UPGRADE MY ORDER NOW
            </button>
          </div>
        )}
        </div>
        </div>
      </div>
    </div>
  );
}

export default Upsell;
