import React, { Component } from 'react';

import Icon from '../../../../shared/components/icon';
import closeIcon from '../../../../shared/components/icon/cross.icon';
import { LocalizeLink } from '../../../../shared/components/link';

import './search-bar.scss';

export default class SearchBar extends Component {
  componentDidUpdate() {
    if (this.props.open) {
      this.inputRef.focus();
    } else {
      this.inputRef.blur();
    }
  }

  render() {
    return (
      <div className="search-bar">
        <div className="container">
          <LocalizeLink link="/search/">{ ({ link }) => (
            <form
              action={link}
            >
              <input
                type="text"
                name="term"
                placeholder={this.props.searchPlaceholder}
                ref={(ref) => { this.inputRef = ref; }}
              />
            </form>
          )}</LocalizeLink>
          <button
            className="search-bar-close"
            onClick={this.props.onClose}
          >
            <Icon id={closeIcon.id} />
          </button>
        </div>
      </div>
    );
  }
}
