import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function CanonicalLink() {
  const location = useLocation();

  useEffect(() => {
    const baseUrl = 'https://undetecta.vercel.app';
    let path = location.pathname;
    
    // Remove trailing slash if it's not the root path
    if (path.length > 1 && path.endsWith('/')) {
      path = path.slice(0, -1);
    }
    
    const canonicalUrl = `${baseUrl}${path}`;

    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      document.head.appendChild(canonicalLink);
    }
    
    canonicalLink.href = canonicalUrl;
  }, [location.pathname]);

  return null;
}
