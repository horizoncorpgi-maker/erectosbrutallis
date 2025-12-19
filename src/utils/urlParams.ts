export function getAllUrlParams(): URLSearchParams {
  return new URLSearchParams(window.location.search);
}

export function getPreservedParams(): URLSearchParams {
  const fromUrl = getAllUrlParams();
  const preserved = new URLSearchParams();

  for (const [key, value] of fromUrl.entries()) {
    if (value) {
      preserved.set(key, value);
    }
  }

  return preserved;
}

export function appendParamsToUrl(url: string): string {
  const params = getPreservedParams();

  if ([...params.keys()].length === 0) {
    return url;
  }

  try {
    const urlObj = new URL(url);

    for (const [key, value] of params.entries()) {
      if (!urlObj.searchParams.has(key)) {
        urlObj.searchParams.set(key, value);
      }
    }

    return urlObj.toString();
  } catch (e) {
    return url;
  }
}

export function getParamsString(): string {
  const params = getPreservedParams();
  const paramsStr = params.toString();
  return paramsStr ? `?${paramsStr}` : '';
}

export function updateCheckoutLinks() {
  const params = getPreservedParams();

  if ([...params.keys()].length === 0) return;

  const checkoutLinks = document.querySelectorAll('a[href*="pay.erectosbrutallis.com"]');

  checkoutLinks.forEach(a => {
    try {
      const url = new URL((a as HTMLAnchorElement).href);
      for (const [k, v] of params.entries()) {
        if (!url.searchParams.has(k)) url.searchParams.set(k, v);
      }
      (a as HTMLAnchorElement).href = url.toString();
    } catch(e) {
      console.error('Error updating checkout link:', e);
    }
  });
}
