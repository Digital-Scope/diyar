import React from 'react';
import PageTransition from 'gatsby-plugin-page-transitions';
import { Redirect, withRouter } from 'react-router';
import setLocaleContext from '../../layouts/components/i18n/setLocaleContext';
import Head from '../../shared/components/head';
import MediaDetails from '../components/media-details';

const ArticleDetailsPage = ({ pathContext, data, location, pathContext: { translation: t } }) => {
  if (!data.allContentfulContentArticle) {
    console.error('[Page] No article found', pathContext);

    return null;
  }

  const articleData = data.allContentfulContentArticle.edges[0].node;
  return [
    <Head key="head" data={articleData} context={pathContext} />,
    <PageTransition key="page">
      {pathContext.fromPath === location.pathname && <Redirect to={pathContext.toPath} />}
      <MediaDetails mainTitle={t.mediaCenter.title} {...articleData} />
    </PageTransition>,
  ];
};

export const ArticleQuery = graphql`
  query ArticleQuery($locale: String, $displayTitle: String) {
    allContentfulContentArticle(
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
            youtubeId
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

export default withRouter(setLocaleContext()(ArticleDetailsPage));
