import React, { Component } from 'react';

import Title from '../../../shared/components/title';
import ResultList from '../../../shared/components/result-list';
import MediaCenterItemsContainer from './media-center-items-container';

import FilterSection from '../../../shared/components/filter-section';
import FilterDropdown from '../../../shared/components/filter-dropdown';
import LoadMoreButton from '../../../shared/components/load-more-button';

import { filterItemByDate } from '../../../shared/helpers/misc';
import consumeLocalContext from '../../../layouts/components/i18n/consumeLocaleContext';

import './media-center.scss';

class MediaCenter extends Component {
  constructor(props) {
    super();
    this.staticData = {
      filterNames: {
        date: 'dates',
        department: 'departments',
        mediaType: 'mediaType',
      },
      departments: props.translation.mediaCenter.selections.departments,
      mediaType: props.translation.mediaCenter.selections.mediaType,
      dates: props.translation.mediaCenter.selections.dates,
      allMedia: [...props.articles, ...props.news],
    };

    this.state = {
      dropdownOpened: {
        department: false,
        mediaType: false,
        date: false,
      },
      currentFilteredItems: [...props.articles, ...props.news],
      numOfItems: 6,
    };

    this.isLoadMoreButtonVisible = () => (
      this.state.numOfItems < this.state.currentFilteredItems.length
    );

    this.loadMore = () => {
      this.setState({
        numOfItems: this.state.numOfItems + 6,
      });
    };

    this.filterHandler = (allFilterValues) => {
      const dateFilterValue = allFilterValues[this.staticData.filterNames.date];
      const currentFilteredItems = this.staticData.allMedia
        .filter(item => this.filterByMediaType(item, allFilterValues))
        .filter(item => filterItemByDate(item.publishDate, dateFilterValue))
        .filter(item => this.filterByDepartment(item, allFilterValues));

      this.setState({
        currentFilteredItems,
        numOfItems: 6,
      });
    };
  }

  filterByDepartment(item, allFilterValues) {
    const depFilterValue = allFilterValues[this.staticData.filterNames.department];
    if (!depFilterValue.value) {
      return true;
    }

    return item.category.some(cat => cat.toLowerCase() === depFilterValue.value.toLowerCase());
  }

  filterByMediaType(item, allFilterValues) {
    const mediaTypeFilterValue = allFilterValues[this.staticData.filterNames.mediaType];
    if (!mediaTypeFilterValue.value) {
      return true;
    }
    return mediaTypeFilterValue.value.toLowerCase() === item.mediaType.toLowerCase();
  }

  render() {
    const { translation } = this.props;
    const { date, department, mediaType } = translation.mediaCenter.placeholders;
    return (
      <section className="container">
        <Title text={translation.mediaCenter.title}>
          <div className="media-center-wrapper">
            <FilterSection>
              <FilterDropdown
                name={this.staticData.filterNames.date}
                placeholder={date}
                items={this.staticData.dates}
                onChange={this.filterHandler}
              />
              <FilterDropdown
                name={this.staticData.filterNames.department}
                placeholder={department}
                items={this.staticData.departments}
                onChange={this.filterHandler}
              />
              <FilterDropdown
                name={this.staticData.filterNames.mediaType}
                placeholder={mediaType}
                items={this.staticData.mediaType}
                onChange={this.filterHandler}
              />
            </FilterSection>
            <ResultList
              noResultTitle={translation.filter.noResult}
              items={this.state.currentFilteredItems.slice(0, this.state.numOfItems)}
              render={items => <MediaCenterItemsContainer mediaItems={items} />}
            />
            <LoadMoreButton isVisible={this.isLoadMoreButtonVisible} onClick={this.loadMore} />
          </div>
        </Title>
      </section>
    );
  }
}

export default consumeLocalContext()(MediaCenter);
