import React, { Fragment } from 'react';
import { Provider } from 'react-redux';
import App, { Container } from 'next/app';
import { ApolloProvider } from 'react-apollo';

import withRedux from 'next-redux-wrapper';
import initStore from '../libs/store';
import withApollo from '../libs/withApollo';

import Header from '../components/Header';
import Footer from '../components/Footer';

export default withApollo(
  withRedux(initStore)(
    class MyApp extends App {
      static async getInitialProps({ Component, ctx }) {
        return {
          pageProps: Component.getInitialProps
            ? await Component.getInitialProps(ctx)
            : {}
        };
      }

      render() {
        const { Component, pageProps, store, apolloClient } = this.props;
        return (
          <ApolloProvider client={apolloClient}>
            <Container>
              <Provider store={store}>
                <Fragment>
                  <Header />
                  <div className="main">
                    <Component {...pageProps} />
                  </div>
                  <Footer />
                </Fragment>
              </Provider>
            </Container>
          </ApolloProvider>
        );
      }
    }
  )
);
