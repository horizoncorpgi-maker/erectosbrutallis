import { AlertTriangle, CheckCircle, Truck, Shield, Star } from 'lucide-react';
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-red-50 flex flex-col">
      <div className="w-full bg-[#B80000] py-4 px-4 flex items-center justify-center gap-2 md:gap-3 text-white font-bold text-sm md:text-base lg:text-lg sticky top-0 z-50 shadow-lg">
        <AlertTriangle className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0 animate-pulse" />
        <AlertTriangle className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0 animate-pulse" />
        <span className="text-center tracking-wide">Wait! Your order has not been completed yet!</span>
        <AlertTriangle className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0 animate-pulse" />
        <AlertTriangle className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0 animate-pulse" />
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-gray-900 mb-3 md:mb-4 leading-tight px-2">
          Discover how to eliminate toxic testosterone and regain <span className="text-[#B80000]">steel-hard erections</span> in just <span className="text-[#B80000]">3 months</span> (instead of 6)
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 md:mb-10 font-light max-w-3xl mx-auto px-2">
          Hello, Dwayne, here again! First of all, <span className="font-semibold text-gray-800">congratulations on purchasing <span className="text-[#B80000]">Erectos Brutallis!</span></span> Know that you have made one of the most important decisions of your life...
        </p>

        <div className="bg-yellow-50 border-2 border-yellow-400 rounded-xl p-4 md:p-5 mb-6 max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-2 text-gray-800 mb-3">
            <AlertTriangle className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0 text-[#B80000]" />
            <p className="text-sm sm:text-base md:text-lg font-bold">
              Read this text until the end, as we have a big surprise for you.
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6 md:p-10 mb-6 md:mb-8">
          <div className="prose prose-sm md:prose-base max-w-none text-gray-700 leading-relaxed space-y-4">
            <p>The first step has already been taken, and I'm super excited to hear your testimony in a few weeks saying: <span className="font-semibold text-[#B80000]">"Dwayne, I managed to recover my sexual potency, my confidence is back, and today I feel like a real man again..."</span></p>

            <p className="font-semibold text-gray-900">I want you to see today as the last day you worry about erection problems!</p>

            <p>In just a few weeks, you will notice <span className="font-semibold">firmer, longer-lasting erections and renewed sexual drive.</span></p>

            <p>Your partner will notice and be impressed with your transformation...</p>

            <p>Thousands of men are regaining their virility with Erectos Brutallis, naturally, safely, and without side effects.</p>

            <p className="text-lg md:text-xl font-bold text-gray-900 pt-4">Although it's only a matter of time before you regain the sexual vigor of your youth, I want to offer you a chance to get even faster results with Erectos Brutallis.</p>

            <p>As you know, the ideal time to eliminate all toxic testosterone from your body is <span className="font-semibold">6 months.</span></p>

            <p className="text-lg font-bold text-[#B80000]">But what if I told you there's a way to cut that time down to 3 months?</p>

            <p><span className="font-semibold">Here's how:</span> instead of taking just one capsule per day, you'll take two and consequently get double the effects of Erectos Brutallis.</p>

            <p>That means you can cut in half the time it would take to become the man you've always been.</p>

            <p className="font-semibold">Capable of satisfying your wife whenever you want, and never struggling to get hard again.</p>

            <div className="bg-red-50 border-l-4 border-[#B80000] p-4 my-6">
              <p className="font-bold text-gray-900 mb-2">It means that in 3 months, you'll have:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-800">
                <li>The same energy and performance as a 25-year-old</li>
                <li>Firmer and longer-lasting erections</li>
                <li>Energy and libido renewed almost immediately</li>
                <li>Full confidence when it counts, with no fear of failure</li>
              </ul>
            </div>

            <p>On the first day taking two capsules, you'll already feel the blood flowing intensely to your penile region.</p>

            <p>A powerful sensation, like a magnet pulling all the blood to your intimate area, resulting in <span className="font-semibold text-[#B80000]">firm erections ready for action.</span></p>

            <p className="font-semibold">Your partner will quickly notice this difference. Don't be surprised if she is impressed with your renewed performance.</p>

            <p className="bg-yellow-100 border border-yellow-400 p-3 rounded-lg">I even recommend you warn your partner before taking the two capsules, because your manhood will stay hard for so long that she'll suffer the consequences.</p>

            <p className="text-lg font-bold text-gray-900 pt-4">Taking two capsules per day for 3 months, you're buying the most important thing in your life: TIME.</p>

            <p className="text-xl font-bold text-[#B80000]">Why not reverse erectile dysfunction as fast as possible?</p>

            <p>I'm sure that's something you want, and I'm giving you the opportunity to do so.</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-yellow-100 to-yellow-50 border-2 border-yellow-400 rounded-2xl p-5 md:p-6 mb-6 md:mb-8 max-w-3xl mx-auto">
          <div className="text-center">
            <p className="text-base md:text-lg font-bold text-gray-900 mb-3">Now answer honestly:</p>
            <div className="space-y-2 text-sm md:text-base text-gray-800">
              <p>• Can your freedom and masculinity wait?</p>
              <p>• Do you want to keep struggling for 6 months instead of solving it in 3?</p>
              <p>• Can your partner wait months for you, or does she deserve to feel maximum pleasure immediately?</p>
              <p>• Can your confidence to make your partner climax multiple times wait?</p>
            </div>
            <p className="text-lg md:text-xl font-bold text-[#B80000] mt-4">Tell me, do you prefer all this to happen in 6 months or 3 months?</p>
            <p className="text-base md:text-lg font-bold text-gray-900 mt-3">Without a doubt, the best decision is to get all the results in 3 months.</p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-400 rounded-2xl p-6 md:p-8 mb-6 md:mb-8 shadow-lg">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Shield className="w-8 h-8 md:w-10 md:h-10 text-green-600" />
              <h3 className="text-xl md:text-2xl font-bold text-gray-900">NO RISKS GUARANTEE</h3>
            </div>
            <p className="text-base md:text-lg text-gray-800 mb-4">
              <span className="font-bold text-green-700">If after 3 months</span> taking two capsules a day you are not cured of erectile dysfunction,
            </p>
            <p className="text-lg md:text-xl font-bold text-gray-900 mb-4">
              Just send us a message and we will <span className="text-green-700">immediately refund all the money</span> you invested.
            </p>
            <p className="text-base md:text-lg font-bold text-[#B80000]">
              Don't waste time, you're protected.
            </p>
          </div>
        </div>

        <div className="text-center mb-6 md:mb-8">
          <p className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
            Click the button below and choose your kit.
          </p>
          <p className="text-base md:text-lg text-gray-600">
            Remember, you won't have another chance like this.
          </p>
        </div>

        {isUp1bt ? (
          <>
            <div className="bg-gradient-to-br from-[#C62828] to-[#B71C1C] rounded-[20px] md:rounded-[30px] p-6 md:p-12 shadow-2xl mb-4 md:mb-6 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#FFD600] text-gray-900 px-4 md:px-6 py-1.5 md:py-2 rounded-full font-bold text-xs md:text-base shadow-lg whitespace-nowrap">
                BEST VALUE - 3 MONTHS
              </div>
              <div className="text-white mb-4 md:mb-6 mt-2">
                <div className="text-2xl sm:text-3xl md:text-5xl font-bold mb-2">
                  {bottles} Bottles
                </div>
                <div className="text-sm md:text-xl text-white/90 mb-1">
                  Erectos Brutallis
                </div>
                <div className="text-lg sm:text-xl md:text-3xl font-semibold">
                  ${pricePerBottle} per bottle
                </div>
                <div className="text-xl sm:text-2xl md:text-4xl font-bold text-[#FFD600] mt-3">
                  Total: ${total}
                </div>
                <div className="text-xs sm:text-sm md:text-lg text-white/90 mt-2">
                  + 180 extra days of warranty
                </div>
              </div>

              <button
                onClick={() => window.location.href = 'https://pay.erectosbrutallis.com/checkout/201842174:1'}
                className="smartplayer-scroll-event w-full max-w-md mx-auto bg-[#FFD600] text-gray-900 py-3 sm:py-4 md:py-6 rounded-full font-bold hover:bg-[#FFC400] transition-all shadow-lg text-sm sm:text-base md:text-xl leading-tight"
              >
                YES! I WANT RESULTS IN 3 MONTHS, NOT 6
              </button>
            </div>

            <div className="bg-gradient-to-br from-gray-600 to-gray-700 rounded-[20px] p-4 md:p-6 shadow-lg">
              <div className="text-white mb-3 md:mb-4">
                <div className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 md:mb-2">
                  No Thanks
                </div>
                <div className="text-sm sm:text-base md:text-lg">
                  I prefer to wait 6 months for results
                </div>
              </div>

              <button
                onClick={() => window.location.href = 'https://pay.erectosbrutallis.com/checkout/201842172:1'}
                className="w-full max-w-md mx-auto bg-white/20 text-white py-2.5 sm:py-3 md:py-4 rounded-full font-bold hover:bg-white/30 transition-all shadow-md text-base sm:text-lg md:text-xl"
              >
                NO THANKS
              </button>
            </div>
          </>
        ) : location.pathname === '/up3bt' ? (
          <>
            <div className="mb-4 md:mb-8">
              <div className="relative bg-gradient-to-br from-[#C62828] to-[#B71C1C] rounded-[20px] md:rounded-[30px] p-6 md:p-10 shadow-2xl">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#FFD600] text-gray-900 px-3 md:px-6 py-1.5 md:py-2 rounded-full text-xs md:text-base font-bold shadow-lg flex items-center gap-1 whitespace-nowrap">
                  <Star className="w-3 h-3 md:w-4 md:h-4 fill-gray-900" />
                  BEST VALUE - 3 MONTHS
                </div>
                <div className="text-center">
                  <img
                    src="https://i.postimg.cc/FzHG0ng9/erectos-brutallis-13.png"
                    alt="6 Bottles Package"
                    className="w-full h-40 sm:h-56 md:h-80 object-contain mb-3 md:mb-6 mt-3 md:mt-4"
                  />
                  <h3 className="text-xl sm:text-2xl md:text-4xl font-bold text-white mb-1 md:mb-2 tracking-wide">ERECTOS BRUTALLIS</h3>
                  <p className="text-sm sm:text-base md:text-xl text-white/90 font-semibold mb-2 md:mb-4">6 BOTTLES PACKAGE</p>
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold text-[#FFD600] mb-3 md:mb-5">
                    $39 PER BOTTLE
                  </div>
                  <button
                    onClick={() => window.location.href = 'https://pay.erectosbrutallis.com/checkout/198160252:1'}
                    className="smartplayer-scroll-event w-full max-w-md mx-auto bg-[#FFD600] text-gray-900 py-3 sm:py-4 md:py-5 rounded-full font-bold hover:bg-[#FFC400] transition-all shadow-lg text-sm sm:text-base md:text-xl mb-3 md:mb-5 leading-tight"
                  >
                    YES! I WANT RESULTS IN 3 MONTHS, NOT 6
                  </button>
                  <div className="text-white/90 text-sm sm:text-base md:text-lg mb-3 md:mb-5">
                    Total: <span className="font-bold">$234</span>
                  </div>
                  <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 md:gap-5 text-white/90 text-xs sm:text-sm md:text-base mb-3 md:mb-5">
                    <div className="flex items-center gap-1">
                      <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                      <span>180-Day</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Truck className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                      <span>Free Ship</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Shield className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                      <span>Secure</span>
                    </div>
                  </div>
                  <div className="bg-white/10 rounded-xl md:rounded-2xl p-2 md:p-3 max-w-sm md:max-w-lg mx-auto">
                    <img
                      src="https://i.imgur.com/1in1oo5.png"
                      alt="Payment Methods"
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-600 to-gray-700 rounded-[20px] p-4 md:p-6 shadow-lg">
              <div className="text-white mb-3 md:mb-4">
                <div className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 md:mb-2">
                  No Thanks
                </div>
                <div className="text-sm sm:text-base md:text-lg">
                  I prefer to wait 6 months for results
                </div>
              </div>

              <button
                onClick={() => window.location.href = 'https://pay.erectosbrutallis.com/checkout/197882332:1'}
                className="w-full max-w-md mx-auto bg-white/20 text-white py-2.5 sm:py-3 md:py-4 rounded-full font-bold hover:bg-white/30 transition-all shadow-md text-base sm:text-lg md:text-xl"
              >
                NO THANKS
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="bg-gradient-to-br from-[#C62828] to-[#B71C1C] rounded-[20px] md:rounded-[30px] p-6 md:p-12 shadow-2xl mb-4 md:mb-6 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#FFD600] text-gray-900 px-4 md:px-6 py-1.5 md:py-2 rounded-full font-bold text-xs md:text-base shadow-lg whitespace-nowrap">
                RESULTS IN 3 MONTHS
              </div>
              <div className="text-white mb-4 md:mb-6 mt-2">
                <div className="text-2xl sm:text-3xl md:text-5xl font-bold mb-2">
                  {bottles} Bottles
                </div>
                <div className="text-sm md:text-xl text-white/90 mb-1">
                  Erectos Brutallis
                </div>
                <div className="text-lg sm:text-xl md:text-3xl font-semibold">
                  ${pricePerBottle} per bottle
                </div>
                <div className="text-xl sm:text-2xl md:text-4xl font-bold text-[#FFD600] mt-3">
                  Total: ${total}
                </div>
                <div className="text-xs sm:text-sm md:text-lg text-white/90 mt-2">
                  + 60 extra days of warranty
                </div>
              </div>

              <button
                onClick={() => window.location.href = checkoutLink || ''}
                className="w-full max-w-md mx-auto bg-[#FFD600] text-gray-900 py-3 sm:py-4 md:py-6 rounded-full font-bold hover:bg-[#FFC400] transition-all shadow-lg text-sm sm:text-base md:text-xl leading-tight"
              >
                YES! I WANT RESULTS IN 3 MONTHS, NOT 6
              </button>
            </div>

            <div className="bg-gradient-to-br from-gray-600 to-gray-700 rounded-[20px] p-4 md:p-6 shadow-lg">
              <div className="text-white mb-3 md:mb-4">
                <div className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 md:mb-2">
                  No Thanks
                </div>
                <div className="text-sm sm:text-base md:text-lg">
                  I prefer to wait 6 months for results
                </div>
              </div>

              <button
                onClick={() => window.location.href = checkoutLink || ''}
                className="w-full max-w-md mx-auto bg-white/20 text-white py-2.5 sm:py-3 md:py-4 rounded-full font-bold hover:bg-white/30 transition-all shadow-md text-base sm:text-lg md:text-xl"
              >
                NO THANKS
              </button>
            </div>
          </>
        )}
        </div>
      </div>
    </div>
  );
}

export default Upsell;
