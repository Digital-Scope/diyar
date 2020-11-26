const path = require('path');
const fs = require('fs-extra');

const mediaHelpers = require('./src/shared/helpers/media');
// const jobPostHelpers = require('./src/shared/helpers/careers');
const pageHelpers = require('./src/shared/helpers/page');
const getTranslations = require('./src/shared/helpers/get-translations');

const addPageRedirectsForMedia = (contentfulMedia, isArticle) => {
  // separate english and arabic articles
  const generateURL = isArticle ? mediaHelpers.generateArticleURL : mediaHelpers.generateNewsURL;
  const mediaByLang = contentfulMedia.reduce((acc, mediaItem) => {
    if (mediaItem.node_locale === 'ar') {
      acc.arabicMedia[mediaItem.title] = mediaItem;
    } else {
      acc.englishMedia[mediaItem.title] = mediaItem;
    }
    return acc;
  }, {
    englishMedia: {},
    arabicMedia: {},
  });

  const englishMedia = Object.values(mediaByLang.englishMedia).map((mediaItem) => {
    const mediaEnhanced = mediaItem;
    const mediaARVersion = mediaByLang.arabicMedia[mediaEnhanced.title];

    if (mediaARVersion) {
      mediaEnhanced.redirectFrom = generateURL(mediaEnhanced.displayTitle, 'ar');
      mediaEnhanced.redirectTo = generateURL(mediaARVersion.displayTitle, 'ar');

      if (mediaEnhanced.redirectFrom === mediaEnhanced.redirectTo) {
        mediaEnhanced.redirectFrom = '';
        mediaEnhanced.redirectTo = '';
      }
    }
    return mediaEnhanced;
  });


  const arabicMedia = Object.values(mediaByLang.arabicMedia).map((mediaItem) => {
    const mediaEnhanced = mediaItem;
    const mediaENVersion = mediaByLang.englishMedia[mediaEnhanced.title];

    if (mediaENVersion) {
      mediaEnhanced.redirectFrom = generateURL(mediaEnhanced.displayTitle, 'en');
      mediaEnhanced.redirectTo = generateURL(mediaENVersion.displayTitle, 'en');

      if (mediaEnhanced.redirectFrom === mediaEnhanced.redirectTo) {
        mediaEnhanced.redirectFrom = '';
        mediaEnhanced.redirectTo = '';
      }
    }

    return mediaEnhanced;
  });

  return englishMedia.concat(arabicMedia);
};


exports.onPostBootstrap = () => {
  console.info('Copying locales files');

  fs.copySync(
    path.join(__dirname, '/src/locales'),
    path.join(__dirname, '/public/locales'),
  );
};

