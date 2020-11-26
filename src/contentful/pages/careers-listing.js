import React from 'react';
import PageTransition from 'gatsby-plugin-page-transitions';

import Head from '../../shared/components/head';
import careersHelpers from '../../shared/helpers/careers';
import pageHelpers from '../../shared/helpers/page';
import { renderComponent } from '../render';
import { createExcerpt } from '../../shared/helpers/misc';
import setLocaleContext from '../../layouts/components/i18n/setLocaleContext';

export default setLocaleContext()(({ pathContext, data }) => {
  const pageData = data.allContentfulPage.edges[0].node;

  const jobPosts = data.allContentfulContentJobPost.edges.map(edge => ({
    ...edge.node,
    url: careersHelpers.generateJobPostURL(
      edge.node.jobTitle, edge.node.postDate, pathContext.locale,
    ),
    excerpt: createExcerpt(edge.node.jobDescription.childMarkdownRemark.rawMarkdownBody, 155),
  }));
  const department = data.allContentfulContentDepartmentFilter.edges.map(edge => ({
    value: edge.node.filterValue,
    text: edge.node.filterValue,
  }));

  const education = data.allContentfulContentEducationFilter.edges.map(edge => ({
    value: edge.node.filterValue,
    text: edge.node.filterValue,
  }));

  const experience = data.allContentfulContentExperienceFilter.edges.map(edge => ({
    value: edge.node.filterValue,
    text: edge.node.filterValue,
  }));

  const role = data.allContentfulContentRoleFilter.edges.map(edge => ({
    value: edge.node.filterValue,
    text: edge.node.filterValue,
  }));

  return ([
    <Head key="head" data={pageData} context={pathContext} />,
    <PageTransition key="page">
      {
        pageData.components &&
          pageData.components.map((component, index) => renderComponent(component, {
            keyPrefix: index,
            sections: true,
            /* eslint no-underscore-dangle: off */
            props: component.__typename === pageHelpers.jobListingComponent && { jobPosts,
              filter: {
                department,
                education,
                experience,
                role,
              } },
          }))
      }
    </PageTransition>,
  ]);
});


// export const CareersListingQuery = graphql`
export const CareersListingQuery = `
  query CareersListingQuery ($locale: String, $route: String) {
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
    allContentfulContentJobPost (
        filter: { node_locale:{ eq: $locale } }
        sort: { fields: [postDate], order: DESC }
    ) {
        edges {
            node {
                id
                jobTitle
                postDate
                place
                jobDescription {
                    childMarkdownRemark {
                        rawMarkdownBody
                    }
                }
                department {
                    filterValue
                }
                education {
                    filterValue
                }
                role {
                    filterValue
                }
                experience {
                    filterValue
                }
            }
        }
    }
    allContentfulContentDepartmentFilter (
        filter: {
            node_locale:{ eq: $locale }
        }
    ) {
        edges {
            node {
                filterValue
            }
        }
    }
    allContentfulContentEducationFilter (
        filter: {
            node_locale:{ eq: $locale }
        }
    ) {
        edges {
            node {
                filterValue
            }
        }
    }
    allContentfulContentRoleFilter (
        filter: {
            node_locale:{ eq: $locale }
        }
    ) {
        edges {
            node {
                filterValue
            }
        }
    }
    allContentfulContentExperienceFilter (
        filter: {
            node_locale:{ eq: $locale }
        }
    ) {
        edges {
            node {
                filterValue
            }
        }
    }
  }
`;
