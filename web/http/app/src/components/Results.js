import React from 'react'

import Meme from './Meme';

const Results = ({ results }) => {
  if (!results.length) {
    return <p>Your search did not match any meme. Sorry, I guess.</p>;
  }

  return results.map((searchResult) => <Meme key={searchResult.id} {...searchResult} />);
};

export default Results;
