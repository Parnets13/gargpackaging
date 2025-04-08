import React from "react";
import Hero from "./home/Hero";
import Featured from "./home/Featured";

import Bestseller from "./home/Bestseller";
import Fact from "./home/Fact";
import Testimonial from "./testimonial/Testimonial";
import Product from "./home/Product";

const Home = () => {
  return (
    <>
      <Hero />
      <Featured />
      <Product />
      <Bestseller />
      {/* <Fact /> */}
      <div>
        <Testimonial />
      </div>
    </>
  );
};

export default Home;
