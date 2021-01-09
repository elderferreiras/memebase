import React, { useCallback, useEffect } from 'react'
import { debounce } from 'lodash';
import queryString from 'query-string'
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Results from '../components/Results';
import SearchForm from '../components/SearchForm';
import Nav from '../components/Nav';
import { fetchSearchResults } from '../store/actions';
import Page from '../components/Page';

const Search = () => {
  const { q } = queryString.parse(useLocation().search);

  const results = useSelector(state => state.search.results);
  const error = useSelector(state => state.search.error);
  const loading = useSelector(state => state.search.loading);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSearchResults(q));
  }, [q, dispatch]);


  const onChange = (query) => {
    dispatch(fetchSearchResults(query))
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceOnChange = useCallback(debounce(onChange, 800), []);

  let resultsEl = <Results results={results} />;

  if (loading) {
    resultsEl = (
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="sr-only">Searching...</span>
        </div>
      </div>
    );
  }

  if (error) {
    resultsEl = (<h2>Something bad happened. Try again.</h2>);
  }

  const posFooter = error || loading || !results.length ? 'position-absolute' : '';

  return (
    <Page posFooter={posFooter}>
      <section className="masthead page-section portfolio">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto">
              <SearchForm setQuery={debounceOnChange} />
            </div>
          </div>
          <div className="divider-custom">
            <div className="divider-custom-line"/>
            <div className="divider-custom-icon"><i className="fas fa-search"/></div>
            <div className="divider-custom-line"/>
          </div>
          <div className="row justify-content-center">
            {resultsEl}
          </div>
        </div>
      </section>
    </Page>
  )
};

export default Search
