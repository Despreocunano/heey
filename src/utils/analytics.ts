declare global {
    interface Window {
      gtag: (command: string, eventName: string, eventParams?: object) => void;
    }
  }
  
  export function sendGA4Event(eventName: string, banco: string, tarjeta: string): void {
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', eventName, {
        event_category: 'Tarjeta de Crédito',
        event_label: 'Solicitar tarjeta',
        banco: banco,
        tarjeta: tarjeta
      });
    } else {
      console.warn('Google Analytics not loaded');
    }
  }
  
  