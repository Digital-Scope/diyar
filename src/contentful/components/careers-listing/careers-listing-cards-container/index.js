import React from 'react';

import CareersListingCard from '../careers-listing-card';
import './careers-listing-cards-container.scss';

export default ({ jobPosts }) => (
  <div className="careers-listing-cards-container">
    { jobPosts.map(jobPost => <CareersListingCard key={jobPost.id} {...jobPost} />) }
  </div>
);
