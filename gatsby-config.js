const postcssRtl = require('postcss-rtl');
const pixrem = require('pixrem');
const autoprefixer = require('autoprefixer');
const postcssMediaMinmax = require('postcss-media-minmax');
const postcssCustomMedia = require('postcss-custom-media');

const careersHelper = require('./src/shared/helpers/careers');
const mediaHelper = require('./src/shared/helpers/media');
const getRawPageTitle = require('./src/shared/helpers/page').getRawPageTitle;
const { getRobotsPolicy } = require('./src/shared/helpers/get-robots-policy');
const path = require('path');

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

const ignoredTypes = [
  'ContentfulComponentFooter',
  'ContentfulComponentHeader',
  'ContentfulComponentNavigation',
  'ContentfulComponentNavigationItem',
  'ContentfulComponentGoogleMapsStreetviewLinkLinkTextNode',
  'ContentfulLatestArticles',
  'ContentfulArticleCategory',
  // the following types are ignored because they are indexed explicitly
  'ContentfulContentArticle',
  'ContentfulContentNews',
  'ContentfulContentJobPost',
  'ContentfulPage',
];

const pushPropertyContent = ({ content }, property) => {
  if (typeof property === 'string' && content.indexOf(property) < 0) {
    content.push(property);
  }
};

const pushIndexableFieldValues = ({ content, componentIdsHash, componentIdsList }, component) => {
  if (!component || ignoredTypes.indexOf(component.internal.type) >= 0) {
    return;
  }

  const state = { content, componentIdsHash, componentIdsList };

  pushPropertyContent(state, component.displayTitle);
  pushPropertyContent(state, component.subtitle);
  pushPropertyContent(state, component.description);
  pushPropertyContent(state, component.body);
  pushPropertyContent(state, component.bodyText);
  pushPropertyContent(state, component.name);
  pushPropertyContent(state, component.text);
  pushPropertyContent(state, component.sentence);
  pushPropertyContent(state, component.firstLine);
  pushPropertyContent(state, component.department);
  pushPropertyContent(state, component.fax);
  pushPropertyContent(state, component.officeName);
  pushPropertyContent(state, component.telephone);
  pushPropertyContent(state, component.linkText);
  pushPropertyContent(state, component.preTitleText);
  pushPropertyContent(state, component.textRight);
  pushPropertyContent(state, component.textLeft);
  pushPropertyContent(state, component.phoneNumber);
  pushPropertyContent(state, component.firstTextColumn);
  pushPropertyContent(state, component.secondTextColumn);
  pushPropertyContent(state, component.jobTitle);
  pushPropertyContent(state, component.place);
};

const appendArrayIds = ({ componentIdsHash, componentIdsList }, componentIds) => {
  const idsHash = componentIdsHash;
  (componentIds || []).forEach((componentId) => {
    if (typeof componentIdsHash[componentId] === 'undefined') {
      componentIdsList.push(componentId);
      idsHash[componentId] = true;
    }
  });
  return idsHash;
};

const resolver = {
  id: node => node.id,
  content: (node, getNode) => {
    const content = [];
    const componentIdsHash = { [node.id]: true };
    const componentIdsList = [];

    const state = { content, componentIdsHash, componentIdsList };

    appendArrayIds(state, node.components___NODE);

    while (componentIdsList.length > 0) {
      const componentId = componentIdsList.shift();
      const component = getNode(componentId);

      pushIndexableFieldValues(state, component);

      state.componentIdsHash = appendArrayIds(state, component.children);
      state.componentIdsHash = appendArrayIds(state, component.values___NODE);
    }

    const result = content.join(' ');
    return result;
  },
};

module.exports = {
  siteMetadata: {
    title: 'Diyar Al Muharraq',
    siteUrl: 'https://www.diyar.bh',

  },
  plugins: [
    {
      resolve: 'gatsby-plugin-sitemap',
      options: {
        exclude: ['/ar/404.html', '/ar/404', '/search', '/ar/search'],
      },
    },
    'gatsby-plugin-remove-trailing-slashes',
    'gatsby-plugin-react-next',
    'gatsby-plugin-react-helmet',
    'gatsby-transformer-remark',
    'svgo',
    {
      resolve: 'gatsby-plugin-postcss-sass',
      options: {
        postCssPlugins: [
          postcssRtl(),
          pixrem({ rootValue: 10 }),
          autoprefixer({
            browsers: ['last 2 versions'],
          }),
          postcssMediaMinmax(),
          postcssCustomMedia(),
        ],
        precision: 8,
      },
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        policy: [getRobotsPolicy(process.env.NODE_ENV)],
      },
    },
    {
      resolve: 'gatsby-source-contentful',
      options: {
        host: process.env.GATSBY_CONTENTFUL_HOST || undefined,
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
        environment: process.env.CONTENTFUL_ENVIRONMENT,
      },
    },
    'gatsby-transformer-json',
    'gatsby-plugin-page-transitions',
    {
      resolve: 'gatsby-plugin-nprogress',
      options: {
        color: '#EE3123',
        showSpinner: false,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: path.join(__dirname, 'src', 'images'),
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-105419653-1',
        // Puts tracking script in the head instead of the body
        head: true,
      },
    },
    {
      resolve: 'gatsby-plugin-google-tagmanager',
      options: {
        id: 'GTM-NTZRDTD',
        includeInDevelopment: true,
      },
    },
    {
      resolve: 'gatsby-plugin-lunr-with-arabic',
      options: {
        languages: [
          {
            name: 'en',
            filterNodes: node => node.node_locale === 'en',
          },
          {
            name: 'ar',
            filterNodes: node => node.node_locale === 'ar',
          },
        ],
        fields: [
          { name: 'id', store: true, attributes: { boost: 20 } },
          { name: 'title', store: true, attributes: { boost: 20 } },
          { name: 'content', store: true },
          { name: 'url', store: true },
          { name: 'type', store: true },
          { name: 'searchBody', store: true },
        ],
        resolvers: {
          ContentfulPage: {
            ...resolver,
            title: node => getRawPageTitle(node.displayTitle),
            searchBody: (node, getNode) => getNode(node.description___NODE).description,
            url: node => (node.node_locale === 'ar' ? `/ar${node.route}` : node.route),
            type: () => 'page',
          },
          ContentfulContentArticle: {
            title: node => node.displayTitle,
            searchBody: (node, getNode) => getNode(node.body___NODE).body,
            url: (node) => {
              const result = mediaHelper.generateArticleURL(node.displayTitle, node.node_locale);
              return result;
            },
            type: () => 'article',
          },
          ContentfulContentNews: {
            title: node => node.displayTitle,
            searchBody: (node, getNode) => getNode(node.body___NODE).body,
            url: (node) => {
              const result = mediaHelper.generateNewsURL(node.displayTitle, node.node_locale);
              return result;
            },
            type: () => 'news',
          },
          ContentfulContentJobPost: {
            title: node => node.displayTitle,
            searchBody: (node, getNode) => getNode(node.jobDescription___NODE).jobDescription,
            url: (node) => {
              const result =
                careersHelper.generateJobPostURL(node.displayTitle, node.publishDate, node.node_locale);
              return result;
            },
            type: () => 'job-post',
          },
        },
      },
    },
  ],
};
