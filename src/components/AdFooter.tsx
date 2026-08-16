import { useEffect, useRef } from 'react';

export function AdFooter() {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Some ad networks require the script to be placed right next to or inside the container.
    if (adRef.current && !adRef.current.querySelector('script')) {
      const script = document.createElement('script');
      script.async = true;
      script.setAttribute('data-cfasync', 'false');
      script.src = 'https://pl30421954.effectivecpmnetwork.com/6df276ec5b52ecff2fa911b34ee8c244/invoke.js';
      
      // Insert the script into the DOM right before the container div
      adRef.current.appendChild(script);
    }
  }, []);

  return (
    <footer className="mt-12 mb-8 flex flex-col items-center justify-center w-full">
      <div ref={adRef} className="w-full flex flex-col items-center justify-center min-h-[90px]">
        <div id="container-6df276ec5b52ecff2fa911b34ee8c244" className="w-full flex justify-center"></div>
      </div>
    </footer>
  );
}
