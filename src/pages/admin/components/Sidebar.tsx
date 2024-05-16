import React from "react";
import { Link } from "react-router-dom";

type Props = {};

const Sidebar = (props: Props) => {
  return (
    <>
      <div className="sidebar">
        <ul className="sidebar__menu-list">
          <Link to="/admin/products">
            <li>Products</li>
          </Link>
          <Link to="/admin/statistical">
            <li>Statistical</li>
          </Link>
          {/* <Link to="/admin/user">
            <li>User</li>
          </Link> */}
          
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
