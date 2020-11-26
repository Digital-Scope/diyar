/* eslint-disable no-underscore-dangle, react/no-danger */

import React, { Component } from 'react';
import PageTransition from 'gatsby-plugin-page-transitions';
import Helmet from 'react-helmet';
import parseUrl from 'url-parse';
import { withRouter } from 'react-router';
import GatsbyLink from 'gatsby-link';

import { isArabicURL, createExcerpt } from '../../shared/helpers/misc';
import Title from '../../shared/components/title';
import Icon from '../../shared/components/icon';
import ctaArrowIcon from '../../shared/components/icon/cta-arrow.icon';
import './search.scss';
import setLocaleContext from '../../layouts/components/i18n/setLocaleContext';

class Search extends Component {
  constructor(props) {
    super(props);

    const url = parseUrl(this.props.location.search, null, true);

    this.state = {
      searchString: (url.query.term || '').trim(),
      searchResults: null,
    };

    this.refreshSearchResults = this.refreshSearchResults.bind(this);
  }

  componentDidMount() {
    if (this.state.searchString && typeof window !== 'undefined') {
      this.refreshSearchResults();
    }
  }

  refreshSearchResults() {
    if (!window.__LUNR__) {
      setTimeout(() => {
        this.refreshSearchResults();
      }, 100);

      return;
    }
    const locale = isArabicURL(this.props.location.pathname) ? 'ar' : 'en';
    const { store, index } = window.__LUNR__[locale];

    const queryResults = index.search(this.state.searchString);
    const searchResults = queryResults.map(queryResult => store[queryResult.ref]);

    this.setState({
      searchResults,
    });
  }

  render() {
    const { searchResults, searchString } = this.state;
    const { pathContext: { translation } } = this.props;
    return [
      <Helmet
        key="helmet"
        title="Search Results"
        htmlAttributes={{
          lang: this.props.pathContext.locale,
          dir: this.props.pathContext.locale === 'ar' ? 'rtl' : 'ltr',
        }}
      />,
      <PageTransition key="page">
        <section className="search-results container">
          <Title text={translation['search-results'].title}>
            <h1 className="search-results-title" dangerouslySetInnerHTML={{ __html: `${translation['search-results'].heading.replace('{0}', `<strong>${searchString}</strong>`)}` }} />
          </Title>
          {searchResults && (

            <h2 className="search-results-subtitle">{translation['search-results'].searchResultCount.replace('{0}', searchResults.length)}</h2>

          )}
          {searchResults &&
            <ul className="search-results-list">
              {searchResults
                .filter(searchResult => !!searchResult)
                .map(searchResult => (
                  <li key={searchResult.id} data-index-id={searchResult.id} className="search-results-list-item">
                    <h3 className="search-results-list-item-title"><GatsbyLink to={searchResult.url}>{searchResult.title}</GatsbyLink></h3>
                    <p className="search-results-list-item-content">{createExcerpt(searchResult.searchBody, 300)}</p>
                    <GatsbyLink to={searchResult.url} className="search-results-list-item-link">
                      {searchResult.type === 'news' && translation['search-results'].newsLink}
                      {searchResult.type === 'article' && translation['search-results'].articleLink}
                      {searchResult.type === 'job-post' && translation['search-results'].jobPostLink}
                      {searchResult.type === 'page' && translation['search-results'].pageLink}

                      <span className="arrow-icon">
                        <Icon id={ctaArrowIcon.id} />
                      </span>
                    </GatsbyLink>
                  </li>
                ))}
            </ul>
          }
          {searchString && !searchResults &&
            // http://tobiasahlin.com/spinkit/ for more info
            <div className="sk-circle">
              <div className="sk-circle1 sk-child" />
              <div className="sk-circle2 sk-child" />
              <div className="sk-circle3 sk-child" />
              <div className="sk-circle4 sk-child" />
              <div className="sk-circle5 sk-child" />
              <div className="sk-circle6 sk-child" />
              <div className="sk-circle7 sk-child" />
              <div className="sk-circle8 sk-child" />
              <div className="sk-circle9 sk-child" />
              <div className="sk-circle10 sk-child" />
              <div className="sk-circle11 sk-child" />
              <div className="sk-circle12 sk-child" />
            </div>
          }
        </section>
      </PageTransition>,
    ];
  }
}

export default withRouter(setLocaleContext()(Search));
