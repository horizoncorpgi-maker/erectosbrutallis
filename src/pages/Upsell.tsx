import { Play, Volume2, AlertTriangle } from 'lucide-react';

interface UpsellProps {
  bottles: number;
  pricePerBottle: number;
  checkoutLink: string;
}

function Upsell({ bottles, pricePerBottle, checkoutLink }: UpsellProps) {
  const total = bottles * pricePerBottle;

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
          You're Just <span className="text-[#B80000]">ONE</span> Step<br />Away From <span className="text-[#B80000]">Success</span>
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-8 md:mb-12 font-light max-w-3xl mx-auto">
          Congratulations on securing your first bottles - but now, <span className="font-semibold text-gray-800">one last step could <span className="text-[#B80000]">change everything</span></span>
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

        <div className="bg-gradient-to-br from-[#C62828] to-[#B71C1C] rounded-[30px] p-8 md:p-12 shadow-2xl mb-8">
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
            onClick={() => window.location.href = checkoutLink}
            className="w-full max-w-md mx-auto bg-[#FFD600] text-gray-900 py-4 md:py-6 rounded-full font-bold hover:bg-[#FFC400] transition-all shadow-lg text-xl md:text-2xl"
          >
            UPGRADE MY ORDER NOW
          </button>
        </div>
        </div>
      </div>
    </div>
  );
}

export default Upsell;
