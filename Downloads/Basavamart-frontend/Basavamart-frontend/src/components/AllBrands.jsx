import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const API_URL = "http://localhost:3003/api/product";

const AllBrands = () => {
  const [brands, setBrands] = useState([]);

  const fetchBrands = async () => {
    try {
      const response = await axios.get(`${API_URL}/getbrand`);
      setBrands(response.data);
    } catch (error) {
      console.error("Failed to fetch brands", error);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-8">All Brands</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {brands.map((brand, index) => (
          <div key={index} className="text-center">
            <Link to="/shop">
              <LazyLoadImage
                src={`http://localhost:3003

${brand.img}`}
                alt={brand.name}
                effect="blur"
                className="w-full h-48 object-cover rounded-lg"
              />
            </Link>
            <h3 className="mt-2 text-lg font-semibold">{brand.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllBrands;