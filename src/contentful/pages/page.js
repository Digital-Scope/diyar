import React from 'react';
import PageTransition from 'gatsby-plugin-page-transitions';

import Head from '../../shared/components/head';
import { renderPage } from '../render';
import setLocaleContext from '../../layouts/components/i18n/setLocaleContext';

const Page = ({ pathContext, data }) => {
  if (!data.allContentfulPage) {
    console.error('[Page] No page found', pathContext);

    return null;
  }

  const pageData = data.allContentfulPage.edges[0].node;

  return [
    <Head key="head" data={pageData} context={pathContext} />,
    <PageTransition key="page">
      { pageData.components && (
        renderPage(pageData.components, {
          sections: data.componentsAsSections == null ? true : data.componentsAsSections,
        })
      )}
    </PageTransition>,
  ];
};

export const pageFragment = graphql`
    fragment Page on ContentfulPage {
        displayTitle,
        description {
          description
        },
        components {
            __typename,
            ...ContentfulComponentHomepageHeroFragment
            ...ContentfulComponentStoryFragment
            ...ContentfulComponentTimelineFragment
            ...ContentfulComponentRichTextFragment
            ...ContentfulComponentFaq
            # ...ContentfulComponentVideoFragment
            ...ContentfulComponentStatisticsFragment
            ...ContentfulComponentTwoTextColumnFragment
            ...ContentfulComponentContactOfficeFragment
            ...ContentfulComponentContactUsFormFragment
            ...ContentfulComponentCareersFormFragment
            #...ContentfulComponentCareersListingFragment
            ...ContentfulComponentCtaFragment
            ...ContentfulComponentTakeATourFragment
            ...ContentfulComponentDownloadFilesFragment
            ...ContentfulComponentGallerySliderFragment
            ...ContentfulComponentGalleryMediaSliderFragment
            ...ContentfulComponentProjectHeroFragment
            # Media Blocks
            ...ContentfulComponentMediaBlockMainFragment
            ...ContentfulComponentMediaBlockWithThreeImagesFragment
            ...ContentfulComponentMediaBlockVideoHighlightFragment
            ...ContentfulComponentMediaBlockWithSliderFragment
            ...ContentfulComponentMediaBlockHighlightFragment
            ...ContentfulComponentMediaBlockSimpleFragment
        }
        componentsAsSections
    }
`;

export const PageQuery = graphql`
    query PageQuery($route: String, $locale: String) {
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
    }
`;

export default setLocaleContext()(Page);
