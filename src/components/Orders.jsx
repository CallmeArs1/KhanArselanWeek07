import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../config'; 

const Orders = () => {
  const [orders, setOrders] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 


  const fetchOrders = async () => {
    try {
      const response = await fetch(`${BASE_URL}/orders`); 
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setOrders(data);
    } catch (err) {
      setError(err.message); 
    } finally {
      setLoading(false); 
    }
  };


  useEffect(() => {
    fetchOrders();
  }, []);

 
  if (loading) {
    return <p>Loading orders...</p>;
  }


  if (error) {
    return <p>Error: {error}</p>;
  }

 
  if (orders.length === 0) {
    return <p>No orders found.</p>;
  }

  
  return (
    <div className="center mw7 ba mv4">
      <div className="bg-white pa3 mb3">
        <h2 className="f2 mb2">Orders</h2>
        <table className="w-100 collapse ba br2 b--black-10 pv2 ph3">
          <thead>
            <tr>
              <th className="tl pv2 ph3">Order ID</th>
              <th className="tl pv2 ph3">Buyer Email</th>
              <th className="tl pv2 ph3">Products</th>
              <th className="tl pv2 ph3">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="stripe-dark">
                <td className="tl pv2 ph3">{order._id}</td>
                <td className="tl pv2 ph3">{order.buyerEmail}</td>
                <td className="tl pv2 ph3">
                  {order.products.map((product) => (
                    <div key={product.name}>
                      {product.name} (x{product.quantity})
                    </div>
                  ))}
                </td>
                <td className="tl pv2 ph3">{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
