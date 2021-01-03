import React from 'react'

const Footer = () => {
  return (
    <footer className="footer text-center">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 mb-5 mb-lg-0">
            <h4 className="text-uppercase mb-4">Social</h4>
            <a className="btn btn-outline-light btn-social mx-1" href="http://twitter.com/pattenferreira"><i className="fab fa-fw fa-twitter"/></a>
            <a className="btn btn-outline-light btn-social mx-1" href="https://www.linkedin.com/in/elder-patten-ferreira"><i className="fab fa-fw fa-linkedin-in"/></a>
          </div>
          <div className="col-lg-4">
            <h4 className="text-uppercase mb-4">About Memebase</h4>
            <p className="lead mb-0">
              {`Memebase is a free search tool created by `}
              <a href="http://twitter.com/pattenferreiram">@pattenferreira</a>
              .
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
};

export default Footer;
