import React from 'react';
import PageTransition from 'gatsby-plugin-page-transitions';
import { Redirect, withRouter } from 'react-router';
import setLocaleContext from '../../layouts/components/i18n/setLocaleContext';

import Head from '../../shared/components/head';
import MediaDetails from '../components/media-details';

const NewsDetailsPage = ({ pathContext, data, location, pathContext: { translation: t } }) => {
  if (!data.allContentfulContentNews) {
    console.error('[Page] No news found', pathContext);

    return null;
  }

  const newsData = data.allContentfulContentNews.edges[0].node;
  return [
    <Head key="head" data={newsData} context={pathContext} />,
    <PageTransition key="page">
      {pathContext.fromPath === location.pathname && <Redirect to={pathContext.toPath} />}
      <MediaDetails mainTitle={t.mediaCenter.title} {...newsData} />
    </PageTransition>,
  ];
};

export const NewsQuery = graphql`
  query NewsQuery($locale: String, $displayTitle: String) {
    allContentfulContentNews(
      filter: {
        node_locale: { eq: $locale }
        displayTitle: { eq: $displayTitle }
      }
    ) {
      edges {
        node {
            id
            displayTitle
            description {
                description
            }
            body {
                childMarkdownRemark {
                    html
                }
            }
            publishDate
            image {
                sizes(quality: 100, toFormat: JPG) {
                    ...GatsbyContentfulSizes
                }
            }
        }
      }
    }
  }
`;

export default withRouter(setLocaleContext()(NewsDetailsPage));
