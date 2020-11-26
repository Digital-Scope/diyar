/* eslint-disable no-underscore-dangle, react/no-danger */

import React, { Component } from 'react';
import PageTransition from 'gatsby-plugin-page-transitions';
import setLocaleContext from '../layouts/components/i18n/setLocaleContext';

import Head from '../shared/components/head';
import MediaHelpers from '../shared/helpers/media';
import { createExcerpt } from '../shared/helpers/misc';

import MediaCenter from '../contentful/components/media-center';

class MediaCenterPage extends Component {
  render() {
    const { data, pathContext, pathContext: { translation } } = this.props;
    const news = data.allContentfulContentNews ?
      data.allContentfulContentNews.edges.map(edge => ({
        ...edge.node,
        mediaType: 'news',
        url: MediaHelpers.generateNewsURL(edge.node.displayTitle, pathContext.locale),
        excerpt: createExcerpt(edge.node.body.body, 80),
      })) : [];

    const articles = data.allContentfulContentArticle ?
      data.allContentfulContentArticle.edges.map(edge => ({
        ...edge.node,
        mediaType: 'articles',
        url: MediaHelpers.generateArticleURL(edge.node.displayTitle, pathContext.locale),
        excerpt: createExcerpt(edge.node.body.body, 80),
      })) : [];

    return [
      <Head
        data={{
          displayTitle: translation.mediaCenter.pageTitle,
          description: translation.mediaCenter.pageDescription,
        }}
        context={pathContext}
      />,
      <PageTransition key="page">
        <MediaCenter
          news={news}
          articles={articles}
        />
      </PageTransition>,
    ];
  }
}


export const MediaCenterQuery = graphql`
  query MediaCenterQuery ($locale: String = "en") {
    allContentfulContentArticle (
      filter: { node_locale: { eq: $locale }, hidden: { ne: true } }
      sort: { fields: [publishDate], order: DESC}
    ) {
      edges {
        node {
          image {
            sizes(quality: 100, toFormat: JPG) {
              ...GatsbyContentfulSizes
            }
          }
          body {
            body
          }
          id
          displayTitle
          publishDate
          youtubeId
          category
        }
      }
    }
    allContentfulContentNews (
      filter: { node_locale: { eq: $locale }, hidden: { ne: true } }
      sort: { fields: [publishDate], order: DESC}
    ) {
      edges {
        node {
          image {
            sizes(quality: 100, toFormat: JPG) {
              ...GatsbyContentfulSizes
            }
          }
          body {
            body
          }
          id
          displayTitle
          publishDate
          youtubeId
          category
        }
      }
    }
  }
`;

export default setLocaleContext()(MediaCenterPage);
