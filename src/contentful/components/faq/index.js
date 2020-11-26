import React from 'react';
import Collapsible from 'react-collapsible';

import TransitionIn from '../../../shared/components/transition-in';
import SectionTitle from '../../../shared/components/section-title';

import TextBlock from '../../../shared/components/text-block';

import './faq.scss';

const FAQ = ({ data }) => {
  const { displayTitle, topics } = data;
  return (
    <TransitionIn>
      <section className="faq-wrapper">
        <div className="faq container">
          <SectionTitle title={displayTitle} />

          {topics.map(topic => (
            <Collapsible
              transitionTime={100}
              trigger={topic.name}
              key={topic.name}
              classParentString="faq-topic"
              className="faq-topic-closed"
              openedClassName="faq-topic-opened"
              triggerClassName="faq-trigger"
              triggerOpenedClassName="faq-trigger faq-topic-opened-inner"
            >
              {topic.items.map(item => (
                <Collapsible
                  key={item.question.childMarkdownRemark.rawMarkdownBody}
                  transitionTime={100}
                  trigger={item.question.childMarkdownRemark.rawMarkdownBody}
                  classParentString="faq-item"
                  className="faq-item-closed"
                  openedClassName="faq-item-opened"
                  triggerClassName="faq-trigger faq-item-text faq-item-text-closed"
                  triggerOpenedClassName="faq-trigger faq-item-text faq-item-text-opened"
                >
                  <TextBlock html className="faq-item-answer">
                    { item.answer.childMarkdownRemark.html }
                  </TextBlock>
                </Collapsible>
              ))}
            </Collapsible>
          ))}
        </div>
      </section>
    </TransitionIn>
  );
};

export default FAQ;

export const fragment = graphql`
  fragment ContentfulComponentFaq on ContentfulComponentFaq {
    displayTitle
    topics {
      name
      items {
        question {
          childMarkdownRemark {
            rawMarkdownBody
          }
        }
        answer {
          childMarkdownRemark {
            html
          }
        }
      }
    }
  }
`;