exports.createPagesStatefully = async ({
  boundActionCreators: { createPage },
  graphql,
}) => {
  // Get all contentful pages
  console.info('Fetching pages...');

  const contentfulPages = await graphql(`
    query ContentfulPages {
      allContentfulPage {
        edges {
          node {
            components {
              __typename
            },
            category
            showLatestArticles
            route,
            layout,
            node_locale
          }
        }
      }
      allContentfulContentArticle (
        filter: { hidden: { ne: true } }
      ) {
        edges {
          node {
            title,
            displayTitle,
            node_locale
          }
        }
      }
      allContentfulContentNews (
        filter: { hidden: { ne: true } }
      ) {
        edges {
          node {
            title,
            displayTitle,
            node_locale
          }
        }
      }
      # The jobs listing was removed so we could lower the contentful tier (48 max of content types)
      # allContentfulContentJobPost {
      #   edges {
      #     node {
      #       id,
      #       title,
      #       jobTitle
      #       postDate
      #       node_locale
      #     }
      #   }
      # }
    }
  `);

  if (contentfulPages.errors) {
    throw contentfulPages.errors;
  }
  const { allContentfulPage, allContentfulContentArticle,
    allContentfulContentNews /* allContentfulContentJobPost */ } = contentfulPages.data;

  const pagesNr = allContentfulPage.edges.length;
  console.info(`${pagesNr} pages fetched`);
  const mainPages = allContentfulPage.edges.map(({ node }) => node);

  const articlesNr = allContentfulContentArticle && allContentfulContentArticle.edges.length;
  console.info(`${articlesNr || 0} articles fetched`);
  const articlesDetailsPages = allContentfulContentArticle &&
    allContentfulContentArticle.edges.map(({ node }) => node);

  const newsNr = allContentfulContentNews && allContentfulContentNews.edges.length;
  console.info(`${newsNr || 0} news fetched`);
  const newsDetailsPages = allContentfulContentNews &&
    allContentfulContentNews.edges.map(({ node }) => node);

  // The jobs listing was removed so we could lower the contentful tier (48 max of content types)
  // const jobPostNr = allContentfulContentJobPost.edges.length;
  // console.info(`${jobPostNr} job post fetched`);
  // const jobPostPages = allContentfulContentJobPost.edges.map(({ node }) => node);

  mainPages.forEach((page) => {
    const pagePath = page.node_locale === 'en' ? page.route : `/${page.node_locale}${page.route}`;
    const pageTemplatePath = pageHelpers.getPagePath(page);

    let articleCategory = '';
    if (pageHelpers.isPageWithLatestArticles(pageTemplatePath)) {
      articleCategory = pageHelpers.getArticlesCategory(page);
    }
    const translation = getTranslations(page.node_locale);
    createPage({
      path: pagePath,
      component: pageTemplatePath,
      context: {
        route: page.route,
        locale: page.node_locale,
        articleCategory,
        translation,
      },
      layout: page.layout === 'Default' || !page.layout ? 'index' : page.layout.toLocaleLowerCase().replace(' ', '-'),
    });
    console.info(`    created page "${pagePath}"`);
  });
  console.info(`Created ${pagesNr} pages`);

  const articlesWithRedirects = articlesDetailsPages ?
    addPageRedirectsForMedia(articlesDetailsPages, true) : [];

  // The jobs listing was removed so we could lower the contentful tier (48 max of content types)
  // jobPostPages.forEach((jobPost) => {
  //   const { jobTitle, postDate } = jobPost;
  //   const nodeLocale = jobPost.node_locale;
  //   const jobPostPath = jobPostHelpers.generateJobPostURL(jobTitle, postDate, nodeLocale);
  //
  //   createPage({
  //     path: jobPostPath,
  //     component: path.resolve('./src/contentful/pages/careers-job-details.js'),
  //     context: {
  //       locale: nodeLocale,
  //       jobTitle,
  //     },
  //     layout: 'index',
  //   });
  //   console.info(`    created jobPost "${jobPostPath}"`);
  // });
  // console.info(`Created ${jobPostNr} pages`);

  articlesWithRedirects.forEach((article) => {
    const { displayTitle, redirectTo, redirectFrom } = article;
    const nodeLocale = article.node_locale;
    const articlePath = mediaHelpers.generateArticleURL(displayTitle, nodeLocale);
    const translation = getTranslations(nodeLocale);
    if (article.redirectTo) {
      createPage({
        path: redirectFrom,
        component: path.resolve('./src/contentful/pages/article-details.js'),
        context: {
          locale: nodeLocale,
          displayTitle,
          fromPath: redirectFrom,
          toPath: redirectTo,
          translation,
        },
        layout: 'index',
      });
    }

    createPage({
      path: articlePath,
      component: path.resolve('./src/contentful/pages/article-details.js'),
      context: {
        locale: nodeLocale,
        displayTitle,
        translation,
      },
      layout: 'index',
    });
    console.info(`    created article "${articlePath}"`);
  });
  console.info(`Created ${articlesNr} pages`);

  const newsWithRedirects = newsDetailsPages ?
    addPageRedirectsForMedia(newsDetailsPages, false) : [];

  newsWithRedirects.forEach((news) => {
    const { displayTitle, redirectTo, redirectFrom } = news;
    const nodeLocale = news.node_locale;
    const newsPath = mediaHelpers.generateNewsURL(news.displayTitle, news.node_locale);
    const translation = getTranslations(nodeLocale);
    if (news.redirectTo) {
      createPage({
        path: redirectFrom,
        component: path.resolve('./src/contentful/pages/news-details.js'),
        context: {
          locale: nodeLocale,
          displayTitle,
          fromPath: redirectFrom,
          toPath: redirectTo,
          translation,
        },
        layout: 'index',
      });
    }
    createPage({
      path: newsPath,
      component: path.resolve('./src/contentful/pages/news-details.js'),
      context: {
        locale: nodeLocale,
        displayTitle,
        translation,
      },
      layout: 'index',
    });
    console.info(`    created news "${newsPath}"`);
  });
  console.info(`Created ${newsNr} pages`);
};

exports.onCreatePage = ({ page, boundActionCreators: { createPage, deletePage } }) => {
  if (page.context.locale) {
    return;
  }
  const generatePage = (locale, translation) => {
    const newPath = (locale === 'ar' ? '/ar' : '') + page.path;
    return {
      ...page,
      path: newPath,
      context: {
        ...page.context,
        locale,
        translation,
      },
    };
  };
  const locales = ['en', 'ar'];
  deletePage(page);
  locales.forEach((locale) => {
    const translation = getTranslations(locale);
    const localePage = generatePage(locale, translation);

    try {
      createPage(localePage);
    } catch (error) {
      console.error('Error localizing filesystem Gatsby pages', page);
      throw error;
    }
    console.info('Localized file page', localePage.path);
  });
};
