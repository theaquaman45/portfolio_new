import { useEffect } from 'react';

const PerformanceOptimizer: React.FC = () => {
  useEffect(() => {
    // Preload critical resources
    const preloadCriticalResources = () => {
      const criticalImages = [
        'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg',
        'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg'
      ];

      criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
      });
    };

    // Optimize font loading
    const optimizeFonts = () => {
      const fontLink = document.createElement('link');
      fontLink.rel = 'preconnect';
      fontLink.href = 'https://fonts.googleapis.com';
      document.head.appendChild(fontLink);

      const fontLink2 = document.createElement('link');
      fontLink2.rel = 'preconnect';
      fontLink2.href = 'https://fonts.gstatic.com';
      fontLink2.crossOrigin = 'anonymous';
      document.head.appendChild(fontLink2);
    };

    // Reduce layout shifts
    const preventLayoutShifts = () => {
      // Add CSS to prevent layout shifts
      const style = document.createElement('style');
      style.textContent = `
        img, video {
          max-width: 100%;
          height: auto;
        }
        
        .aspect-ratio-16-9 {
          aspect-ratio: 16 / 9;
        }
        
        .aspect-ratio-1-1 {
          aspect-ratio: 1 / 1;
        }
      `;
      document.head.appendChild(style);
    };

    // Optimize animations for performance
    const optimizeAnimations = () => {
      // Check if user prefers reduced motion
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      if (prefersReducedMotion) {
        document.documentElement.style.setProperty('--animation-duration', '0.01ms');
      }

      // Use will-change property sparingly
      const animatedElements = document.querySelectorAll('.fade-in, .floating, .hover-lift');
      animatedElements.forEach(el => {
        const element = el as HTMLElement;
        element.style.willChange = 'transform, opacity';
        
        // Remove will-change after animation completes
        element.addEventListener('animationend', () => {
          element.style.willChange = 'auto';
        });
      });
    };

    // Implement virtual scrolling for large lists (if needed)
    const implementVirtualScrolling = () => {
      // This would be implemented for components with large lists
      // For now, we'll just ensure smooth scrolling
      document.documentElement.style.scrollBehavior = 'smooth';
    };

    // Debounce scroll events
    const debounceScrollEvents = () => {
      let scrollTimeout: NodeJS.Timeout;
      
      const handleScroll = () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          // Scroll event handling
          document.body.classList.remove('scrolling');
        }, 150);
        
        document.body.classList.add('scrolling');
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      
      return () => {
        window.removeEventListener('scroll', handleScroll);
        clearTimeout(scrollTimeout);
      };
    };

    // Initialize optimizations
    preloadCriticalResources();
    optimizeFonts();
    preventLayoutShifts();
    optimizeAnimations();
    implementVirtualScrolling();
    const cleanupScroll = debounceScrollEvents();

    // Cleanup
    return () => {
      cleanupScroll();
    };
  }, []);

  return null;
};

export default PerformanceOptimizer;