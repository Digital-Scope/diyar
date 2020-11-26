import React, { Component } from 'react';
import classnames from 'classnames';
import { translate } from 'react-i18next';

import './filter-section.scss';

class FilterSection extends Component {
  constructor(props) {
    super();
    const dropdownOpened = {};
    const currentSelectedFilters = {};

    props.children.forEach((child) => {
      dropdownOpened[child.props.name] = false;
      currentSelectedFilters[child.props.name] = {};
    });

    this.state = {
      dropdownOpened,
      currentSelectedFilters,
    };

    this.onDropdownFieldClicked = (dropdownName) => {
      const dropdownNewState = {};

      Object.keys(this.state.dropdownOpened).forEach((dropdownKey) => {
        dropdownNewState[dropdownKey] = dropdownKey === dropdownName ?
          !this.state.dropdownOpened[dropdownName] : false;
      });

      this.setState({
        dropdownOpened: {
          ...dropdownNewState,
        },
      });
    };

    this.onDropdownValueChange = (dropdownElement, selectedValue) => {
      const newFilterValues = {
        ...this.state.currentSelectedFilters,
        [dropdownElement.props.name]: selectedValue,
      };

      dropdownElement.props.onChange(newFilterValues, dropdownElement.props.name);
      this.onDropdownFieldClicked();
      this.setState({
        currentSelectedFilters: newFilterValues,
      });
    };
  }


  render() {
    const headerClassNames = classnames({
      'filter-section-header': true,
      'filter-section-header-mobile-only': this.props.showLabelOnMobileOnly,
    });

    return (
      <div className="filter-section-container container">
        <h2 className={headerClassNames}>{this.props.t('filter').filterLabel}</h2>
        <div className="filter-section-controls">
          {this.props.children.map(child => (
            React.cloneElement(child, {
              onDropdownClick: () => this.onDropdownFieldClicked(child.props.name),
              onChange: selectedValue => this.onDropdownValueChange(child, selectedValue),
              key: child.props.name,
              isOpen: this.state.dropdownOpened[child.props.name],
              selectedValue: this.state.currentSelectedFilters[child.props.name],
            })
          ))}
        </div>
      </div>
    );
  }
}

export default translate('labels')(FilterSection);
