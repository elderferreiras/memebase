import React from 'react';
import Page from './Page';

const Contact = () => {
  const imgUrl = 'https://elder-patten-ferreira-resume.s3-us-west-2.amazonaws.com/assets/images/0.jpeg';

  return (
    <Page>
      <header className="masthead bg-primary text-white text-center">
        <div className="container d-flex align-items-center flex-column">
          <img className="masthead-avatar mb-5" src={imgUrl} alt="Elder Patten Ferreira" />
          <h1 className="masthead-heading text-uppercase mb-0">Elder Patten Ferreira</h1>
          <div className="divider-custom divider-light">
            <div className="divider-custom-line"/>
            <div className="divider-custom-icon"><i className="fas fa-star"/></div>
            <div className="divider-custom-line"/>
          </div>
          <p className="masthead-subheading font-weight-light mb-0">Software Developer</p>
        </div>
      </header>
    </Page>
  )
};

export default Contact
