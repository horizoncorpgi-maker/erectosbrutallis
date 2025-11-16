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

  // Detecta se está em ambiente de desenvolvimento
  const isDevelopment = import.meta.env.DEV ||
                       window.location.hostname === 'localhost' ||
                       window.location.hostname.includes('bolt') ||
                       window.location.hostname.includes('stackblitz') ||
                       window.location.hostname.includes('webcontainer');

  const [showRestOfContent, setShowRestOfContent] = useState(false);
  const [showPurchaseButton, setShowPurchaseButton] = useState(false);
  const [hasVideoTriggeredContent, setHasVideoTriggeredContent] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const hasScrolledRef = useRef(false);

  const scrollToOffers = () => {
    offersRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Persistência: verifica se usuário já viu o conteúdo antes
  useEffect(() => {
    if (!isDevelopment) {
      const hasSeenContent = sessionStorage.getItem('has_seen_content') === 'true';

      if (hasSeenContent) {
        console.log('👤 Usuário já viu o conteúdo antes - mostrando tudo');
        setShowRestOfContent(true);
        setShowPurchaseButton(true);
      }
    }
  }, [isDevelopment]);

  // 🔧 DEBUG: Monitora mudanças no estado showRestOfContent
  useEffect(() => {
    console.log('%c📊 Estado showRestOfContent mudou:', 'color: #00aaff; font-weight: bold; font-size: 14px', showRestOfContent);
    console.log('%c📊 Estado showPurchaseButton:', 'color: #00aaff', showPurchaseButton);
  }, [showRestOfContent, showPurchaseButton]);

  // 🔧 CORREÇÃO 1: Callback que revela o conteúdo quando VTurb chega no pitch
  const handleVideoPitchReached = () => {
    console.log('%c========================================', 'color: #ff00ff; font-weight: bold');
    console.log('%c🎬 VTurb video triggered content reveal', 'color: #ff00ff; font-weight: bold; font-size: 14px');
    console.log('%cEstado ANTES:', 'color: #ff9900', {
      showRestOfContent,
      showPurchaseButton,
      hasScrolled: hasScrolledRef.current
    });

    // 🔧 CORREÇÃO CRÍTICA: Previne múltiplas execuções
    if (hasScrolledRef.current) {
      console.log('%c⚠️ Scroll já foi executado, ignorando...', 'color: #ff9900');
      return;
    }

    // 💾 Salva no sessionStorage (apenas usuários normais)
    if (!isDevelopment) {
      sessionStorage.setItem('has_seen_content', 'true');
    }

    console.log('%c✅ PASSO 1: Revelando conteúdo...', 'color: #00ff00; font-weight: bold');

    // ✅ PASSO 1: ATIVA A EXIBIÇÃO DO RESTO DA PÁGINA IMEDIATAMENTE
    hasScrolledRef.current = true;
    setShowRestOfContent(true);
    setShowPurchaseButton(true);
    setHasVideoTriggeredContent(true);
    setHasScrolled(true);

    console.log('%c✅ Estados atualizados para TRUE', 'color: #00ff00; font-weight: bold');
    console.log('%c✅ hasScrolledRef.current:', 'color: #00ff00', hasScrolledRef.current);
    console.log('%c========================================', 'color: #ff00ff; font-weight: bold');

    // 🔥 DISPARA EVENTO CUSTOMIZADO para remover todos os bloqueadores
    console.log('%c🔥 Disparando evento de liberação total...', 'color: #ff0000; font-weight: bold');
    window.dispatchEvent(new CustomEvent('content-revealed'));

    // 🔧 PASSO 2: Aguarda DOM renderizar e FAZ O SCROLL
    console.log('%c🎯 PASSO 2: Aguardando DOM renderizar para fazer scroll...', 'color: #00aaff; font-weight: bold');

    // Aguarda múltiplos frames para garantir que o DOM foi atualizado
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setTimeout(() => {
          console.log('%c🚀 DOM renderizado, iniciando scroll...', 'color: #00ff00; font-weight: bold');
          executeScroll();
        }, 500);
      });
    });
  };

  // 🔧 CORREÇÃO 4: Função de scroll com fallback
  const executeScroll = () => {
    console.log('%c📍 executeScroll iniciado', 'color: #0099ff; font-weight: bold');

    const tryScroll = (attempts = 0) => {
      console.log(`%c🔄 Tentativa ${attempts + 1} de 20`, 'color: #00aaff; font-weight: bold');

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
          console.log(`%c✓ Elemento encontrado via ${strategy.name}!`, 'color: #00ff00; font-weight: bold');
          break;
        }
      }

      if (foundElement) {
        // 🔧 CORREÇÃO 2: Verifica se elemento está visível
        const rect = foundElement.getBoundingClientRect();
        const isVisible = rect.width > 0 && rect.height > 0;

        console.log('%cDimensões do elemento:', 'color: #00aaff', {
          width: rect.width,
          height: rect.height,
          top: rect.top,
          isVisible
        });

        if (isVisible) {
          console.log(`%c✅ Fazendo scroll via ${foundStrategy}...`, 'color: #00ff00; font-weight: bold; font-size: 16px');

          const elementTop = foundElement.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementTop - (window.innerHeight / 2) + (rect.height / 2);

          console.log('%c📍 Posições:', 'color: #00aaff', {
            elementTop,
            windowHeight: window.innerHeight,
            elementHeight: rect.height,
            scrollTo: offsetPosition
          });

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        } else {
          console.log('%c⚠️ Elemento encontrado mas não está visível, tentando fallback...', 'color: #ff9900');
          scrollToOffersSection();
        }
      } else if (attempts < 20) {
        console.log('%c⏳ Elemento não encontrado, aguardando...', 'color: #ff9900');
        setTimeout(() => tryScroll(attempts + 1), 500);
      } else {
        console.log('%c❌ Limite de tentativas atingido, usando fallback...', 'color: #ff0000; font-weight: bold');
        scrollToOffersSection();
      }
    };

    // 🔧 CORREÇÃO 4: Fallback para scroll da section
    const scrollToOffersSection = () => {
      console.log('%c🔄 Executando fallback: scroll para section de ofertas', 'color: #ff9900; font-weight: bold');

      if (offersRef.current) {
        console.log('%c✓ Section encontrada, fazendo scroll...', 'color: #00ff00');

        const offsetTop = offersRef.current.offsetTop - 100;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });

        setTimeout(() => {
          console.log('%c✅ Scroll para section completado!', 'color: #00ff00; font-weight: bold');
        }, 1000);
      } else {
        console.log('%c❌ ERRO: Section de ofertas não encontrada!', 'color: #ff0000; font-weight: bold');
      }
    };

    // 🔧 Aguarda DOM atualizar completamente antes de tentar scroll
    requestAnimationFrame(() => {
      setTimeout(() => tryScroll(), 300);
    });
  };

  // 🔧 CORREÇÃO 5: Sistema melhorado de detecção de eventos do VTurb
  useEffect(() => {
    console.log('%c📡 Inicializando sistema de detecção VTurb...', 'color: #00aaff; font-weight: bold');
    console.log('%c📊 Estado inicial:', 'color: #00aaff', { showRestOfContent, showPurchaseButton, hasScrolled });

    // Sistema de detecção de scroll do VTurb - NÃO bloqueia scroll manual
    let lastScrollY = window.scrollY;
    let lastUserInteractionTime = 0;
    let lastScrollEventTime = 0;

    // Marca quando o usuário interage (para diferenciar de scroll automático do VTurb)
    const markUserInteraction = () => {
      lastUserInteractionTime = Date.now();
    };

    // Marca quando há evento de scroll (atualiza durante scroll manual)
    const markScrollEvent = () => {
      lastScrollEventTime = Date.now();
    };

    // Listeners passivos - apenas marcam interação, não bloqueiam nada
    window.addEventListener('wheel', markUserInteraction, { passive: true });
    window.addEventListener('touchstart', markUserInteraction, { passive: true });
    window.addEventListener('touchmove', markUserInteraction, { passive: true });
    window.addEventListener('mousedown', markUserInteraction, { passive: true });
    window.addEventListener('scroll', markScrollEvent, { passive: true });

    // Detecta scroll automático do VTurb
    let rafId: number;
    const checkScroll = () => {
      // Para de monitorar se o conteúdo já foi revelado
      if (hasScrolledRef.current) {
        return;
      }

      const currentScrollY = window.scrollY;
      const scrollDiff = Math.abs(currentScrollY - lastScrollY);
      const timeSinceUserInteraction = Date.now() - lastUserInteractionTime;
      const timeSinceScrollEvent = Date.now() - lastScrollEventTime;

      // Verifica se está no limite inferior da página
      const isAtBottom = (window.innerHeight + currentScrollY) >= (document.documentElement.scrollHeight - 5);

      // CONDIÇÃO 1: Scroll normal do VTurb (> 1px de movimento)
      // 1. Houve scroll > 1px (sensibilidade reduzida)
      // 2. Passou mais de 500ms desde última interação do usuário
      // 3. E há eventos de scroll acontecendo (< 100ms desde último evento de scroll)
      const isNormalVTurbScroll = scrollDiff > 1 && timeSinceUserInteraction > 500 && timeSinceScrollEvent < 100;

      // CONDIÇÃO 2: Tentativa de scroll do VTurb no limite da página
      // O VTurb tenta fazer scroll mas está no limite, então:
      // 1. Está no limite inferior da página
      // 2. Houve evento de scroll recente (< 50ms)
      // 3. Passou mais de 500ms desde última interação do usuário
      // 4. Movimento mínimo ou nenhum (scrollDiff <= 1px)
      const isVTurbAtBottom = isAtBottom && timeSinceScrollEvent < 50 && timeSinceUserInteraction > 500 && scrollDiff <= 1;

      if (isNormalVTurbScroll || isVTurbAtBottom) {
        console.log('%c🎯 SCROLL AUTOMÁTICO DO VTURB DETECTADO!', 'color: #ff0000; font-weight: bold; font-size: 16px');
        console.log('%c📊 Tipo:', isVTurbAtBottom ? 'No limite da página' : 'Scroll normal');
        console.log('%c📊 Scroll de:', lastScrollY, 'para:', currentScrollY, '| Diferença:', scrollDiff + 'px');
        console.log('%c📊 No limite?', isAtBottom);
        console.log('%c⏱️ Tempo desde última interação:', timeSinceUserInteraction + 'ms');
        console.log('%c⏱️ Tempo desde último scroll event:', timeSinceScrollEvent + 'ms');
        handleVideoPitchReached();
        return; // Para de monitorar após revelar
      }

      lastScrollY = currentScrollY;
      rafId = requestAnimationFrame(checkScroll);
    };

    rafId = requestAnimationFrame(checkScroll);

    const handleVTurbScrollEvent = (e: Event) => {
      console.log('%c🎯 Evento VTurb detectado!', 'color: #ff00ff; font-weight: bold; font-size: 14px', e.type);

      // Se o conteúdo já foi revelado, não faz NADA - deixa o evento fluir normalmente
      if (hasScrolledRef.current) {
        console.log('%c✓ Conteúdo já revelado - evento VTurb liberado completamente', 'color: #00ff00');
        return;
      }

      // Só processa eventos do vídeo principal, não dos depoimentos ou experts
      const target = e.target as HTMLElement;
      const isMainVideo = target?.id === 'vid-69124ec0b910e6e322c32a69' ||
                          target?.closest('#vid-69124ec0b910e6e322c32a69');

      console.log('%c📊 Detalhes:', 'color: #00aaff', {
        eventType: e.type,
        targetId: target?.id,
        isMainVideo,
        hasScrolled: hasScrolledRef.current
      });

      // Só bloqueia se for do vídeo principal E o conteúdo ainda não foi revelado
      if (isMainVideo) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        console.log('%c🛑 Evento VTurb do vídeo principal bloqueado - revelando conteúdo', 'color: #ff0000; font-weight: bold');
        handleVideoPitchReached();
      } else {
        console.log('%c✓ Evento de outro vídeo - não bloqueia', 'color: #00ff00');
      }
    };

    // Função para adicionar listeners ao player principal
    const attachListenersToMainPlayer = (player: HTMLElement) => {
      if (player.hasAttribute('data-listeners-attached')) {
        return;
      }

      console.log('%c🎬 Adicionando listeners ao player principal', 'color: #00ff00; font-weight: bold');
      player.setAttribute('data-listeners-attached', 'true');

      // Todos os eventos possíveis do VTurb
      const vturbEvents = [
        'smartplayer-scroll-event',
        'smartplayer:video:ended',
        'smartplayer:cta:show',
        'smartplayer:scroll',
        'smartplayer-cta-show',
        'cta-show',
        'scroll-event'
      ];

      vturbEvents.forEach(eventName => {
        player.addEventListener(eventName, handleVTurbScrollEvent, { capture: true });
      });
    };

    // Tenta adicionar listeners ao player principal se ele já existe
    const mainPlayer = document.getElementById('vid-69124ec0b910e6e322c32a69');
    if (mainPlayer) {
      attachListenersToMainPlayer(mainPlayer);
    }

    // Observer para detectar quando o player principal for adicionado ao DOM
    const playerObserver = new MutationObserver((mutations) => {
      const mainPlayer = document.getElementById('vid-69124ec0b910e6e322c32a69');
      if (mainPlayer && !mainPlayer.hasAttribute('data-listeners-attached')) {
        console.log('%c🎬 Player principal detectado no DOM!', 'color: #ff00ff; font-weight: bold');
        attachListenersToMainPlayer(mainPlayer);
      }
    });

    playerObserver.observe(document.body, {
      childList: true,
      subtree: true
    });

    // Fallback global caso os eventos não sejam capturados no player
    const vturbGlobalEvents = [
      'smartplayer-scroll-event',
      'smartplayer:video:ended',
      'smartplayer:cta:show',
      'smartplayer:scroll',
      'smartplayer-cta-show'
    ];

    vturbGlobalEvents.forEach(eventName => {
      window.addEventListener(eventName, handleVTurbScrollEvent, true);
    });

    // 🔧 INTERCEPTADOR DE SCROLL: Detecta quando VTurb tenta fazer scroll (apenas no vídeo principal)
    const interceptScroll = (e: Event) => {
      // Se o conteúdo já foi revelado, não faz NADA
      if (hasScrolledRef.current) {
        console.log('%c✓ Conteúdo já revelado - scroll liberado completamente', 'color: #00ff00');
        return;
      }

      console.log('%c🎯 Scroll detectado - verificando se conteúdo já foi revelado', 'color: #ff00ff; font-weight: bold');
      console.log('%c⚠️ Conteúdo ainda não revelado - revelando AGORA', 'color: #ff9900; font-weight: bold');
      e.preventDefault();
      e.stopPropagation();
      handleVideoPitchReached();
    };

    // Monitora tentativas de scroll do VTurb apenas nos botões de oferta
    const scrollObserver = new MutationObserver(() => {
      const scrollEvents = document.querySelectorAll('.smartplayer-scroll-event');
      scrollEvents.forEach((el) => {
        const isOfferButton = el.id === 'six-bottle-button' || el.hasAttribute('data-scroll-target');
        if (isOfferButton && !el.hasAttribute('data-scroll-intercepted')) {
          el.setAttribute('data-scroll-intercepted', 'true');
          el.addEventListener('click', interceptScroll, true);
        }
      });
    });

    scrollObserver.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class']
    });

    // 🔧 NOVO: Listener alternativo para timeupdate (quando vídeo atinge certo ponto)
    const checkVideoProgress = () => {
      const players = document.querySelectorAll('vturb-smartplayer');
      players.forEach((player: any) => {
        if (player && !player._progressListenerAdded) {
          player._progressListenerAdded = true;

          try {
            player.addEventListener('timeupdate', (e: any) => {
              const currentTime = e.detail?.currentTime || 0;
              const duration = e.detail?.duration || 0;

              // Desbloqueia quando passar de 80% do vídeo
              if (duration > 0 && (currentTime / duration) > 0.8 && !hasScrolledRef.current) {
                console.log('%c🎬 Vídeo atingiu 80%, desbloqueando...', 'color: #ff00ff; font-weight: bold');
                handleVideoPitchReached();
              }
            });

            // Adiciona listener para ended
            player.addEventListener('ended', () => {
              console.log('%c🎬 Vídeo terminou, desbloqueando...', 'color: #ff00ff; font-weight: bold');
              handleVideoPitchReached();
            });
          } catch (error) {
            console.log('%c⚠️ Não foi possível adicionar listener de progresso:', 'color: #ff9900', error);
          }
        }
      });
    };

    // Verifica players periodicamente
    const playerCheckInterval = setInterval(() => {
      const players = document.querySelectorAll('vturb-smartplayer');
      if (players.length > 0) {
        console.log(`%c✓ ${players.length} player(s) VTurb encontrado(s)`, 'color: #00ff00');
        checkVideoProgress();
      }
    }, 2000);

    // Observer para mudanças no DOM
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length > 0) {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeName === 'VTURB-SMARTPLAYER') {
              console.log('%c🎬 Novo player VTurb detectado no DOM', 'color: #ff00ff; font-weight: bold');
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

    // 🔥 LISTENER PARA REMOVER TODOS OS BLOQUEADORES quando o conteúdo for revelado
    const removeAllBlockers = () => {
      console.log('%c🔥🔥🔥 REMOVENDO TODOS OS BLOQUEADORES - SCROLL TOTALMENTE LIBERADO!', 'color: #ff0000; font-weight: bold; font-size: 16px');

      // Cancela o monitoramento de scroll
      cancelAnimationFrame(rafId);

      // Remove listeners de interação
      window.removeEventListener('wheel', markUserInteraction);
      window.removeEventListener('touchstart', markUserInteraction);
      window.removeEventListener('touchmove', markUserInteraction);
      window.removeEventListener('mousedown', markUserInteraction);
      window.removeEventListener('scroll', markScrollEvent);

      // Para os observers
      scrollObserver.disconnect();
      playerObserver.disconnect();

      // Remove do mainPlayer se existir
      const mainPlayer = document.getElementById('vid-69124ec0b910e6e322c32a69');
      if (mainPlayer) {
        const vturbEvents = [
          'smartplayer-scroll-event',
          'smartplayer:video:ended',
          'smartplayer:cta:show',
          'smartplayer:scroll',
          'smartplayer-cta-show',
          'cta-show',
          'scroll-event'
        ];

        vturbEvents.forEach(eventName => {
          mainPlayer.removeEventListener(eventName, handleVTurbScrollEvent, { capture: true } as any);
        });
      }

      // Remove os listeners globais
      vturbGlobalEvents.forEach(eventName => {
        window.removeEventListener(eventName, handleVTurbScrollEvent, true);
      });

      // Remove todos os listeners de interceptScroll
      const scrollEvents = document.querySelectorAll('[data-scroll-intercepted]');
      scrollEvents.forEach((el) => {
        el.removeEventListener('click', interceptScroll, true);
        el.removeAttribute('data-scroll-intercepted');
      });

      console.log('%c✅ TODOS OS BLOQUEADORES REMOVIDOS - PÁGINA COMPLETAMENTE LIVRE!', 'color: #00ff00; font-weight: bold; font-size: 16px');
    };

    // Adiciona listener para o evento customizado
    window.addEventListener('content-revealed', removeAllBlockers, { once: true });

    // Cleanup
    return () => {
      console.log('%c🧹 Limpando listeners e intervals...', 'color: #ff9900');

      // Remove o listener do evento customizado
      window.removeEventListener('content-revealed', removeAllBlockers);

      // Limpa tudo (caso o componente seja desmontado antes da revelação)
      cancelAnimationFrame(rafId);
      window.removeEventListener('wheel', markUserInteraction);
      window.removeEventListener('touchstart', markUserInteraction);
      window.removeEventListener('touchmove', markUserInteraction);
      window.removeEventListener('mousedown', markUserInteraction);
      window.removeEventListener('scroll', markScrollEvent);
      clearInterval(playerCheckInterval);
      observer.disconnect();
      scrollObserver.disconnect();
      playerObserver.disconnect();

      // Remove do mainPlayer se existir
      const mainPlayer = document.getElementById('vid-69124ec0b910e6e322c32a69');
      if (mainPlayer) {
        const vturbEvents = [
          'smartplayer-scroll-event',
          'smartplayer:video:ended',
          'smartplayer:cta:show',
          'smartplayer:scroll',
          'smartplayer-cta-show',
          'cta-show',
          'scroll-event'
        ];

        vturbEvents.forEach(eventName => {
          mainPlayer.removeEventListener(eventName, handleVTurbScrollEvent, { capture: true } as any);
        });
      }

      // Remove os listeners globais
      vturbGlobalEvents.forEach(eventName => {
        window.removeEventListener(eventName, handleVTurbScrollEvent, true);
      });
    };
  }, []);

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
      {/* 🔧 DEBUG: Botão de teste para forçar reveal */}
      {isDevelopment && (
        <div style={{ position: 'fixed', top: '10px', right: '10px', zIndex: 9999, display: 'flex', gap: '10px' }}>
          <button
            onClick={() => {
              console.log('🧪 Teste manual: Forçando reveal do conteúdo');
              handleVideoPitchReached();
            }}
            style={{
              padding: '10px 20px',
              background: '#00ff00',
              color: '#000',
              border: 'none',
              borderRadius: '5px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            🧪 TESTAR REVEAL
          </button>
          <div style={{
            padding: '10px',
            background: showRestOfContent ? '#00ff00' : '#ff0000',
            color: '#000',
            borderRadius: '5px',
            fontWeight: 'bold'
          }}>
            {showRestOfContent ? '✅ VISÍVEL' : '❌ OCULTO'}
          </div>
        </div>
      )}

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

          {/* 🔧 CORREÇÃO: Botão invisível removido - não precisa da classe de scroll */}
          <div
            style={{
              position: 'absolute',
              bottom: '-50px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '1px',
              height: '1px',
              opacity: 0,
              pointerEvents: 'none'
            }}
            aria-hidden="true"
          />
        </div>
      </section>

      {/* 🔧 CORREÇÃO 2: Section SEMPRE no DOM, controle via visibility ao invés de display */}
      <section
        ref={offersRef}
        className="py-8 md:py-20 px-4 bg-white transition-all duration-500"
        style={{
          maxHeight: showRestOfContent ? '10000px' : '0',
          overflow: showRestOfContent ? 'visible' : 'hidden',
          opacity: showRestOfContent ? 1 : 0,
          visibility: showRestOfContent ? 'visible' : 'hidden',
          pointerEvents: showRestOfContent ? 'auto' : 'none'
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
                {/* 🔧 CORREÇÃO 2: Botão SEMPRE no DOM com visibility */}
                <button
                  ref={sixBottleButtonRef}
                  id="six-bottle-button"
                  data-scroll-target="offers"
                  onClick={() => window.location.href = 'https://pay.erectosbrutallis.com/checkout/197875571:1'}
                  className="smartplayer-scroll-event w-full max-w-md mx-auto bg-[#FFD600] text-gray-900 py-3 md:py-6 rounded-full font-bold hover:bg-[#FFC400] transition-all shadow-lg text-base md:text-2xl mb-3 md:mb-6"
                  style={{
                    visibility: showPurchaseButton ? 'visible' : 'hidden',
                    pointerEvents: showPurchaseButton ? 'auto' : 'none'
                  }}
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

      {/* Experts Section */}
      <section className="py-8 md:py-20 px-4 bg-gradient-to-b from-white to-gray-50" style={{ display: showRestOfContent ? 'block' : 'none' }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-5xl font-bold text-center text-gray-900 mb-6 md:mb-16 px-2">
            Approved by Leading Men's Health Specialists
          </h2>

          <div className="relative px-8 md:px-0">
            <div className="bg-white rounded-[20px] shadow-xl p-6 md:p-12">
              <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12">
                <div className="w-full md:w-1/2 flex-shrink-0">
                  <div className="relative w-full rounded-[15px] overflow-hidden shadow-lg cursor-pointer group" style={{ display: currentExpert === 0 ? 'block' : 'none' }} onClick={() => toggleExpertVideo(0)}>
                    <div style={{ position: 'relative', width: '100%', paddingBottom: '56.25%' }}>
                      <vturb-smartplayer id="vid-69124f9036636797770589e5" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} preload="metadata"></vturb-smartplayer>
                    </div>
                    {!expertVideosPlaying[0] && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-opacity group-hover:bg-black/30" style={{ pointerEvents: 'none' }}>
                        <div className="w-16 h-16 md:w-20 md:h-20 bg-[#B80000] rounded-full flex items-center justify-center hover:bg-[#900000] transition-all hover:scale-110 shadow-xl">
                          <Play className="w-8 h-8 md:w-10 md:h-10 text-white ml-1" fill="white" />
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="relative w-full rounded-[15px] overflow-hidden shadow-lg cursor-pointer group" style={{ display: currentExpert === 1 ? 'block' : 'none' }} onClick={() => toggleExpertVideo(1)}>
                    <div style={{ position: 'relative', width: '100%', paddingBottom: '56.25%' }}>
                      <vturb-smartplayer id="vid-69124f9a3663679777058a0c" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} preload="metadata"></vturb-smartplayer>
                    </div>
                    {!expertVideosPlaying[1] && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-opacity group-hover:bg-black/30" style={{ pointerEvents: 'none' }}>
                        <div className="w-16 h-16 md:w-20 md:h-20 bg-[#B80000] rounded-full flex items-center justify-center hover:bg-[#900000] transition-all hover:scale-110 shadow-xl">
                          <Play className="w-8 h-8 md:w-10 md:h-10 text-white ml-1" fill="white" />
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="relative w-full rounded-[15px] overflow-hidden shadow-lg cursor-pointer group" style={{ display: currentExpert === 2 ? 'block' : 'none' }} onClick={() => toggleExpertVideo(2)}>
                    <div style={{ position: 'relative', width: '100%', paddingBottom: '56.25%' }}>
                      <vturb-smartplayer id="vid-69124f958af45b5e1aef9024" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} preload="metadata"></vturb-smartplayer>
                    </div>
                    {!expertVideosPlaying[2] && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-opacity group-hover:bg-black/30" style={{ pointerEvents: 'none' }}>
                        <div className="w-16 h-16 md:w-20 md:h-20 bg-[#B80000] rounded-full flex items-center justify-center hover:bg-[#900000] transition-all hover:scale-110 shadow-xl">
                          <Play className="w-8 h-8 md:w-10 md:h-10 text-white ml-1" fill="white" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex-1 text-center md:text-left">
                  <div className="flex flex-col md:flex-row items-center md:items-start gap-4 mb-6">
                    <img
                      src={experts[currentExpert].photo}
                      alt={experts[currentExpert].name}
                      className="w-20 h-20 rounded-full object-cover border-4 border-blue-100"
                    />
                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold text-[#2B5FAC] mb-1">
                        {experts[currentExpert].name}
                      </h3>
                      <p className="text-base md:text-lg text-[#2B5FAC] font-semibold mb-1">
                        {experts[currentExpert].title}
                      </p>
                      <p className="text-sm md:text-base text-[#2B5FAC]">
                        {experts[currentExpert].institution}
                      </p>
                      <div className="inline-flex items-center gap-2 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full mt-2">
                        <CheckCircle className="w-4 h-4" />
                        MD VERIFIED
                      </div>
                    </div>
                  </div>

                  <blockquote className="text-lg md:text-xl text-[#2B5FAC] italic leading-relaxed">
                    "{experts[currentExpert].quote}"
                  </blockquote>
                </div>
              </div>
            </div>

            <button
              onClick={prevExpert}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 md:p-3 shadow-lg hover:bg-gray-100 transition-all"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-gray-700" />
            </button>
            <button
              onClick={nextExpert}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 md:p-3 shadow-lg hover:bg-gray-100 transition-all"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-gray-700" />
            </button>
          </div>

          <div className="flex justify-center gap-2 mt-8">
            {experts.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentExpert(index)}
                className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all ${
                  index === currentExpert ? 'bg-[#B80000] w-6 md:w-8' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-8 md:py-20 px-4 bg-white" style={{ display: showRestOfContent ? 'block' : 'none' }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-5xl font-bold text-center text-gray-900 mb-3 px-2">
            Real Men. Real Results.
          </h2>
          <div className="flex justify-center gap-1 mb-6 md:mb-16">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 md:w-8 md:h-8 text-yellow-400 fill-yellow-400" />
            ))}
          </div>

          <div className="relative px-8 md:px-0">
            <div className="flex flex-col items-center text-center">
              <div className="relative w-full max-w-xs aspect-[9/16] rounded-[15px] overflow-hidden mb-3">
                {testimonials.map((testimonial, index) => (
                  <div
                    key={testimonial.videoId}
                    style={{ display: index === currentTestimonial ? 'block' : 'none' }}
                  >
                    <vturb-smartplayer
                      id={testimonial.videoId}
                      style={{ display: 'block', margin: '0 auto', width: '100%', maxWidth: '400px' }}
                      preload="metadata"
                    ></vturb-smartplayer>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 md:p-3 shadow-lg hover:bg-gray-100 transition-all"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-gray-700" />
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 md:p-3 shadow-lg hover:bg-gray-100 transition-all"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-gray-700" />
            </button>
          </div>

          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all ${
                  index === currentTestimonial ? 'bg-[#B80000] w-6 md:w-8' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          <div className="text-center mt-6 md:mt-12">
            <button onClick={scrollToOffers} className="bg-[#B80000] text-white px-8 md:px-12 py-4 md:py-5 rounded-full text-base md:text-xl font-semibold hover:bg-[#900000] transition-all hover:scale-105 shadow-lg">
              I'm Ready to Be the Next Success Story!
            </button>
          </div>
        </div>
      </section>

      {/* Media Section */}
      <section className="py-8 md:py-20 px-4 bg-gradient-to-b from-white to-gray-50" style={{ display: showRestOfContent ? 'block' : 'none' }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-5xl font-bold text-center text-gray-900 mb-6 md:mb-16 px-2">
            Featured in Top Men's Health Outlets
          </h2>

          <div
            className="relative h-[400px] mb-3"
            style={{ perspective: '800px', touchAction: 'manipulation' }}
            onMouseDown={handleDragStart}
            onMouseMove={handleDragMove}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
            onTouchStart={handleDragStart}
            onTouchMove={handleDragMove}
            onTouchEnd={handleDragEnd}
          >
            {mediaLogos.map((media, index) => (
              <div
                key={index}
                className="absolute inset-0 flex items-center justify-center select-none"
                style={{
                  ...getCardStyle(index),
                  transition: dragStart === null ? '0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 'none',
                }}
              >
                <div className={`bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 border-2 ${media.borderColor} ${media.bgColor} hover:shadow-lg transition-all duration-300 max-w-md w-full mx-4 shadow-lg ${media.ringColor ? `ring-2 ${media.ringColor}` : ''}`}>
                  <div className="flex items-center justify-center mb-4">
                    <img
                      src={media.logo}
                      alt="News Source"
                      className="h-8 sm:h-10 w-auto object-contain"
                      draggable="false"
                    />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3 leading-tight">
                    {media.headline}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">
                    {media.description}
                  </p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedArticle(media);
                    }}
                    className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold py-4 px-4 rounded-xl transition-colors text-sm"
                    style={{
                      WebkitTapHighlightColor: 'transparent',
                      touchAction: 'manipulation',
                      minHeight: '44px',
                      position: 'relative',
                      zIndex: 30,
                    }}
                  >
                    Read Full Article
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-2 mt-8">
            {mediaLogos.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentMedia(index)}
                className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all ${
                  index === currentMedia ? 'bg-[#B80000] w-6 md:w-8' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Science & Manufacturing Section */}
      <section className="py-8 md:py-20 px-4 bg-white" style={{ display: showRestOfContent ? 'block' : 'none' }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-5xl font-bold text-center text-gray-900 mb-3 md:mb-8 px-2">
            Where Science Meets Strength.
          </h2>
          <p className="text-sm md:text-xl text-gray-600 text-center max-w-3xl mx-auto mb-6 md:mb-16 px-4">
            Manufactured in GMP-certified facilities and lab-tested for purity, potency, and safety.
          </p>

          <div className="relative">
            <div className="rounded-[20px] overflow-hidden shadow-2xl">
              <img
                src={labImages[currentLab]}
                alt="Manufacturing Facility"
                className="w-full h-48 md:h-96 object-cover"
              />
            </div>

            <button
              onClick={prevLab}
              className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 md:p-3 shadow-lg hover:bg-gray-100 transition-all"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-gray-700" />
            </button>
            <button
              onClick={nextLab}
              className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 md:p-3 shadow-lg hover:bg-gray-100 transition-all"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-gray-700" />
            </button>
          </div>

          <div className="flex justify-center gap-2 mt-8">
            {labImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentLab(index)}
                className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all ${
                  index === currentLab ? 'bg-[#B80000] w-6 md:w-8' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          <div className="flex flex-row justify-center items-start gap-6 md:gap-12 mt-8 md:mt-12">
            <div className="flex flex-col items-center">
              <img src="https://i.postimg.cc/SKBrMRnY/trustpilot-logo-1024x443.webp" alt="Trustpilot" className="h-12 md:h-20 w-auto mb-3 md:mb-4" />
              <div className="text-center">
                <div className="text-3xl md:text-5xl font-bold text-[#1E293B] mb-1">4.7</div>
                <div className="text-xs md:text-base text-[#64748B] font-semibold mb-2">Excellent</div>
                <img src="/stars-4.5.svg" alt="4.5 stars" className="h-4 md:h-5 w-auto mx-auto mb-1" />
                <div className="text-[10px] md:text-sm text-[#64748B]">1,247 reviews</div>
              </div>
            </div>
            <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg">
              <div className="space-y-1.5 md:space-y-2">
                <div className="flex items-center gap-2 md:gap-3">
                  <span className="text-[10px] md:text-sm text-[#1E293B] w-10 md:w-12">5-star</span>
                  <div className="flex-1 h-1.5 md:h-2 bg-gray-200 rounded-full overflow-hidden" style={{width: '120px', maxWidth: '200px'}}>
                    <div className="h-full bg-[#00B67A]" style={{width: '85%'}}></div>
                  </div>
                </div>
                <div className="flex items-center gap-2 md:gap-3">
                  <span className="text-[10px] md:text-sm text-[#1E293B] w-10 md:w-12">4-star</span>
                  <div className="flex-1 h-1.5 md:h-2 bg-gray-200 rounded-full overflow-hidden" style={{width: '120px', maxWidth: '200px'}}>
                    <div className="h-full bg-[#73CF11]" style={{width: '10%'}}></div>
                  </div>
                </div>
                <div className="flex items-center gap-2 md:gap-3">
                  <span className="text-[10px] md:text-sm text-[#1E293B] w-10 md:w-12">3-star</span>
                  <div className="flex-1 h-1.5 md:h-2 bg-gray-200 rounded-full overflow-hidden" style={{width: '120px', maxWidth: '200px'}}>
                    <div className="h-full bg-[#FFCE00]" style={{width: '3%'}}></div>
                  </div>
                </div>
                <div className="flex items-center gap-2 md:gap-3">
                  <span className="text-[10px] md:text-sm text-[#1E293B] w-10 md:w-12">2-star</span>
                  <div className="flex-1 h-1.5 md:h-2 bg-gray-200 rounded-full overflow-hidden" style={{width: '120px', maxWidth: '200px'}}>
                    <div className="h-full bg-[#FF8622]" style={{width: '1%'}}></div>
                  </div>
                </div>
                <div className="flex items-center gap-2 md:gap-3">
                  <span className="text-[10px] md:text-sm text-[#1E293B] w-10 md:w-12">1-star</span>
                  <div className="flex-1 h-1.5 md:h-2 bg-gray-200 rounded-full overflow-hidden" style={{width: '120px', maxWidth: '200px'}}>
                    <div className="h-full bg-[#FF3722]" style={{width: '1%'}}></div>
                  </div>
                </div>
              </div>
              <div className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-gray-200 text-center">
                <button onClick={() => setShowTrustScorePopup(true)} className="text-[10px] md:text-sm text-[#64748B] hover:text-[#2B5FAC] transition-colors underline">How is the TrustScore calculated?</button>
              </div>
            </div>
          </div>

          <div className="text-center mt-6">
            <button
              onClick={() => setShowReviews(!showReviews)}
              className="inline-flex items-center gap-2 text-[#00B67A] hover:text-[#00A06A] transition-colors font-semibold text-sm md:text-base group"
            >
              <span>{showReviews ? 'Hide reviews' : 'See what customers are saying'}</span>
              <ChevronDown className={`w-5 h-5 transition-transform ${showReviews ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {showReviews && (
            <div className="transition-all duration-500 overflow-hidden max-h-[5000px] opacity-100 mt-8">
              <div className="max-w-4xl mx-auto space-y-0 divide-y divide-gray-100">
                {/* Review 1 - Marco Rossi */}
                <div className="bg-white p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#FFE4E9] flex items-center justify-center text-[#191919] font-bold text-sm flex-shrink-0">MR</div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-bold text-[#191919] text-sm">Marco Rossi</h4>
                          <p className="text-xs text-[#6B7280]">IT · 1 review</p>
                        </div>
                        <p className="text-xs text-[#6B7280]">Jun 17, 2024</p>
                      </div>
                      <div className="mb-3">
                        <img src="/stars-4.5.svg" alt="5 stars" className="h-5 w-auto" />
                      </div>
                      <h5 className="font-bold text-[#191919] mb-2 text-sm">Completely impressed with the results...</h5>
                      <p className="text-[#191919] text-xs leading-relaxed mb-4">I'm completely impressed by the results of Erectos Brutallis. I started noticing a significant improvement after just 2 weeks. Super simple service, fast delivery and phenomenal results. Highly recommend!</p>
                      <div className="flex gap-2 mb-4">
                        <span className="inline-block bg-[#F3F4F6] text-[#6B7280] text-xs px-3 py-1 rounded">Jun 17, 2024</span>
                        <span className="inline-block bg-[#F3F4F6] text-[#6B7280] text-xs px-3 py-1 rounded">Unprompted review</span>
                      </div>
                      <div className="flex gap-4 text-xs text-[#6B7280] mb-4">
                        <button className="flex items-center gap-2 hover:text-[#191919]">
                          <ThumbsUp className="w-4 h-4" /> Useful
                        </button>
                        <button className="flex items-center gap-2 hover:text-[#191919]">
                          <Share2 className="w-4 h-4" /> Share
                        </button>
                        <button className="hover:text-[#191919]">
                          <Flag className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="ml-0 pl-4 border-l-4 border-gray-200 mt-4 rounded-l-2xl">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-full bg-[#2B5FAC] flex items-center justify-center text-white font-bold text-xs flex-shrink-0">R</div>
                          <div className="flex-1">
                            <div className="mb-1">
                              <h5 className="font-bold text-[#191919] text-sm">Reply from Erectos Brutallis</h5>
                              <p className="text-xs text-[#6B7280]">Jun 17, 2024</p>
                            </div>
                            <p className="text-sm text-[#191919] leading-relaxed">We're so happy with your review Marco. Thank you so much! We hope to hear from you again soon. Best regards.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Review 2 - Giuliano Marodin */}
                <div className="bg-white p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#D4F0D4] flex items-center justify-center text-[#191919] font-bold text-sm flex-shrink-0">GM</div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-bold text-[#191919] text-sm">Giuliano Marodin</h4>
                          <p className="text-xs text-[#6B7280]">IT · 2 reviews</p>
                        </div>
                        <p className="text-xs text-[#6B7280]">Jun 15, 2024</p>
                      </div>
                      <div className="mb-3">
                        <img src="/stars-4.5.svg" alt="5 stars" className="h-5 w-auto" />
                      </div>
                      <h5 className="font-bold text-[#191919] mb-2 text-sm">Excellent service and best results</h5>
                      <p className="text-[#191919] text-xs leading-relaxed mb-4">The best results I know and the service is excellent. I use it many times with great satisfaction.</p>
                      <div className="flex gap-2 mb-4">
                        <span className="inline-block bg-[#F3F4F6] text-[#6B7280] text-xs px-3 py-1 rounded">Jun 15, 2024</span>
                        <span className="inline-block bg-[#F3F4F6] text-[#6B7280] text-xs px-3 py-1 rounded">Unprompted review</span>
                      </div>
                      <div className="flex gap-4 text-xs text-[#6B7280] mb-4">
                        <button className="flex items-center gap-2 hover:text-[#191919]">
                          <ThumbsUp className="w-4 h-4" /> Useful
                        </button>
                        <button className="flex items-center gap-2 hover:text-[#191919]">
                          <Share2 className="w-4 h-4" /> Share
                        </button>
                        <button className="hover:text-[#191919]">
                          <Flag className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="ml-0 pl-4 border-l-4 border-gray-200 mt-4 rounded-l-2xl">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-full bg-[#2B5FAC] flex items-center justify-center text-white font-bold text-xs flex-shrink-0">R</div>
                          <div className="flex-1">
                            <div className="mb-1">
                              <h5 className="font-bold text-[#191919] text-sm">Reply from Erectos Brutallis</h5>
                              <p className="text-xs text-[#6B7280]">Jun 15, 2024</p>
                            </div>
                            <p className="text-sm text-[#191919] leading-relaxed">Giuliano, we are very happy and honored to have you as our customer. Thank you for your review and for trusting our platform.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Review 3 - Luca Conti */}
                <div className="bg-white p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#FFE4E9] flex items-center justify-center text-[#191919] font-bold text-sm flex-shrink-0">LC</div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-bold text-[#191919] text-sm">Luca Conti</h4>
                          <p className="text-xs text-[#6B7280]">IT · 1 review</p>
                        </div>
                        <p className="text-xs text-[#6B7280]">Jun 10, 2024</p>
                      </div>
                      <div className="mb-3">
                        <img src="/stars-4.5.svg" alt="5 stars" className="h-5 w-auto" />
                      </div>
                      <h5 className="font-bold text-[#191919] mb-2 text-sm">Finally an effective solution</h5>
                      <p className="text-[#191919] text-xs leading-relaxed mb-4">I tried many products without success. Erectos Brutallis is different - it really works! My results are stronger and more consistent. Highly recommended!</p>
                      <div className="flex gap-2 mb-4">
                        <span className="inline-block bg-[#F3F4F6] text-[#6B7280] text-xs px-3 py-1 rounded">Jun 10, 2024</span>
                        <span className="inline-block bg-[#F3F4F6] text-[#6B7280] text-xs px-3 py-1 rounded">Unprompted review</span>
                      </div>
                      <div className="flex gap-4 text-xs text-[#6B7280]">
                        <button className="flex items-center gap-2 hover:text-[#191919]">
                          <ThumbsUp className="w-4 h-4" /> Useful
                        </button>
                        <button className="flex items-center gap-2 hover:text-[#191919]">
                          <Share2 className="w-4 h-4" /> Share
                        </button>
                        <button className="hover:text-[#191919]">
                          <Flag className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Review 4 - Alessandro Bianchi */}
                <div className="bg-white p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#D4F0D4] flex items-center justify-center text-[#191919] font-bold text-sm flex-shrink-0">AB</div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-bold text-[#191919] text-sm">Alessandro Bianchi</h4>
                          <p className="text-xs text-[#6B7280]">IT · 1 review</p>
                        </div>
                        <p className="text-xs text-[#6B7280]">Jun 5, 2024</p>
                      </div>
                      <div className="mb-3">
                        <img src="/stars-4.5.svg" alt="5 stars" className="h-5 w-auto" />
                      </div>
                      <h5 className="font-bold text-[#191919] mb-2 text-sm">Visible results in a few weeks</h5>
                      <p className="text-[#191919] text-xs leading-relaxed mb-4">Fast shipping and well-packaged product. After 4 weeks of consistent use, I noticed better performance and more confidence. Great product!</p>
                      <div className="flex gap-2 mb-4">
                        <span className="inline-block bg-[#F3F4F6] text-[#6B7280] text-xs px-3 py-1 rounded">Jun 5, 2024</span>
                        <span className="inline-block bg-[#F3F4F6] text-[#6B7280] text-xs px-3 py-1 rounded">Unprompted review</span>
                      </div>
                      <div className="flex gap-4 text-xs text-[#6B7280] mb-4">
                        <button className="flex items-center gap-2 hover:text-[#191919]">
                          <ThumbsUp className="w-4 h-4" /> Useful
                        </button>
                        <button className="flex items-center gap-2 hover:text-[#191919]">
                          <Share2 className="w-4 h-4" /> Share
                        </button>
                        <button className="hover:text-[#191919]">
                          <Flag className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="ml-0 pl-4 border-l-4 border-gray-200 mt-4 rounded-l-2xl">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-full bg-[#2B5FAC] flex items-center justify-center text-white font-bold text-xs flex-shrink-0">R</div>
                          <div className="flex-1">
                            <div className="mb-1">
                              <h5 className="font-bold text-[#191919] text-sm">Reply from Erectos Brutallis</h5>
                              <p className="text-xs text-[#6B7280]">Jun 5, 2024</p>
                            </div>
                            <p className="text-sm text-[#191919] leading-relaxed">Thank you Alessandro for your trust! We're thrilled that you're seeing such positive results. Keep it up!</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Review 5 - Stefano Ferrari */}
                <div className="bg-white p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#FFE4E9] flex items-center justify-center text-[#191919] font-bold text-sm flex-shrink-0">SF</div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-bold text-[#191919] text-sm">Stefano Ferrari</h4>
                          <p className="text-xs text-[#6B7280]">IT · 3 reviews</p>
                        </div>
                        <p className="text-xs text-[#6B7280]">May 28, 2024</p>
                      </div>
                      <div className="mb-3">
                        <img src="/stars-4.5.svg" alt="5 stars" className="h-5 w-auto" />
                      </div>
                      <h5 className="font-bold text-[#191919] mb-2 text-sm">Perfect for my needs</h5>
                      <p className="text-[#191919] text-xs leading-relaxed mb-4">The quality was very impressive. With Erectos Brutallis the results became stronger and more consistent. I'm really excited about the results and use it regularly!</p>
                      <div className="flex gap-2 mb-4">
                        <span className="inline-block bg-[#F3F4F6] text-[#6B7280] text-xs px-3 py-1 rounded">May 28, 2024</span>
                        <span className="inline-block bg-[#F3F4F6] text-[#6B7280] text-xs px-3 py-1 rounded">Unprompted review</span>
                      </div>
                      <div className="flex gap-4 text-xs text-[#6B7280]">
                        <button className="flex items-center gap-2 hover:text-[#191919]">
                          <ThumbsUp className="w-4 h-4" /> Useful
                        </button>
                        <button className="flex items-center gap-2 hover:text-[#191919]">
                          <Share2 className="w-4 h-4" /> Share
                        </button>
                        <button className="hover:text-[#191919]">
                          <Flag className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* TrustScore Popup */}
      {showTrustScorePopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-[fadeIn_0.3s_ease-out]">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl overflow-hidden animate-[slideUp_0.4s_ease-out]">
            <div className="bg-[#FFFBEA] p-8 relative overflow-hidden">
              <button onClick={() => setShowTrustScorePopup(false)} className="absolute top-4 right-4 w-8 h-8 rounded-full border-2 border-[#2B5FAC] text-[#2B5FAC] hover:bg-[#2B5FAC] hover:text-white transition-colors flex items-center justify-center text-xl leading-none z-10">×</button>
              <div className="flex items-center justify-center">
                <div className="relative w-full max-w-[280px] h-20 flex items-center">
                  <div className="absolute left-0 w-full h-1 bg-[#8B6F47] rounded-full"></div>
                  <div className="absolute left-0 w-6 h-6 bg-[#FFD700] rounded-full animate-[slideGrow_2s_ease-in-out_infinite]"></div>
                </div>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-[#1E293B] mb-4">How is the TrustScore calculated?</h3>
              <p className="text-[#64748B] text-sm leading-relaxed mb-6"><strong>Time span</strong> - Newer, recent reviews hold more weight in the TrustScore than older ones – they're a good indication of current customer satisfaction.</p>
              <div className="flex justify-end">
                <button onClick={() => setShowTrustScorePopup(false)} className="bg-[#1E293B] hover:bg-[#2B5FAC] text-white font-semibold px-8 py-3 rounded-full transition-colors">Next</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Final CTA Section */}
      <section className="py-10 md:py-20 px-4 bg-gradient-to-br from-[#B80000] to-[#900000]" style={{ display: showRestOfContent ? 'block' : 'none' }}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-6xl font-bold text-white mb-3 md:mb-6 px-2">
            Your Transformation Starts Today.
          </h2>
          <p className="text-base md:text-2xl text-white/90 mb-6 md:mb-12 font-light px-4">
            Hundreds of men have already experienced the power of Erectos Brutallis — now it's your turn.
          </p>
          <button onClick={scrollToOffers} className="bg-white text-[#B80000] px-8 md:px-12 py-4 md:py-5 rounded-full text-lg md:text-xl font-bold hover:bg-gray-100 transition-all hover:scale-105 shadow-2xl">
            START MY TREATMENT NOW
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-gray-400 py-8 px-4" style={{ display: showRestOfContent ? 'block' : 'none' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <div className="text-2xl font-bold text-white mb-4">Erectos Brutallis</div>
            <div className="flex justify-center gap-6 text-sm mb-6">
              <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
              <span>|</span>
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <span>|</span>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p className="mb-4">Copyright © 2025 | Erectos Brutallis</p>
            <p className="text-gray-500 max-w-4xl mx-auto">
              These statements have not been evaluated by the Food and Drug Administration.
              This product is not intended to diagnose, treat, cure, or prevent any disease.
            </p>
          </div>
        </div>
      </footer>

      {selectedArticle && (
        <ArticleReader
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
        />
      )}

      {showUpsellPopup && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 animate-[fadeIn_0.3s_ease-out]">
          <div className="bg-gradient-to-br from-[#B80000] to-[#900000] rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden animate-[slideUp_0.4s_ease-out] relative">
            <button
              onClick={handleRefuseOffer}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors flex items-center justify-center z-10"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="p-8 md:p-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 mb-8 text-center">
                <div className="flex items-center justify-center gap-2 text-white">
                  <AlertCircle className="w-5 h-5" />
                  <p className="font-semibold">This offer expires in {upsellTimer} seconds</p>
                </div>
                <p className="text-white/90 text-sm mt-2">
                  If no action is taken, you'll be redirected to your original selection
                </p>
              </div>

              <div className="flex justify-center mb-8">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <AlertCircle className="w-10 h-10 text-[#FFD600]" />
                </div>
              </div>

              <h2 className="text-3xl md:text-5xl font-bold text-white text-center mb-8">
                Wait! You're Leaving ${selectedPackage === '3-bottle' ? '96' : '215'} Behind...
              </h2>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-6">
                <p className="text-xl md:text-2xl font-bold text-[#FFD600] text-center mb-4">
                  Choose the 6 Bottle Pack now and save an extra ${selectedPackage === '3-bottle' ? '96' : '215'}!
                </p>
                <p className="text-white text-center leading-relaxed">
                  It's the most popular choice for long-term results — and it includes free shipping + a 180-day guarantee.
                </p>
              </div>

              <button
                onClick={handleAcceptOffer}
                className="w-full bg-[#FFD600] text-gray-900 py-5 rounded-full font-bold text-xl hover:bg-[#FFC400] transition-all hover:scale-105 shadow-xl mb-4"
              >
                GET ${selectedPackage === '3-bottle' ? '96' : '215'} EXTRA DISCOUNT
              </button>

              <button
                onClick={handleRefuseOffer}
                className="w-full bg-white/10 hover:bg-white/20 text-white py-4 rounded-full font-semibold text-lg transition-all mb-4"
              >
                Refuse Offer
              </button>

              <p className="text-white/70 text-sm text-center flex items-center justify-center gap-2">
                <AlertCircle className="w-4 h-4" />
                No action needed – we'll redirect you automatically
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default App;
