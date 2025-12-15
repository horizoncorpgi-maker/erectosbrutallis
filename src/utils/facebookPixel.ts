declare global {
  interface Window {
    fbq: any;
    _fbq: any;
  }
}

const PIXEL_ID = import.meta.env.VITE_FACEBOOK_PIXEL_ID;
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;

export const initFacebookPixel = () => {
  if (typeof window === 'undefined' || !PIXEL_ID) return;

  if (window.fbq) return;

  const script = document.createElement('script');
  script.innerHTML = `
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '${PIXEL_ID}');
  `;
  document.head.appendChild(script);

  const noscript = document.createElement('noscript');
  noscript.innerHTML = `<img height="1" width="1" style="display:none"
    src="https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1" />`;
  document.body.appendChild(noscript);
};

export const getCookieValue = (name: string): string => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || '';
  return '';
};

export const getEventId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

interface EventData {
  event_name: string;
  event_id?: string;
  event_source_url?: string;
  user_data?: {
    email?: string;
    phone?: string;
    fbp?: string;
    fbc?: string;
    external_id?: string;
  };
  custom_data?: {
    content_name?: string;
    content_category?: string;
    content_ids?: string[];
    currency?: string;
    value?: number;
  };
}

export const trackEvent = async (
  eventName: string,
  customData: any = {},
  userData: any = {}
) => {
  const eventId = getEventId();
  const fbp = getCookieValue('_fbp');
  const fbc = getCookieValue('_fbc') || (window.location.search.includes('fbclid')
    ? `fb.1.${Date.now()}.${new URLSearchParams(window.location.search).get('fbclid')}`
    : '');

  if (window.fbq) {
    window.fbq('track', eventName, customData, {
      eventID: eventId
    });
  }

  const eventData: EventData = {
    event_name: eventName,
    event_id: eventId,
    event_source_url: window.location.href,
    user_data: {
      fbp,
      fbc,
      ...userData
    },
    custom_data: Object.keys(customData).length > 0 ? customData : undefined
  };

  try {
    const response = await fetch(`${SUPABASE_URL}/functions/v1/facebook-conversions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventData),
    });

    const result = await response.json();

    if (!result.success) {
      console.error('Facebook CAPI Error:', result.error);
    }

    return result;
  } catch (error) {
    console.error('Error sending event to Facebook CAPI:', error);
    return { success: false, error };
  }
};

export const trackPageView = () => {
  trackEvent('PageView');
};

export const trackViewContent = (contentData?: {
  content_name?: string;
  content_category?: string;
  content_ids?: string[];
  value?: number;
  currency?: string;
}) => {
  trackEvent('ViewContent', contentData);
};
