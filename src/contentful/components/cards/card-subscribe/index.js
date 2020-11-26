import React from 'react';

import SubscribeForm from '../../../../shared/components/subscription-form';
import CardBackground from '../background';
import './card-subscribe.scss';

export default ({ data }) => (
  <CardBackground secondary>
    <div className="card-subscribe">
      <div className="card-subscribe-title">{ data.displayTitle }</div>
      <div className="card-subscribe-description">{ data.description.description }</div>
      <div className="card-subscribe-form"><SubscribeForm subscriptionId={data.subscription.subscriptionId} /></div>
    </div>
  </CardBackground>
);

// export const fragment = graphql`
export const fragment = `
  fragment ContentfulComponentCardSubscribeFragment on ContentfulComponentCardSubscribe {
    id
    displayTitle
    description {
      description
    }
    subscription {
      subscriptionId
    }
  }
`;
