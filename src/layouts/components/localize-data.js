import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import moment from 'moment';
import 'moment/locale/ar';
import 'moment/locale/en-gb';
import countries from 'i18n-iso-countries';
import i18n from './i18n';

import { isArabicURL } from '../../shared/helpers/misc';

const localizeNode =
  ({ edges }, locale) => edges.filter(({ node }) => node.node_locale === locale)[0].node;

const Layout = (props) => {
  const locale = isArabicURL(props.location.pathname) ? 'ar' : 'en';

  if (locale === 'ar') {
    countries.registerLocale(require('i18n-iso-countries/langs/ar.json'));
  } else {
    countries.registerLocale(require('i18n-iso-countries/langs/en.json'));
  }
  i18n.changeLanguage(locale);
  moment.locale(locale);

  return props.children({
    data: {
      header: localizeNode(props.data.allContentfulComponentHeader, locale),
      footer: localizeNode(props.data.allContentfulComponentFooter, locale),
      content: {
        project: localizeNode(props.data.allContentfulContentProject, locale),
      },
    },
  });
};

Layout.propTypes = {
  children: PropTypes.func,
};

export const layoutQuery = graphql`
  fragment Layout on RootQueryType {
      
    image1:imageSharp(id: { regex: "/IMAGE-01/" }) {
        sizes(maxWidth: 2024) {
            ...GatsbyImageSharpSizes
        }
    }
    image2:imageSharp(id: { regex: "/IMAGE-02/" }) {
        sizes(maxWidth: 2024) {
            ...GatsbyImageSharpSizes
        }
    }
    image3:imageSharp(id: { regex: "/IMAGE-03/" }) {
        sizes(maxWidth: 2024) {
            ...GatsbyImageSharpSizes
        }
    }
    image4:imageSharp(id: { regex: "/IMAGE-04/" }) {
        sizes(maxWidth: 2024) {
            ...GatsbyImageSharpSizes
        }
    }
    
    allContentfulComponentHeader {
      edges {
        node {
          node_locale
          ...ContentfulComponentHeaderFragment
        }
      }
    }
    allContentfulComponentFooter {
      edges {
        node {
          node_locale
          ...ContentfulComponentFooterFragment
        }
      }
    }
    allContentfulContentProject {
      edges {
        node {
          node_locale
          name,
          slogan
        }
      }
    }
  }
`;

export default withRouter(Layout);
