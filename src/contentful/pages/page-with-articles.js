import React from 'react';
import PageTransition from 'gatsby-plugin-page-transitions';

import Head from '../../shared/components/head';
import { renderPage } from '../render';
import LatestArticles from '../components/latest-articles/index';
import { generateArticleURL } from '../../shared/helpers/media';
import { createExcerpt } from '../../shared/helpers/misc';
import setLocaleContext from '../../layouts/components/i18n/setLocaleContext';

const PageWithArticles = ({ pathContext, data }) => {
  if (!data.allContentfulPage) {
    console.error('[Page] No page found', pathContext);

    return null;
  }

  let articles = [];
  const pageData = data.allContentfulPage.edges[0].node;

  if (data.allContentfulContentArticle) {
    articles = data.allContentfulContentArticle.edges.map(({ node }) => ({
      ...node,
      articleLink: generateArticleURL(node.displayTitle, pathContext.locale),
      excerpt: createExcerpt(node.body.body, 255),
    }));
  }

  return [
    <Head key="head" data={pageData} context={pathContext} />,
    <PageTransition key="page">
      { renderPage(pageData.components) }
      <LatestArticles articles={articles} />
    </PageTransition>,
  ];
};

export const PageWithArticlesQuery = graphql`
    query PageWithArticlesQuery($route: String, $locale: String, $articleCategory: String) {
        allContentfulPage (
            filter: {
                route: { eq: $route },
                node_locale:{ eq: $locale }
            }
        ) {
            edges {
                node {
                    ...Page
                }
            }
        }
        allContentfulContentArticle (
            limit: 2
            filter: {
              node_locale:{ eq: $locale },
              category: { eq: $articleCategory },
              hidden: { ne: true }
            }
            sort: { fields: [publishDate], order: DESC}
        ) {
            edges {
                node {
                    id
                    body {
                        body
                    }
                    image {
                        sizes(quality: 100, toFormat: JPG) {
                            ...GatsbyContentfulSizes
                        }
                    }
                    youtubeId
                    displayTitle
                    publishDate
                }
            }
        }
    }
`;

export default setLocaleContext()(PageWithArticles);
