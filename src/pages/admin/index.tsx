import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

const LayoutAdmin = () => {
  return (
    <div className="admin">
       <Header />
      <div className="content" style={{ display: "flex" }}>
        <Sidebar />
        <div className="outlet__content">
        <Outlet />
        </div>
     
      </div>
    </div>
  );
};

export default LayoutAdmin;
