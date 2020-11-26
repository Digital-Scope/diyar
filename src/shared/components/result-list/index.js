import React from 'react';
import './result-list.scss';

export default ({ noResultTitle, items, render }) => {
    if (!items || items.length === 0) {
        return <h2 className="result-list-text">{noResultTitle}</h2>;
    }
    else {
       return render(items);     
    }
};