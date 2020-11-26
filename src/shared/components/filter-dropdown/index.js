import React, { Component } from 'react';
import classNames from 'classnames';
import { translate } from 'react-i18next';

import Icon from '../../../shared/components/icon';
import dropdownTriangle from '../../../shared/components/icon/dropdown-triangle.icon';

import './filter-dropdown.scss';

class FilterDropdown extends Component {
  constructor() {
    super();

    this.state = {
      isOpened: false,
    };

    this.onDropdownClick = () => {
      this.setState({
        isOpened: !this.state.isOpened,
      });
    };
  }


  render() {
    const dropdownContainerClasses = classNames({
      'filter-dropdown-container': true,
      'filter-dropdown-container-isOpen': this.props.isOpen,
    });
    const selectedText = classNames({
      'filter-dropdown-selected-text': true,
      'filter-dropdown-selected-value': this.props.selectedValue.text,
    });
    const selectLabel = this.props.t('filter').select;
    return (
      <div className={dropdownContainerClasses}>
        <div className="filter-dropdown-mobile-label">{this.props.placeholder}</div>
        <div className="filter-dropdown-selected" onClick={this.props.onDropdownClick}>
          <span
            className={selectedText}
          >
            {this.props.selectedValue.text || this.props.placeholder}
          </span>
          <span className="filter-dropdown-selected-arrow">
            <Icon id={dropdownTriangle.id} />
          </span>
        </div>
        <ul className="filter-dropdown-list">
          <li
            key="none-select"
            className="filter-dropdown-list-item filter-dropdown-list-item-none"
            onClick={this.props.onChange.bind(this, '')}
          >
            {selectLabel}
          </li>
          {
            this.props.items.map(item => (
              <li
                key={item.value}
                className="filter-dropdown-list-item"
                onClick={this.props.onChange.bind(this, item)}
              >
                {item.text}
              </li>
            ))
          }
        </ul>
      </div>
    );
  }
}

export default translate('labels')(FilterDropdown);
