import React, { useState, useEffect } from 'react';
import Card from './Card';
import Button from './Button';
import Search from './Search';
import { BASE_URL } from '../config';

const CardList = () => {
  const limit = 10; 
  const [offset, setOffset] = useState(0); 
  const [products, setProducts] = useState([]); 
  const [searchQuery, setSearchQuery] = useState(''); 

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${BASE_URL}/products?offset=${offset}&limit=${limit}`);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setProducts(data); 
    } catch (err) {
      console.error('Error fetching products:', err);
    }
  };

    const filterProducts = async () => {
    try {
      const response = await fetch(`${BASE_URL}/products?query=${searchQuery}`);
      if (!response.ok) {
        throw new Error('Failed to filter products');
      }
      const data = await response.json();
      setProducts(data); 
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
    setSearchQuery(query); 
    setOffset(0); 
  };

  const handlePrevious = () => {
    if (offset > 0) {
      setOffset(offset - limit);
    }
  };

 
  const handleNext = () => {
    setOffset(offset + limit);
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
        <Button text="Previous" handleClick={handlePrevious} />
        <Button text="Next" handleClick={handleNext} />
      </div>
    </div>
  );
};

export default CardList;
