import React from 'react';
import PageTransition from 'gatsby-plugin-page-transitions';
import Head from '../../shared/components/head';
import CareersJobDetails from '../components/careers-job-details';
import setLocaleContext from '../../layouts/components/i18n/setLocaleContext';

const CareersJobDetailsPage = ({ pathContext, data, pathContext: { translation: t } }) => {
  if (!data.allContentfulContentJobPost) {
    console.error('[Page] No jobPost found', pathContext);

    return null;
  }

  const jobPostData = data.allContentfulContentJobPost.edges[0].node;

  return [
    <Head
      key="head"
      data={{ displayTitle: `${t.pageTitles.careers} - ${jobPostData.jobTitle}` }}
      context={pathContext}
    />,
    <PageTransition key="page">
      <CareersJobDetails mainTitle={t.pageTitles.careers} {...jobPostData} />
    </PageTransition>,
  ];
};

// export const careersJobDetailsQuery = graphql`
export const careersJobDetailsQuery = `
  query careersJobDetailsQuery($locale: String, $jobTitle: String) {
    allContentfulContentJobPost(
      filter: {
        node_locale: { eq: $locale }
        jobTitle: { eq: $jobTitle }
      }
    ) {
      edges {
        node {
            id
            jobTitle
            jobDescription {
                childMarkdownRemark {
                    html
                }
            }
            postDate
            place
            benefits {
              image {
                sizes(quality: 100, toFormat: JPG) {
                  ...GatsbyContentfulSizes
                }
              }
              text {
                text
              }
            }
        }
      }
    }
  }
`;

export default setLocaleContext()(CareersJobDetailsPage);
