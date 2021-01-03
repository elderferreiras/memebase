import React from 'react'
import Nav from './Nav';
import Footer from './Footer';

const Page = (props) => {
  return (
    <div id="page-top">
      <Nav />
      {props.children}
      <Footer />
    </div>
  )
};

export default Page
