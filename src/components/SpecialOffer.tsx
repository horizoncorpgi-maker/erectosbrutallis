import { useState, useEffect } from 'react';
import { Clock, Shield, CheckCircle, Lock } from 'lucide-react';

interface SpecialOfferProps {
  onAccept: () => void;
}

function SpecialOffer({ onAccept }: SpecialOfferProps) {
  const [timeLeft, setTimeLeft] = useState(600);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="bg-white rounded-2xl p-6 md:p-12 shadow-xl max-w-5xl mx-auto my-8">
      <div className="text-center mb-8">
        <div className="inline-block bg-red-600 text-white px-6 py-2 rounded-full text-sm font-bold mb-6 uppercase tracking-wide">
          Exclusive Upsell Offer
        </div>

        <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-4 leading-tight">
          WAIT! Don't close this page...
        </h2>

        <p className="text-xl md:text-2xl text-gray-700 mb-2">
          Add <span className="text-red-600 font-bold">7 extra bottles</span> to your order
        </p>
        <p className="text-lg md:text-xl text-gray-600">
          And pay only <span className="font-bold text-red-600">$39 per bottle</span>
        </p>

        <div className="inline-flex items-center gap-2 bg-red-50 border-2 border-red-200 rounded-lg px-6 py-3 mt-6">
          <Clock className="w-6 h-6 text-red-600" />
          <span className="font-bold text-red-600 text-2xl tabular-nums">
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </span>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-10 items-center mb-8">
        <div className="flex justify-center">
          <img
            src="https://i.imgur.com/qS4zMdQ.png"
            alt="Erectos Brutallis 7 Bottles"
            className="w-full max-w-sm h-auto object-contain"
          />
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border-2 border-gray-200">
            <div className="space-y-3">
              <div className="flex justify-between items-center text-lg">
                <span className="text-gray-700">7 extra bottles</span>
                <span className="font-bold text-gray-900">$273.00</span>
              </div>
              <div className="border-t-2 border-gray-300 pt-3">
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-black text-gray-900">TOTAL</span>
                  <span className="text-3xl font-black text-red-600">$312.00</span>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={onAccept}
            className="w-full bg-gradient-to-r from-green-600 to-green-500 text-white py-6 rounded-xl font-bold text-xl hover:from-green-700 hover:to-green-600 transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02] uppercase tracking-wide"
          >
            YES! Add to my order
          </button>

          <div className="grid grid-cols-3 gap-3">
            <div className="flex flex-col items-center text-center p-3 bg-gray-50 rounded-lg">
              <Shield className="w-6 h-6 text-green-600 mb-2" />
              <span className="text-xs font-semibold text-gray-700">Satisfaction Guarantee</span>
            </div>
            <div className="flex flex-col items-center text-center p-3 bg-gray-50 rounded-lg">
              <Lock className="w-6 h-6 text-blue-600 mb-2" />
              <span className="text-xs font-semibold text-gray-700">Secure Checkout</span>
            </div>
            <div className="flex flex-col items-center text-center p-3 bg-gray-50 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600 mb-2" />
              <span className="text-xs font-semibold text-gray-700">180-Day Guarantee</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border-l-4 border-blue-600 rounded-lg p-6">
        <p className="text-gray-700 leading-relaxed">
          <span className="font-bold text-blue-900">Why add more bottles?</span> Studies show that customers
          who purchase 7+ bottles achieve <span className="font-bold">3x better results</span> due to prolonged
          and consistent use of the product. Take advantage of the lowest price available!
        </p>
      </div>
    </div>
  );
}

export default SpecialOffer;
