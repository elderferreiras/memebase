import React from 'react'
import Nav from './Nav';
import Footer from './Footer';

const Page = (props) => {
  return (
    <div id="page-top">
      <Nav />
      {props.children}
      <Footer pos={props.posFooter}/>
    </div>
  )
};

export default Page
