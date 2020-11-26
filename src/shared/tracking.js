/* global gtag */

export const GOOGLE_ADS_ID = 'AW-965926264';

function safeTracking(func) {
  return (...args) => {
    if (typeof window === 'undefined' && !gtag) {
      return;
    }

    window.dataLayer = window.dataLayer || [];
    func(...args);
  };
}

const events = {
  formsubmission: safeTracking((parameters) => {
    // Google Tag Manager event
    window.dataLayer.push({ event: 'formsubmission', ...parameters });
  }),
  conversion: safeTracking(() => {
    // Google Ads event
    gtag('event', 'conversion', { send_to: `${GOOGLE_ADS_ID}/0gU7CKuBs58BEPi6y8wD` });
  }),
};

export default {
  events,
};
