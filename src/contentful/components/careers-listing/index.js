import React, { Component } from 'react';
import {translate} from 'react-i18next';

import Icon from '../../../shared/components/icon';
import ctaArrowIcon from '../../../shared/components/icon/cta-arrow.icon';

import FilterSection from "../../../shared/components/filter-section";
import FilterDropdown from "../../../shared/components/filter-dropdown";
import LoadMoreButton from "../../../shared/components/load-more-button";
import SectionTitle from "../../../shared/components/section-title";
import ResultList from "../../../shared/components/result-list";

import { filterItemByDate } from '../../../shared/helpers/misc';

import CareersListingCardsContainer from "./careers-listing-cards-container";

import './careers-listing.scss';

class CareersListing extends Component {

    constructor(props) {
        super();
        this.staticData = {
            filterNames: {
                date: 'date',
                department: 'department',
                education: 'education',
                experience: 'experience',
                role: 'role'
            },
            department: props.filter.department,
            role: props.filter.role,
            education: props.filter.education,
            experience: props.filter.experience,
            date: props.t('mediaCenter').selections.dates,
            allJobPosts: props.jobPosts
        }
        this.state = {
            currentFilteredItems: props.jobPosts,
            numOfItems: 4
        }
    }

    filterHandler = (allFilterValues) => {
        const dateFilterValue = allFilterValues[this.staticData.filterNames.date];
        const currentFilteredItems = this.staticData.allJobPosts
            .filter(item => this.filterByField(item, allFilterValues, this.staticData.filterNames.department))
            .filter(item => this.filterByField(item, allFilterValues, this.staticData.filterNames.role))
            .filter(item => this.filterByField(item, allFilterValues, this.staticData.filterNames.experience))
            .filter(item => this.filterByField(item, allFilterValues, this.staticData.filterNames.education))
            .filter(item => filterItemByDate(item.postDate, dateFilterValue));

        this.setState({
            currentFilteredItems,
            numOfItems: 4
        })
    }

    filterByField (item, allFilterValues, fieldName) {
        const depFilterValue = allFilterValues[this.staticData.filterNames[fieldName]];
        if (!depFilterValue.value) {
            return true;
        }
        return item[fieldName].some(dep => dep.filterValue === depFilterValue.value)
    }


    isLoadMoreButtonVisible = () => {
        return this.state.numOfItems < this.state.currentFilteredItems.length;
    }

    loadMore = () => {
        this.setState({
            numOfItems: this.state.numOfItems + 4
        })
    }

    render() {
        const { displayTitle, subtitle } = this.props.data;
        const { t } = this.props;
        return (
            <section className="container careers-listing-wrapper">
                <div className="careers-listing-titles">
                    <div className="careers-listing-titles-main">
                        <SectionTitle title={displayTitle} />
                    </div>
                    <div className="careers-listing-titles-additional">{subtitle}</div>
                </div>

                <FilterSection showLabelOnMobileOnly>
                    <FilterDropdown name={this.staticData.filterNames.role} placeholder="Role" items={this.staticData.role} onChange={this.filterHandler} />
                    <FilterDropdown name={this.staticData.filterNames.department} placeholder="Department" items={this.staticData.department} onChange={this.filterHandler} />
                    <FilterDropdown name={this.staticData.filterNames.experience} placeholder="Experience" items={this.staticData.experience} onChange={this.filterHandler} />
                    <FilterDropdown name={this.staticData.filterNames.education} placeholder="Education" items={this.staticData.education} onChange={this.filterHandler} />
                    <FilterDropdown name={this.staticData.filterNames.date} placeholder="Date Posted" items={this.staticData.date} onChange={this.filterHandler} />
                </FilterSection>

                <ResultList noResultTitle={t("filter").noResult} items={this.state.currentFilteredItems.slice(0, this.state.numOfItems)}
                            render={items => <CareersListingCardsContainer jobPosts={items} />} />

                <LoadMoreButton isVisible={this.isLoadMoreButtonVisible} onClick={this.loadMore} />
            </section>
        );
    }
}

export default translate('labels')(CareersListing);

// export const careersListingFragment = graphql`
export const careersListingFragment = `
  fragment ContentfulComponentCareersListingFragment on ContentfulComponentCareersListing {
    displayTitle
    subtitle
  }
`;
