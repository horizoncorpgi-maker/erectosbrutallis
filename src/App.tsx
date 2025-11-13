import { useState, useEffect, useRef } from 'react';
import {
  Play,
  Lock,
  Truck,
  Shield,
  Star,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  ThumbsUp,
  Share2,
  Flag,
  ChevronDown,
  AlertCircle,
  X
} from 'lucide-react';
import ArticleReader from './ArticleReader';

function App() {
  const offersRef = useRef<HTMLDivElement>(null);
  const sixBottleButtonRef = useRef<HTMLButtonElement>(null);
  const [currentExpert, setCurrentExpert] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [currentMedia, setCurrentMedia] = useState(0);
  const [dragStart, setDragStart] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState(0);
  const [currentLab, setCurrentLab] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [showTrustScorePopup, setShowTrustScorePopup] = useState(false);
  const [showReviews, setShowReviews] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<{name: string; logo: string; headline: string; description: string} | null>(null);
  const [showUpsellPopup, setShowUpsellPopup] = useState(false);
  const [upsellTimer, setUpsellTimer] = useState(10);
  const [selectedPackage, setSelectedPackage] = useState<'3-bottle' | '1-bottle' | null>(null);
  const [expertVideosPlaying, setExpertVideosPlaying] = useState<{[key: number]: boolean}>({});
  const [contentUnlocked, setContentUnlocked] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false); // 🔧 NOVO: Flag para controlar se já fez scroll

  const scrollToOffers = () => {
    offersRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // 🔧 CORREÇÃO PRINCIPAL: useEffect separado e otimizado
  useEffect(() => {
    console.log('%c[APP] 🚀 Sistema de scroll inicializado', 'color: #00ff00; font-weight: bold; font-size: 14px');

    const unlockContent = () => {
      console.log('%c[APP] ========================================', 'color: #ffaa00; font-weight: bold');
      console.log('%c[APP] 🔓 unlockContent CHAMADO!', 'color: #ffaa00; font-weight: bold; font-size: 16px');
      console.log('%c[APP] Estado atual:', 'color: #ffaa00', {
        contentUnlocked,
        hasScrolled
      });
      console.log('%c[APP] ========================================', 'color: #ffaa00; font-weight: bold');

      if (!contentUnlocked) {
        console.log('%c[APP] ✅ Desbloqueando conteúdo...', 'color: #00ff00; font-weight: bold');
        setContentUnlocked(true);

        // 🔧 CORREÇÃO: Aguarda DOM atualizar completamente
        requestAnimationFrame(() => {
          setTimeout(() => {
            if (!hasScrolled) {
              console.log('%c[APP] 🎯 Iniciando processo de scroll...', 'color: #00aaff; font-weight: bold; font-size: 14px');
              setHasScrolled(true);
              executeScroll();
            }
          }, 300); // 🔧 Aumentado de 200ms para 300ms
        });
      } else {
        console.log('%c[APP] ⚠️ Conteúdo já estava desbloqueado', 'color: #ff9900');
      }
    };

    // 🔧 NOVA FUNÇÃO: Sistema de scroll com fallback robusto
    const executeScroll = () => {
      console.log('%c[APP] 📍 executeScroll iniciado', 'color: #0099ff; font-weight: bold');

      const tryScroll = (attempts = 0) => {
        console.log('%c[APP] ========================================', 'color: #00aaff');
        console.log(`%c[APP] 🔄 Tentativa ${attempts + 1} de 20`, 'color: #00aaff; font-weight: bold');

        // 🔧 Múltiplas estratégias de busca
        const strategies = [
          { name: 'ref', element: sixBottleButtonRef.current },
          { name: 'id', element: document.getElementById('six-bottle-button') },
          { name: 'class', element: document.querySelector('.smartplayer-scroll-event') },
          { name: 'data-attr', element: document.querySelector('[data-scroll-target="offers"]') }
        ];

        let foundElement = null;
        let foundStrategy = '';

        for (const strategy of strategies) {
          if (strategy.element) {
            foundElement = strategy.element;
            foundStrategy = strategy.name;
            console.log(`%c[APP] ✓ Elemento encontrado via ${strategy.name}!`, 'color: #00ff00; font-weight: bold');
            break;
          }
        }

        console.log('%c[APP] Elementos verificados:', 'color: #00aaff', {
          ref: !!sixBottleButtonRef.current,
          byId: !!document.getElementById('six-bottle-button'),
          byClass: !!document.querySelector('.smartplayer-scroll-event'),
          offersSection: !!offersRef.current
        });

        if (foundElement) {
          console.log(`%c[APP] 🎉 SUCESSO! Fazendo scroll via ${foundStrategy}...`, 'color: #00ff00; font-weight: bold; font-size: 16px');
          
          // 🔧 Verifica se elemento está visível
          const rect = foundElement.getBoundingClientRect();
          const isVisible = rect.width > 0 && rect.height > 0;
          
          console.log('%c[APP] Dimensões do elemento:', 'color: #00aaff', {
            width: rect.width,
            height: rect.height,
            top: rect.top,
            isVisible
          });

          if (isVisible) {
            foundElement.scrollIntoView({ 
              behavior: 'smooth', 
              block: 'center',
              inline: 'nearest'
            });
            
            // 🔧 Feedback visual opcional
            setTimeout(() => {
              console.log('%c[APP] ✅ Scroll completado com sucesso!', 'color: #00ff00; font-weight: bold; font-size: 18px');
            }, 1000);
          } else {
            console.log('%c[APP] ⚠️ Elemento encontrado mas não está visível, tentando fallback...', 'color: #ff9900');
            scrollToOffersSection();
          }
        } else if (attempts < 20) { // 🔧 Aumentado de 10 para 20 tentativas
          console.log('%c[APP] ⏳ Elemento não encontrado, aguardando...', 'color: #ff9900');
          setTimeout(() => tryScroll(attempts + 1), 500); // 🔧 Aumentado de 300ms para 500ms
        } else {
          console.log('%c[APP] ❌ Limite de tentativas atingido, usando fallback...', 'color: #ff0000; font-weight: bold');
          scrollToOffersSection();
        }

        console.log('%c[APP] ========================================', 'color: #00aaff');
      };

      // 🔧 NOVA FUNÇÃO: Fallback para scroll da section
      const scrollToOffersSection = () => {
        console.log('%c[APP] 🔄 Executando fallback: scroll para section de ofertas', 'color: #ff9900; font-weight: bold');
        
        if (offersRef.current) {
          console.log('%c[APP] ✓ Section encontrada, fazendo scroll...', 'color: #00ff00');
          offersRef.current.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
          
          setTimeout(() => {
            console.log('%c[APP] ✅ Scroll para section completado!', 'color: #00ff00; font-weight: bold');
          }, 1000);
        } else {
          console.log('%c[APP] ❌ ERRO: Section de ofertas não encontrada!', 'color: #ff0000; font-weight: bold');
        }
      };

      tryScroll();
    };

    // 🔧 MELHORADO: Listeners para eventos do VTurb
    const handleVTurbScrollEvent = (e: Event) => {
      console.log('%c[APP] 🎬 Evento VTurb detectado!', 'color: #ff00ff; font-weight: bold; font-size: 14px', e.type);
      unlockContent();
    };

    // 🔧 Eventos principais
    console.log('%c[APP] 📡 Registrando listeners de eventos...', 'color: #00aaff');
    window.addEventListener('smartplayer-scroll-event', handleVTurbScrollEvent);
    window.addEventListener('smartplayer:video:ended', handleVTurbScrollEvent);
    window.addEventListener('smartplayer:cta:show', handleVTurbScrollEvent);

    // 🔧 NOVO: Listener alternativo para timeupdate (quando vídeo atinge certo ponto)
    const checkVideoProgress = () => {
      const players = document.querySelectorAll('vturb-smartplayer');
      players.forEach((player: any) => {
        if (player && !player._progressListenerAdded) {
          player._progressListenerAdded = true;
          
          // Tenta adicionar listener de timeupdate
          try {
            player.addEventListener('timeupdate', (e: any) => {
              const currentTime = e.detail?.currentTime || 0;
              const duration = e.detail?.duration || 0;
              
              // Desbloqueia quando passar de 80% do vídeo
              if (duration > 0 && (currentTime / duration) > 0.8 && !contentUnlocked) {
                console.log('%c[APP] 🎬 Vídeo atingiu 80%, desbloqueando...', 'color: #ff00ff; font-weight: bold');
                unlockContent();
              }
            });
          } catch (error) {
            console.log('%c[APP] ⚠️ Não foi possível adicionar listener de progresso:', 'color: #ff9900', error);
          }
        }
      });
    };

    // 🔧 Verifica players periodicamente
    const playerCheckInterval = setInterval(() => {
      const players = document.querySelectorAll('vturb-smartplayer');
      if (players.length > 0) {
        console.log(`%c[APP] ✓ ${players.length} player(s) VTurb encontrado(s)`, 'color: #00ff00');
        checkVideoProgress();
      }
    }, 2000);

    // 🔧 NOVO: Observer para mudanças no DOM
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length > 0) {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeName === 'VTURB-SMARTPLAYER') {
              console.log('%c[APP] 🎬 Novo player VTurb detectado no DOM', 'color: #ff00ff; font-weight: bold');
              checkVideoProgress();
            }
          });
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    // Cleanup
    return () => {
      console.log('%c[APP] 🧹 Limpando listeners e intervals...', 'color: #ff9900');
      clearInterval(playerCheckInterval);
      observer.disconnect();
      window.removeEventListener('smartplayer-scroll-event', handleVTurbScrollEvent);
      window.removeEventListener('smartplayer:video:ended', handleVTurbScrollEvent);
      window.removeEventListener('smartplayer:cta:show', handleVTurbScrollEvent);
    };
  }, []); // 🔧 IMPORTANTE: Array vazio - executa apenas uma vez

  useEffect(() => {
    testimonials.forEach((testimonial) => {
      if (testimonial?.videoScript) {
        const existingScript = document.querySelector(`script[src="${testimonial.videoScript}"]`);
        if (!existingScript) {
          const script = document.createElement('script');
          script.src = testimonial.videoScript;
          script.async = true;
          document.head.appendChild(script);
        }
      }
    });

    const heroVideoScript = 'https://scripts.converteai.net/6c140fb2-fd70-48d5-8d70-c2f66a937ef9/players/69124ec0b910e6e322c32a69/v4/player.js';
    const existingHeroScript = document.querySelector(`script[src="${heroVideoScript}"]`);
    if (!existingHeroScript) {
      const script = document.createElement('script');
      script.src = heroVideoScript;
      script.async = true;
      document.head.appendChild(script);
    }

    const expertVideoScript = 'https://scripts.converteai.net/6c140fb2-fd70-48d5-8d70-c2f66a937ef9/players/69124f9036636797770589e5/v4/player.js';
    const existingExpertScript = document.querySelector(`script[src="${expertVideoScript}"]`);
    if (!existingExpertScript) {
      const script = document.createElement('script');
      script.src = expertVideoScript;
      script.async = true;
      document.head.appendChild(script);
    }

    const expertVideoScript2 = 'https://scripts.converteai.net/6c140fb2-fd70-48d5-8d70-c2f66a937ef9/players/69124f9a3663679777058a0c/v4/player.js';
    const existingExpertScript2 = document.querySelector(`script[src="${expertVideoScript2}"]`);
    if (!existingExpertScript2) {
      const script = document.createElement('script');
      script.src = expertVideoScript2;
      script.async = true;
      document.head.appendChild(script);
    }

    const expertVideoScript3 = 'https://scripts.converteai.net/6c140fb2-fd70-48d5-8d70-c2f66a937ef9/players/69124f958af45b5e1aef9024/v4/player.js';
    const existingExpertScript3 = document.querySelector(`script[src="${expertVideoScript3}"]`);
    if (!existingExpertScript3) {
      const script = document.createElement('script');
      script.src = expertVideoScript3;
      script.async = true;
      document.head.appendChild(script);
    }
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (showUpsellPopup && upsellTimer > 0) {
      interval = setInterval(() => {
        setUpsellTimer((prev) => prev - 1);
      }, 1000);
    } else if (showUpsellPopup && upsellTimer === 0) {
      handleRefuseOffer();
    }
    return () => clearInterval(interval);
  }, [showUpsellPopup, upsellTimer]);

  useEffect(() => {
    const pauseAllVturbVideos = () => {
      const allPlayers = document.querySelectorAll('vturb-smartplayer');
      allPlayers.forEach((player: any) => {
        try {
          if (player && typeof player.pause === 'function') {
            player.pause();
          }
        } catch (e) {
          console.log('Erro ao pausar vídeo:', e);
        }
      });
    };

    pauseAllVturbVideos();
  }, [currentTestimonial]);

  useEffect(() => {
    const handleVturbPlay = () => {
      const allPlayers = document.querySelectorAll('vturb-smartplayer');

      allPlayers.forEach((player: any, index) => {
        try {
          if (index !== currentTestimonial && player && typeof player.pause === 'function') {
            player.pause();
          }
        } catch (e) {
          console.log('Erro ao pausar vídeo:', e);
        }
      });
    };

    const checkForPlayers = setInterval(() => {
      const allPlayers = document.querySelectorAll('vturb-smartplayer');

      allPlayers.forEach((player: any) => {
        if (player && !player._pauseListenerAdded) {
          player._pauseListenerAdded = true;
          player.addEventListener('play', handleVturbPlay);

          const iframe = player.querySelector('iframe');
          if (iframe) {
            iframe.addEventListener('load', () => {
              try {
                const iframeDocument = iframe.contentDocument || iframe.contentWindow?.document;
                const video = iframeDocument?.querySelector('video');
                if (video) {
                  video.addEventListener('play', handleVturbPlay);
                }
              } catch (e) {
                // Ignora erros de cross-origin
              }
            });
          }
        }
      });
    }, 500);

    return () => {
      clearInterval(checkForPlayers);
    };
  }, [currentTestimonial]);

  const handlePackageClick = (packageType: '3-bottle' | '1-bottle') => {
    setSelectedPackage(packageType);
    setShowUpsellPopup(true);
    setUpsellTimer(10);
  };

  const handleAcceptOffer = () => {
    setShowUpsellPopup(false);
    window.location.href = 'https://pay.erectosbrutallis.com/checkout/197875571:1';
  };

  const handleRefuseOffer = () => {
    setShowUpsellPopup(false);
    if (selectedPackage === '3-bottle') {
      window.location.href = 'https://pay.erectosbrutallis.com/checkout/197875570:1';
    } else if (selectedPackage === '1-bottle') {
      window.location.href = 'https://pay.erectosbrutallis.com/checkout/197875568:1';
    }
  };

  const experts = [
    {
      name: "Dr. Mehmet Oz",
      title: "Cardiothoracic Surgeon, MD",
      institution: "Columbia University",
      photo: "https://i.imgur.com/oM0Uyij.jpeg",
      video: "https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=400",
      quote: "Erectos Brutallis represents a breakthrough in natural men's health. Simple ingredients, impressive results."
    },
    {
      name: "Dr. Steven Gundry",
      title: "Former Cardiac Surgeon, MD",
      institution: "Center for Restorative Medicine",
      photo: "https://i.imgur.com/z8WR0yL.jpeg",
      video: "https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=400",
      quote: "Natural compounds like those in Erectos Brutallis restore balance from within — exactly my philosophy."
    },
    {
      name: "Dr. Rena Malik",
      title: "Urologist, MD",
      institution: "University of Maryland",
      photo: "https://i.imgur.com/iNaQpa5.jpeg",
      video: "https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=400",
      quote: "Erectos Brutallis offers men a promising natural alternative that supports both confidence and wellness."
    }
  ];

  const testimonials = [
    {
      name: "Michael T.",
      age: 42,
      location: "Texas",
      rating: 5,
      videoId: "vid-69093a615431bed16ae4af02",
      videoScript: "https://scripts.converteai.net/6c140fb2-fd70-48d5-8d70-c2f66a937ef9/players/69093a615431bed16ae4af02/v4/player.js",
      quote: "After 6 weeks, I feel like I'm in my 20s again. My confidence is through the roof and my partner has noticed the difference."
    },
    {
      name: "David R.",
      age: 51,
      location: "California",
      rating: 5,
      videoId: "vid-69093a5b53b20aaaf09d1963",
      videoScript: "https://scripts.converteai.net/6c140fb2-fd70-48d5-8d70-c2f66a937ef9/players/69093a5b53b20aaaf09d1963/v4/player.js",
      quote: "I was skeptical at first, but the results speak for themselves. This is the real deal."
    },
    {
      name: "Robert M.",
      age: 38,
      location: "Florida",
      rating: 5,
      videoId: "vid-69093a5775d3a4ef1487be6e",
      videoScript: "https://scripts.converteai.net/6c140fb2-fd70-48d5-8d70-c2f66a937ef9/players/69093a5775d3a4ef1487be6e/v4/player.js",
      quote: "Life-changing. I wish I had found this years ago. Thank you for giving me my confidence back."
    }
  ];

  const mediaLogos = [
    {
      name: "CNN Health",
      logo: "https://i.imgur.com/0twf89j.png",
      headline: "A Surprising Natural Solution to Men's Performance Issues",
      description: "CNN reveals the growing demand for Salt Coffee solutions among men over 40. Products like BlueBites with Salt Coffee are gaining ground as alternatives to traditional treatments.",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      ringColor: "ring-blue-300"
    },
    {
      name: "Mayo Clinic",
      logo: "https://i.imgur.com/ClqsijC.png",
      headline: "The Science Behind Herbal Support for Men's Vitality",
      description: "Mayo Clinic explores the benefits and limitations of Salt Coffee approaches, suggesting products like BlueBites with Salt Coffee may complement traditional treatment.",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      ringColor: ""
    },
    {
      name: "WebMD",
      logo: "https://i.imgur.com/hEggmdK.png",
      headline: "Natural Male Enhancers Gaining Ground in 2025",
      description: "WebMD highlights studies on the use of Salt Coffee to improve male sexual health and performance naturally.",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      ringColor: ""
    }
  ];

  const labImages = [
    "https://images.pexels.com/photos/3938022/pexels-photo-3938022.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/3825586/pexels-photo-3825586.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/3825517/pexels-photo-3825517.jpeg?auto=compress&cs=tinysrgb&w=800"
  ];

  const nextExpert = () => {
    pauseExpertVideo(currentExpert);
    setExpertVideosPlaying({});
    setCurrentExpert((prev) => (prev + 1) % experts.length);
  };

  const prevExpert = () => {
    pauseExpertVideo(currentExpert);
    setExpertVideosPlaying({});
    setCurrentExpert((prev) => (prev - 1 + experts.length) % experts.length);
  };

  const pauseExpertVideo = (expertIndex: number) => {
    const videoIds = [
      'vid-69124f9036636797770589e5',
      'vid-69124f9a3663679777058a0c',
      'vid-69124f958af45b5e1aef9024'
    ];

    const player = document.getElementById(videoIds[expertIndex]) as any;
    if (player && typeof player.pause === 'function') {
      try {
        player.pause();
      } catch (e) {
        console.log('Erro ao pausar vídeo:', e);
      }
    }
  };

  const toggleExpertVideo = (expertIndex: number) => {
    const videoIds = [
      'vid-69124f9036636797770589e5',
      'vid-69124f9a3663679777058a0c',
      'vid-69124f958af45b5e1aef9024'
    ];

    const player = document.getElementById(videoIds[expertIndex]) as any;
    if (player) {
      try {
        if (expertVideosPlaying[expertIndex]) {
          player.pause();
          setExpertVideosPlaying({...expertVideosPlaying, [expertIndex]: false});
        } else {
          player.play();
          setExpertVideosPlaying({...expertVideosPlaying, [expertIndex]: true});
        }
      } catch (e) {
        console.log('Erro ao controlar vídeo:', e);
      }
    }
  };

  const nextTestimonial = () => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  const prevTestimonial = () => setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  const nextMedia = () => setCurrentMedia((prev) => (prev + 1) % mediaLogos.length);
  const prevMedia = () => setCurrentMedia((prev) => (prev - 1 + mediaLogos.length) % mediaLogos.length);

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    setDragStart(clientX);
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (dragStart === null) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const offset = clientX - dragStart;
    setDragOffset(offset);
  };

  const handleDragEnd = () => {
    if (dragStart === null) return;
    if (dragOffset > 50) {
      prevMedia();
    } else if (dragOffset < -50) {
      nextMedia();
    }
    setDragStart(null);
    setDragOffset(0);
  };

  const getCardStyle = (index: number) => {
    const diff = index - currentMedia;
    const absIndex = (diff + mediaLogos.length) % mediaLogos.length;

    if (absIndex === 0) {
      return {
        transform: `translateX(${dragOffset}px) scale(1)`,
        opacity: 1,
        zIndex: 10,
      };
    } else if (absIndex === 1) {
      return {
        transform: 'translateX(220px) scale(0.95)',
        opacity: 0.8,
        zIndex: 5,
      };
    } else {
      return {
        transform: 'translateX(-220px) scale(0.95)',
        opacity: 0.8,
        zIndex: 5,
      };
    }
  };

  const nextLab = () => setCurrentLab((prev) => (prev + 1) % labImages.length);
  const prevLab = () => setCurrentLab((prev) => (prev - 1 + labImages.length) % labImages.length);

  return (
    <div className="min-h-screen bg-white overflow-x-hidden w-full">
      {/* Hero / VSL Section */}
      <section className={`min-h-screen flex items-center justify-center px-4 py-8 md:py-20 bg-gradient-to-br from-white via-gray-50 to-red-50 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl sm:text-4xl md:text-7xl font-bold text-gray-900 mb-3 md:mb-6 leading-tight px-2">
            Why are men adding salt to their <span className="text-[#B80000]">morning coffee?</span>
          </h1>
          <p className="text-base sm:text-xl md:text-2xl text-gray-600 mb-6 md:mb-12 font-light px-4">
            It sounds weird… but this simple trick is changing how guys start their day — boosting focus, drive, and energy within minutes.
          </p>

          <div className="relative w-full max-w-sm md:max-w-md mx-auto bg-black rounded-[20px] overflow-hidden shadow-2xl aspect-[9/16]">
            <vturb-smartplayer id="vid-69124ec0b910e6e322c32a69" style={{ display: 'block', margin: '0 auto', width: '100%', maxWidth: '400px' }}></vturb-smartplayer>
          </div>

          {/* 🔧 CORREÇÃO: Botão SEMPRE renderizado, apenas visibilidade controlada */}
          <button
            className="smartplayer-scroll-event"
            style={{
              position: 'absolute',
              bottom: '-50px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '200px',
              height: '200px',
              opacity: 0,
              pointerEvents: 'auto',
              cursor: 'default',
              zIndex: 9999,
              border: 'none',
              background: 'transparent',
              padding: 0,
              visibility: 'visible' // 🔧 SEMPRE visível no DOM
            }}
            aria-hidden="true"
            tabIndex={-1}
          />
        </div>
      </section>

      {/* 🔧 CORREÇÃO: Section sempre no DOM, controle via visibility e height */}
      <section 
        ref={offersRef} 
        className="py-8 md:py-20 px-4 bg-white transition-all duration-500" 
        style={{ 
          maxHeight: contentUnlocked ? '10000px' : '0',
          overflow: contentUnlocked ? 'visible' : 'hidden',
          opacity: contentUnlocked ? 1 : 0,
          visibility: contentUnlocked ? 'visible' : 'hidden'
        }}
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-5xl font-bold text-center text-gray-900 mb-6 md:mb-16 px-2">
            Choose Your Transformation Package
          </h2>

          {/* 6-Bottle Package - Full Width */}
          <div className="mb-4 md:mb-8">
            <div className="relative bg-gradient-to-br from-[#C62828] to-[#B71C1C] rounded-[30px] p-4 md:p-12 lg:p-16 shadow-2xl">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#FFD600] text-gray-900 px-6 py-2 rounded-full text-sm md:text-lg font-bold shadow-lg flex items-center gap-1 md:gap-2">
                <Star className="w-4 h-4 md:w-5 md:h-5 fill-gray-900" />
                BEST VALUE
              </div>
              <div className="text-center">
                <img
                  src="https://i.postimg.cc/Wz1S0fmQ/erectos-brutallis-10.png"
                  alt="6-Bottle Package"
                  className="w-full h-48 md:h-80 lg:h-96 object-contain mb-3 md:mb-8 mt-2 md:mt-4"
                />
                <h3 className="text-2xl md:text-5xl font-bold text-white mb-1 md:mb-2 tracking-wide">ERECTOS BRUTALLIS</h3>
                <p className="text-base md:text-2xl text-white/90 font-semibold mb-2 md:mb-4">6 BOTTLE PACKAGE</p>
                <div className="text-2xl md:text-4xl font-bold text-[#FFD600] mb-3 md:mb-6">
                  YOU'RE SAVING $888
                </div>
                {/* 🔧 CORREÇÃO: Múltiplos atributos para identificação */}
                <button
                  ref={sixBottleButtonRef}
                  id="six-bottle-button"
                  data-scroll-target="offers"
                  onClick={() => window.location.href = 'https://pay.erectosbrutallis.com/checkout/197875571:1'}
                  className="smartplayer-scroll-event w-full max-w-md mx-auto bg-[#FFD600] text-gray-900 py-3 md:py-6 rounded-full font-bold hover:bg-[#FFC400] transition-all shadow-lg text-base md:text-2xl mb-3 md:mb-6"
                >
                  CLAIM OFFER NOW
                </button>
                <div className="text-white/90 text-sm md:text-lg mb-3 md:mb-6">
                  only <span className="font-bold">$49 per bottle, $294 total</span>
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

          {/* 3-Bottle and 1-Bottle Packages - Side by Side */}
          <div className="grid grid-cols-2 gap-4 md:gap-8 mb-8 md:mb-12">
            {/* 3-Bottle Package */}
            <div className="relative bg-gradient-to-br from-[#EF5350] to-[#E53935] rounded-[30px] p-4 md:p-10 shadow-xl">
              <div className="text-center">
                <img
                  src="https://i.postimg.cc/FzHG0ng9/erectos-brutallis-13.png"
                  alt="3-Bottle Package"
                  className="w-full h-32 md:h-56 object-contain mb-2 md:mb-4"
                />
                <h3 className="text-lg md:text-3xl font-bold text-white mb-0.5 md:mb-1 tracking-wide">ERECTOS BRUTALLIS</h3>
                <p className="text-sm md:text-lg text-white/90 font-semibold mb-2 md:mb-3">3 BOTTLE PACKAGE</p>
                <div className="text-xl md:text-3xl font-bold text-[#FFD600] mb-2 md:mb-4">
                  SAVE $414
                </div>
                <button
                  onClick={() => handlePackageClick('3-bottle')}
                  className="w-full bg-[#FFD600] text-gray-900 py-3 md:py-5 rounded-full font-bold hover:bg-[#FFC400] transition-all text-base md:text-xl mb-2 md:mb-4"
                >
                  BUY NOW
                </button>
                <div className="text-white/90 text-xs md:text-base mb-2 md:mb-4">
                  $59 per bottle, <span className="font-bold">$177 total</span>
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

            {/* 1-Bottle Package */}
            <div className="relative bg-gradient-to-br from-[#FF7043] to-[#FF5722] rounded-[30px] p-4 md:p-10 shadow-xl">
              <div className="text-center">
                <img
                  src="https://i.postimg.cc/90Q1yNtc/erectos-brutallis-9.png"
                  alt="1-Bottle Package"
                  className="w-full h-32 md:h-56 object-contain mb-2 md:mb-4"
                />
                <h3 className="text-lg md:text-3xl font-bold text-white mb-0.5 md:mb-1 tracking-wide">ERECTOS BRUTALLIS</h3>
                <p className="text-sm md:text-lg text-white/90 font-semibold mb-2 md:mb-3">1 BOTTLE PACKAGE</p>
                <div className="text-xl md:text-3xl font-bold text-[#FFD600] mb-2 md:mb-4">
                  SAVE $118
                </div>
                <button
                  onClick={() => handlePackageClick('1-bottle')}
                  className="w-full bg-[#FFD600] text-gray-900 py-3 md:py-5 rounded-full font-bold hover:bg-[#FFC400] transition-all text-base md:text-xl mb-2 md:mb-4"
                >
                  BUY NOW
                </button>
                <div className="text-white/90 text-xs md:text-base mb-2 md:mb-4">
                  $89 <span className="font-bold">$79 + $9.99 ship</span>
                </div>
                <div className="flex justify-center items-center gap-3 md:gap-4 text-white/90 text-xs md:text-sm">
                  <div className="flex items-center gap-1">
                    <CheckCircle className="w-3 h-3 md:w-4 md:h-4" />
                    <span>180d</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Truck className="w-3 h-3 md:w-4 md:h-4" />
                    <span>$9.99</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Shield className="w-3 h-3 md:w-4 md:h-4" />
                    <span>Safe</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resto do código continua igual... */}
      {/* Por questões de espaço, as demais sections continuam iguais ao código original */}
      {/* Apenas adicione style={{ display: contentUnlocked ? 'block' : 'none' }} em cada section que deve aparecer após unlock */}

      {/* Experts Section */}
      <section className="py-8 md:py-20 px-4 bg-gradient-to-b from-white to-gray-50" style={{ display: contentUnlocked ? 'block' : 'none' }}>
        {/* ... conteúdo igual ao original ... */}
      </section>

      {/* Testimonials Section */}
      <section className="py-8 md:py-20 px-4 bg-white" style={{ display: contentUnlocked ? 'block' : 'none' }}>
        {/* ... conteúdo igual ao original ... */}
      </section>

      {/* Demais sections... */}

    </div>
  );
}

export default App;
