import React from 'react';
import { NewTable } from '../components/Table';
import { Button } from 'antd';
import { Link } from 'react-router-dom';



const LisProduct = () => {
  return (
    <div>
      <h1>Product List</h1>
      <Link to='add' className='btn btn-success my-2'>Add product</Link>
      <NewTable />
    </div>
  );
};

export default LisProduct;
