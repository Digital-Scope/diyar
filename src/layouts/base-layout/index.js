import 'babel-polyfill';

import React from 'react';
import PropTypes from 'prop-types';
import LiveChat from 'react-livechat';

import '../../sass/style.scss';

import { StoreProvider } from '../../shared/store';
import Head from '../components/head';
import LocalizeData from '../components/localize-data';
import Header from '../components/header';
import Footer from '../components/footer';
import PopUp from '../components/pop-up';
import './layout.scss';

const BaseLayout = ({ data, children, headerProps = {} }) => (
  <StoreProvider>
    <LocalizeData data={data}>{ ({ data: { header, footer, content } }) => (
      <div id="app">
        <Head />
        {
          process.env.GATSBY_LIVECHAT_ID && typeof window !== 'undefined' && (
            <LiveChat license={process.env.GATSBY_LIVECHAT_ID} />
          )
        }
        <Header data={header} content={content} {...headerProps} />
        <div id="content">
          { children() }
        </div>
        <PopUp
          logo={header.logoColor}
          images={[data.image1, data.image2, data.image3, data.image4, data.image5]}
          data={content}
        />
        <Footer data={footer} content={content} />
      </div>
    )}
    </LocalizeData>
  </StoreProvider>
);

BaseLayout.propTypes = {
  children: PropTypes.func,
};

export default BaseLayout;
