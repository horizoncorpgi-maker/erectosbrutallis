import { useState, useEffect } from 'react';
import { Clock, Shield, CheckCircle, Lock, AlertTriangle } from 'lucide-react';

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
    <div className="relative bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 border-4 border-dashed border-[#B80000] rounded-3xl p-6 md:p-10 shadow-2xl max-w-6xl mx-auto my-8">
      <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-[#B80000] to-[#900000] text-white px-8 py-2 rounded-full font-bold text-sm md:text-base shadow-lg animate-pulse flex items-center gap-2">
        <AlertTriangle className="w-4 h-4" />
        OFERTA EXCLUSIVA
        <AlertTriangle className="w-4 h-4" />
      </div>

      <div className="mt-4 mb-6 text-center">
        <div className="inline-flex items-center gap-2 bg-red-100 border-2 border-red-500 rounded-full px-4 py-2 mb-4">
          <Clock className="w-5 h-5 text-red-600" />
          <span className="font-bold text-red-600 text-lg">
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </span>
        </div>
        <div className="flex items-center justify-center gap-2 text-red-600 font-semibold text-sm">
          <AlertTriangle className="w-4 h-4" />
          <span>Estoque Limitado - Esta oferta expira em breve!</span>
        </div>
      </div>

      <h2 className="text-2xl md:text-4xl font-bold text-gray-900 text-center mb-2 leading-tight">
        ESPERE! Não feche esta página.
      </h2>
      <p className="text-lg md:text-2xl text-gray-800 text-center mb-8 font-semibold">
        Adicione mais <span className="text-[#B80000]">7 frascos</span> ao seu estoque e economize muito!
      </p>

      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div className="flex justify-center">
          <img
            src="https://i.imgur.com/rS4XU2L.png"
            alt="7 Bottles Package"
            className="w-full max-w-md h-auto object-contain drop-shadow-2xl"
          />
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-yellow-400">
            <div className="text-center mb-4">
              <p className="text-gray-600 text-lg mb-2">Preço especial por frasco:</p>
              <div className="text-5xl md:text-6xl font-bold text-[#B80000] mb-2">
                $39
              </div>
              <p className="text-gray-500 text-sm">Preço mais baixo disponível</p>
            </div>

            <div className="border-t-2 border-gray-200 pt-4 space-y-2">
              <div className="flex justify-between text-lg">
                <span className="text-gray-700">7 frascos adicionais:</span>
                <span className="font-bold text-gray-900">$273</span>
              </div>
              <div className="flex justify-between text-xl font-bold bg-green-50 p-3 rounded-lg border-2 border-green-400">
                <span className="text-gray-900">Total final do pedido:</span>
                <span className="text-green-700">$312</span>
              </div>
            </div>
          </div>

          <button
            onClick={onAccept}
            className="w-full bg-gradient-to-r from-green-600 to-green-500 text-white py-5 md:py-6 rounded-full font-bold text-lg md:text-xl hover:from-green-700 hover:to-green-600 transition-all shadow-2xl animate-pulse hover:animate-none transform hover:scale-105"
          >
            SIM! ADICIONAR 7 FRASCOS AO MEU PEDIDO
          </button>

          <div className="flex flex-wrap justify-center gap-4 text-gray-600 text-sm">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow">
              <Shield className="w-5 h-5 text-green-600" />
              <span className="font-semibold">Garantia de Satisfação</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow">
              <Lock className="w-5 h-5 text-blue-600" />
              <span className="font-semibold">Checkout Seguro</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="font-semibold">180 Dias de Garantia</span>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-300 rounded-xl p-4">
            <p className="text-center text-gray-700 text-sm leading-relaxed">
              <span className="font-bold text-blue-700">Por que esta oferta?</span> Clientes que compram 7+ frascos
              têm <span className="font-bold">3x mais resultados</span> devido ao uso contínuo e prolongado do produto.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SpecialOffer;
