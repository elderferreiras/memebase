import React from 'react';
import { Link } from 'react-router-dom';
import Page from './Page';

const About = () => {
  return (
    <Page>
      <section className="masthead page-section bg-primary text-white mb-0 mt-5" id="about">
        <div className="container">
          <h2 className="page-section-heading text-center text-uppercase text-white">About</h2>
          <div className="divider-custom divider-light">
            <div className="divider-custom-line"/>
            <div className="divider-custom-icon"><i className="fas fa-star"/></div>
            <div className="divider-custom-line"/>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-4"><p className="lead">Memebase is a meme database where users can search for a word or feeling and get the meme they need to go with that.</p></div>
          </div>
          <div className="text-center mt-4">
            <Link className="btn btn-xl btn-outline-light" to="/">
              <i className="fas fa-search mr-2"/>
              Search now!
            </Link>
          </div>
        </div>
      </section>
    </Page>
  )
};

export default About
