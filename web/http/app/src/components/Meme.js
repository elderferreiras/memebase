import React from 'react'

const env = window.Memebase.env ? window.Memebase.env : 'dev';

const Meme = ({url, title}) => {
  const imgUrl = `https://memebase-elderf-com.s3-us-west-2.amazonaws.com/${env}/${url}`;

  return (
    <div className="col-md-6 col-lg-4 mb-5">
      <div className="portfolio-item mx-auto">
        <a href={imgUrl} download>
          <div className="portfolio-item-caption d-flex align-items-center justify-content-center h-100 w-100">
            <div className="portfolio-item-caption-content text-center text-white">
              <i className="fas fa-download fa-3x" />
              <p>Click to download</p>
            </div>
          </div>
          <img className="img-fluid" src={imgUrl} alt={title} />
        </a>
      </div>
    </div>
  );
};

export default Meme;
