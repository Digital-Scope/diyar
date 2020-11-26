import React, { Component } from 'react';

import SectionTitle from '../../../shared/components/section-title';
import TransitionIn from '../../../shared/components/transition-in';

import './two-text-column.scss';

export default ({ data }) => {
    const { displayTitle, firstTextColumn, secondTextColumn } = data;
    return (
        <div className='two-text-column'>
            <div className='container'>
                <SectionTitle title={ displayTitle } />
                <TransitionIn>
                    <div className='two-text-column-text-container'>
                        <div className='two-text-column-first' dangerouslySetInnerHTML={{ __html: firstTextColumn.childMarkdownRemark.html }} />
                        <div className='two-text-column-second' dangerouslySetInnerHTML={{ __html: secondTextColumn.childMarkdownRemark.html }} />
                    </div>
                </TransitionIn>
            </div>
        </div>
    );
}

export const twoTextColumnFragment = graphql`
  fragment ContentfulComponentTwoTextColumnFragment on ContentfulComponentTwoTextColumn {
    displayTitle,
    firstTextColumn {
        childMarkdownRemark {
            html
        }
    }
    secondTextColumn {
        childMarkdownRemark {
            html
        }
    }
  }
`;