import React from 'react';
import consumeLocaleContext from '../../../layouts/components/i18n/consumeLocaleContext';

import SectionTitle from '../../../shared/components/section-title';
import LatestArticleItem from './latest-article-item';

const LatestArticles = ({ articles, translation: t }) => (
  articles && articles.length ? (
    <section className="container">
      <SectionTitle title={t.latestArticles.mainHeader} />
      {articles.map(article => <LatestArticleItem key={article.id} {...article} />)}
    </section>
  )
    : null
);

export default consumeLocaleContext()(LatestArticles);
