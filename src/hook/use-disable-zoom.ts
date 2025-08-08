'use client';

import { useEffect } from 'react';

export default function useDisableZoom() {
  useEffect(() => {

    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
    
    const isSmallScreen = window.innerWidth <= 768;
    
    if (isMobile || isSmallScreen) {
    
      let viewportMeta = document.querySelector('meta[name="viewport"]');
      
      if (viewportMeta) {
        viewportMeta.setAttribute(
          'content', 
          'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover'
        );
      } else {
        viewportMeta = document.createElement('meta') ;
         viewportMeta.setAttribute('name', 'viewport')
         viewportMeta.setAttribute(
          'content', 
          'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover'
        );
        document.head.appendChild(viewportMeta);
      }
    } else {
     
      const viewportMeta = document.querySelector('meta[name="viewport"]');
      
      if (viewportMeta) {
        viewportMeta.setAttribute(
          'content', 
          'width=device-width, initial-scale=1.0'
        );
      }
    }
  }, []);

  return null; // This component doesn't render anything
}