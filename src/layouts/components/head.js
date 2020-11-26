import React from 'react';
import Helmet from 'react-helmet';

import { GOOGLE_ADS_ID } from '../../shared/tracking';

/*
  We are adding the gtag function to send a conversion event to the client's Google Ads account.
  The trigger is when a user submits a contact us form request.
  See src/contentful/components/contact-us/contact-us-form/contact-us-form-fields/index.js
  and src/shared/tracking.js

  Note that we also have Google Analytics and Google Tag Manager setup in gatsby-config.js
  but this is on Prototypes account, not the clients.
  This is why we need to add this specific id for the clients Google Ads account
 */

export default () => (
  <Helmet>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png?v=2" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png?v=2" />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png?v=2" />
    <link rel="manifest" href="/site.webmanifest" />
    <link rel="mask-icon" href="/safari-pinned-tab.svg?v=2" color="#ee3123" />
    <meta name="apple-mobile-web-app-title" content="Diyar Al Muharraq" />
    <meta name="application-name" content="Diyar Al Muharraq" />
    <meta name="msapplication-TileColor" content="#ffffff" />
    <meta name="theme-color" content="#ffffff" />

    <script async src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`} />
    <script>{`
      window.dataLayer = window.dataLayer || [];
      function gtag() {
        dataLayer.push(arguments);
      };

      gtag('js', new Date());
      gtag('config', '${GOOGLE_ADS_ID}');
    `}</script>

    <script type="text/javascript" src="https://analytics.clickdimensions.com/ts.js" />
    <script type="text/javascript">{`
      var cdAnalytics = new clickdimensions.Analytics('analytics.clickdimensions.com');
      cdAnalytics.setAccountKey('ayxSQSAeB1UGQcEI1OC7RJ');
      cdAnalytics.setDomain('diyar.bh');
      cdAnalytics.setScore(typeof(cdScore) == "undefined" ? 0 : (cdScore == 0 ? null : cdScore));
      cdAnalytics.trackPage();
    `}
    </script>
    <script>{`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js&#39;);
          fbq('init', '713871096047034');
          fbq('track', 'PageView');
          `}
    </script>

    <noscript>{'<img height="1" width="1" alt="Facebook Pixel" style="display:none" src="https://www.facebook.com/tr?id=713871096047034&ev=PageView&noscript=1" />'}</noscript>
  </Helmet>
);
