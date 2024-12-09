

import React, { useState, useEffect } from 'react';
import Card from './Card';
import Button from './Button';
import Search from './Search';
import { BASE_URL } from '../config';

const CardList = () => {
  const limit = 10;
  const [offset, setOffset] = useState(0);
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); // State for search/filter query

  // Fetch products from API
  const fetchProducts = async () => {
    try {
      const response = await fetch(`${BASE_URL}/products?offset=${offset}&limit=${limit}`);
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      console.error('Error fetching products:', err);
    }
  };

  // Filter products based on search query
  const filterProducts = async () => {
    try {
      const response = await fetch(`${BASE_URL}/products?query=${searchQuery}`);
      const data = await response.json();
      setProducts(data); // Update state with filtered products
    } catch (err) {
      console.error('Error filtering products:', err);
    }
  };


  useEffect(() => {
    if (searchQuery) {
      filterProducts();
    } else {
      fetchProducts();
    }
  }, [offset, searchQuery]);

  
  const handleSearch = (query) => {
    setSearchQuery(query); // Update search query
    setOffset(0); // Reset pagination when searching
  };

  return (
    <div className="cf pa2">
      {/* Search Component */}
      <Search handleSearch={handleSearch} />
      <div className="mt2 mb2">
        {/* Render Product Cards */}
        {products.map((product) => (
          <Card key={product.id} {...product} />
        ))}
      </div>
      <div className="flex items-center justify-center pa4">
        {/* Pagination Buttons */}
        <Button text="Previous" handleClick={() => setOffset(Math.max(0, offset - limit))} />
        <Button text="Next" handleClick={() => setOffset(offset + limit)} />
      </div>
    </div>
  );
};

export default CardList;
