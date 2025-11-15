import { AlertTriangle, CheckCircle, Truck, Shield, TrendingUp } from 'lucide-react';
import { useLocation } from 'react-router-dom';

interface Upsell2Props {
  inches: number;
  price: number;
  checkoutLink?: string;
}

function Upsell2({ inches, price, checkoutLink }: Upsell2Props) {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-purple-50 flex flex-col">
      <div className="w-full bg-[#6B21A8] py-4 px-4 flex items-center justify-center gap-2 md:gap-3 text-white font-bold text-sm md:text-base lg:text-lg sticky top-0 z-50 shadow-lg">
        <AlertTriangle className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0 animate-pulse" />
        <AlertTriangle className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0 animate-pulse" />
        <span className="text-center tracking-wide">WAIT! SPECIAL OFFER - DON'T MISS THIS!</span>
        <AlertTriangle className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0 animate-pulse" />
        <AlertTriangle className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0 animate-pulse" />
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-gray-900 mb-3 md:mb-4 leading-tight px-2">
            Are you ready to make your partner <span className="text-[#6B21A8]">soak the sheets</span> and lose control tonight?
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 md:mb-10 font-light max-w-3xl mx-auto px-2">
            From today on, everything changes. Your nights will be <span className="font-semibold text-gray-800">longer, hotter, and wilder</span> — just like when she was shaking, moaning, and begging you for more like two young lovers.
          </p>

          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6 md:p-10 mb-6 md:mb-8">
            <div className="prose prose-sm md:prose-base max-w-none text-gray-700 leading-relaxed space-y-4">
              <p>From today on, you will <span className="font-semibold text-gray-900">never again face the humiliation</span> of looking down and seeing your buddy not responding.</p>

              <p>You will never again look into your partner's eyes and see that hidden disappointment behind a "it's okay"…</p>

              <p className="font-semibold text-[#6B21A8]">You know it's not okay. What she really wants — and deserves — is to be taken hard.</p>

              <p className="text-lg font-bold text-gray-900">But those days are over. For good.</p>

              <p>Your buddy is about to become <span className="font-semibold">reliable, firm, and dominant.</span></p>

              <div className="bg-purple-50 border-l-4 border-[#6B21A8] p-5 my-6">
                <p className="text-xl md:text-2xl font-bold text-gray-900 mb-3">But let me ask you something…</p>
                <p className="text-lg">What if there was a way to give your partner a level of pleasure she has <span className="font-bold text-[#6B21A8]">NEVER experienced before?</span></p>
              </div>

              <p>I'm talking about the kind of trembling, breathless pleasure that only adult film actors and luxury escorts can deliver.</p>

              <p className="font-semibold">Something so deep and intense that the very first thrust makes her lose control.</p>

              <p className="text-2xl font-bold text-[#6B21A8] py-4">What if you could gain 2 to 3 inches in size this month?</p>

              <div className="text-center space-y-2 my-6">
                <p className="text-lg">Without effort.</p>
                <p className="text-lg">Without tricks.</p>
                <p className="text-lg font-bold">And all naturally.</p>
              </div>

              <p className="text-xl font-bold text-gray-900">That's now possible with TitanGrow Surge.</p>

              <p>This formula combines ancient ingredients used by tribal warriors, African cultures, and Amazonian tribes for <span className="font-semibold">potency, virility, and size.</span></p>
            </div>
          </div>

          <div className="max-w-4xl mx-auto bg-gradient-to-br from-[#6B21A8] to-[#581C87] text-white rounded-2xl shadow-2xl p-6 md:p-10 mb-6 md:mb-8">
            <div className="flex items-center justify-center gap-3 mb-6">
              <TrendingUp className="w-8 h-8 md:w-10 md:h-10" />
              <h2 className="text-2xl md:text-3xl font-bold">The Secret Behind TitanGrow Surge</h2>
            </div>

            <div className="space-y-6 text-left">
              <div className="bg-white/10 backdrop-blur rounded-xl p-5">
                <h3 className="text-xl md:text-2xl font-bold mb-3 flex items-center gap-2">
                  🌿 Zemba Root – West Africa
                </h3>
                <p className="mb-2">Used for centuries by warriors during initiation rituals. Its main function?</p>
                <p className="font-semibold text-yellow-300">To expand the penile cavernous bodies, allowing MORE blood, MORE girth, and MORE volume.</p>
                <p className="text-sm mt-2 text-white/80">Studies from the African Journal of Sexual Health showed measurable increases in penile volume in just 3–6 weeks.</p>
              </div>

              <div className="bg-white/10 backdrop-blur rounded-xl p-5">
                <h3 className="text-xl md:text-2xl font-bold mb-3 flex items-center gap-2">
                  🌿 Arari Vine – Amazon Rainforest
                </h3>
                <p className="mb-2">Called "Wood of the Gods" by indigenous tribes.</p>
                <p className="font-semibold text-yellow-300">Arari directly stimulates androgenic receptors responsible for erectile tissue growth.</p>
                <p className="text-sm mt-2 text-white/80">Men aged 40–70 reported noticeable increases in size and firmness after 90 days.</p>
              </div>

              <div className="bg-white/10 backdrop-blur rounded-xl p-5">
                <h3 className="text-xl md:text-2xl font-bold mb-3 flex items-center gap-2">
                  🌿 Black Andean Maca
                </h3>
                <p className="mb-2">The rarest and most potent maca variety.</p>
                <p className="font-semibold text-yellow-300">Increases nitric oxide, improving blood flow into the cavernous chambers.</p>
                <p className="text-sm mt-2 text-white/80">Continuous use shows increases between 12–18% in erect length.</p>
              </div>
            </div>
          </div>

          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6 md:p-10 mb-6 md:mb-8">
            <p className="text-xl md:text-2xl font-bold text-gray-900 mb-4">Now imagine what will happen when you drop your pants…</p>

            <p className="text-lg text-gray-700 mb-2">And she sees something <span className="font-bold text-[#6B21A8]">bigger, thicker, and way more impressive</span> than she remembers.</p>

            <div className="bg-purple-50 rounded-xl p-6 my-6">
              <p className="text-lg font-semibold mb-2">She will look at you with hunger.</p>
              <p className="text-lg font-semibold mb-2">With desire.</p>
              <p className="text-lg font-semibold mb-2">With need.</p>
              <div className="border-t-2 border-purple-300 my-4"></div>
              <p className="text-lg font-bold">She will grab you.</p>
              <p className="text-lg font-bold">Kiss you.</p>
              <p className="text-lg font-bold text-[#6B21A8]">And beg for it.</p>
            </div>
          </div>

          <div className="max-w-4xl mx-auto bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-400 rounded-2xl p-6 md:p-8 mb-6 md:mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 flex items-center justify-center gap-2">
              <TrendingUp className="w-8 h-8 text-green-600" />
              Real Results With TitanGrow Surge
            </h3>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-5 shadow-md">
                <p className="text-lg font-bold text-gray-900 mb-2">✔️ After 4 weeks</p>
                <p className="text-3xl font-bold text-[#6B21A8]">Up to 3 inches</p>
                <p className="text-sm text-gray-600 mt-2">gained</p>
              </div>

              <div className="bg-white rounded-xl p-5 shadow-md border-2 border-[#6B21A8]">
                <p className="text-lg font-bold text-gray-900 mb-2">✔️ After 12 weeks</p>
                <p className="text-3xl font-bold text-[#6B21A8]">Up to 5 inches</p>
                <p className="text-sm text-gray-600 mt-2">gained</p>
              </div>

              <div className="bg-white rounded-xl p-5 shadow-md">
                <p className="text-lg font-bold text-gray-900 mb-2">✔️ After 6 months</p>
                <p className="text-3xl font-bold text-[#6B21A8]">Up to 7 inches</p>
                <p className="text-sm text-gray-600 mt-2">gained</p>
              </div>
            </div>
          </div>

          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6 md:p-10 mb-6 md:mb-8">
            <p className="text-xl md:text-2xl font-bold text-gray-900 mb-6">After TitanGrow Surge arrives...</p>
            <p className="text-base md:text-lg text-gray-700 mb-4">
              Simply take <span className="font-bold text-[#6B21A8]">15 drops every morning</span>, tasteless, easy, discreet — and within days, you'll notice the difference.
            </p>

            <div className="bg-green-50 border-2 border-green-400 rounded-xl p-5 my-6">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Shield className="w-8 h-8 text-green-600" />
                <p className="text-xl font-bold text-gray-900">180-DAY GUARANTEE</p>
              </div>
              <p className="text-base md:text-lg text-gray-800 mb-2">
                If you use TitanGrow Surge for 180 days and do not grow, just message us.
              </p>
              <p className="text-lg font-bold text-green-700">We refund 100% of your money.</p>
              <p className="text-base font-semibold text-gray-900 mt-3">
                No risks. Either you grow… or you get your money back.
              </p>
            </div>
          </div>

          <div className="text-center mb-6 md:mb-8">
            <p className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              ❓ How many inches do YOU want to grow?
            </p>
          </div>

          <div className="bg-gradient-to-br from-[#6B21A8] to-[#581C87] rounded-[20px] md:rounded-[30px] p-6 md:p-12 shadow-2xl mb-4 md:mb-6 relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-gray-900 px-4 md:px-6 py-1.5 md:py-2 rounded-full font-bold text-xs md:text-base shadow-lg whitespace-nowrap">
              MOST POPULAR
            </div>
            <div className="text-white mb-4 md:mb-6 mt-2">
              <div className="text-2xl sm:text-3xl md:text-5xl font-bold mb-2">
                Grow up to {inches} inches
              </div>
              <div className="text-sm md:text-xl text-white/90 mb-1">
                TitanGrow Surge
              </div>
              <div className="text-xl sm:text-2xl md:text-4xl font-bold text-yellow-300 mt-3">
                ${price}
              </div>
              <div className="text-xs sm:text-sm md:text-lg text-white/90 mt-2">
                + 180-day money-back guarantee
              </div>
            </div>

            <button
              onClick={() => window.location.href = checkoutLink || ''}
              className="w-full max-w-md mx-auto bg-yellow-400 text-gray-900 py-3 sm:py-4 md:py-6 rounded-full font-bold hover:bg-yellow-300 transition-all shadow-lg text-sm sm:text-base md:text-xl leading-tight mb-4"
            >
              YES! I WANT TO GROW {inches} INCHES
            </button>

            <div className="flex flex-wrap justify-center items-center gap-3 md:gap-5 text-white/90 text-xs sm:text-sm md:text-base">
              <div className="flex items-center gap-1">
                <CheckCircle className="w-4 h-4 md:w-5 md:h-5" />
                <span>180-Day Guarantee</span>
              </div>
              <div className="flex items-center gap-1">
                <Truck className="w-4 h-4 md:w-5 md:h-5" />
                <span>Free Shipping</span>
              </div>
              <div className="flex items-center gap-1">
                <Shield className="w-4 h-4 md:w-5 md:h-5" />
                <span>Secure Payment</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-600 to-gray-700 rounded-[20px] p-4 md:p-6 shadow-lg">
            <div className="text-white mb-3 md:mb-4">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 md:mb-2">
                No Thanks
              </div>
              <div className="text-sm sm:text-base md:text-lg">
                I prefer to keep my current size
              </div>
            </div>

            <button
              onClick={() => window.location.href = checkoutLink || ''}
              className="w-full max-w-md mx-auto bg-white/20 text-white py-2.5 sm:py-3 md:py-4 rounded-full font-bold hover:bg-white/30 transition-all shadow-md text-base sm:text-lg md:text-xl"
            >
              NO THANKS
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Upsell2;
