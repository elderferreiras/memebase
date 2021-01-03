import React, { useEffect, useState } from 'react'
import axios from 'axios';
import queryString from 'query-string'
import { useLocation } from "react-router-dom";


const Search = (props) => {
  const { q } = queryString.parse(useLocation().search);
  const [query, setQuery] = useState(q);
  const [results, setResults] = useState([]);

  useEffect(() => {
    axios.get(`/get_results`,{
      params: {
        q: query
      }
    })
      .then(res => {
        const {results} = res.data;
        setResults(results);
      })
  }, [query]);


  return (
    <div id="page-top">
      <nav className="navbar navbar-expand-lg bg-secondary text-uppercase fixed-top" id="mainNav">
        <div className="container">
          <a className="navbar-brand js-scroll-trigger" href="#page-top">Memebase</a>
          <button className="navbar-toggler navbar-toggler-right text-uppercase font-weight-bold bg-primary text-white rounded" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
            Menu
            <i className="fas fa-bars"/>
          </button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item mx-0 mx-lg-1"><a className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger" href="#about">About</a></li>
              <li className="nav-item mx-0 mx-lg-1"><a className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger" href="#contact">Contact</a></li>
            </ul>
          </div>
        </div>
      </nav>
      <section className="masthead page-section portfolio" id="portfolio">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto">
              <form id="form" name="search-query" noValidate="novalidate">
                <div className="control-group">
                  <div className="form-group floating-label-form-group controls mb-0 pb-2">
                    <label>Search</label>
                    <input className="form-control"
                           name="q"
                           type="text"
                           placeholder="Search"
                           required="required"
                           value={query}
                           onChange={({ target }) => setQuery(target.value)}
                           data-validation-required-message="Please enter a term to search."
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="divider-custom">
            <div className="divider-custom-line"/>
            <div className="divider-custom-icon"><i className="fas fa-search"/></div>
            <div className="divider-custom-line"/>
          </div>
          <div className="row justify-content-center">
            {results.length ? results.map(({ id, url, title }) => {
              const imgUrl = `https://memebase-elderf-com.s3-us-west-2.amazonaws.com/prod/${url}`;

              return (
                <div className="col-md-6 col-lg-4 mb-5" key={id}>
                  <div className="portfolio-item mx-auto" data-toggle="modal" data-target="#portfolioModal1">
                    <div className="portfolio-item-caption d-flex align-items-center justify-content-center h-100 w-100">
                      <div className="portfolio-item-caption-content text-center text-white"><i className="fas fa-plus fa-3x"/></div>
                    </div>
                    <img className="img-fluid" src={imgUrl} alt={title} />
                  </div>
                </div>
              )
            }) : <p>No results founds.</p>}
          </div>
        </div>
      </section>
    </div>
  )
};

export default Search
