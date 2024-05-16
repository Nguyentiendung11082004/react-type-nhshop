import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import UseOrderItem from "../hooks/useOrderItem";
import UseOrderItem from "./QuantityProduct";

const Header = () => {
  // const qty = useOrderItem();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 768) {
        setIsMenuOpen(false);
        setIsOverlayOpen(false);
      }
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const toggleOverlay = () => {
    setIsOverlayOpen(!isOverlayOpen)
  }
  const handleLinkClick = () => {
    setIsMenuOpen(!isMenuOpen);   
  };
  return (
    <>
      <header className="header">
        <div className="container">
          <div className="header-inner">
            <Link to="/" className="header__logo">
              <img src="/src/assets/icons/logo.png" alt="Logo" />
            </Link>
            <div className="button-mobile" onClick={() => {toggleMenu(); toggleOverlay();handleLinkClick();}}>
              <button>=</button>
            </div>
            <div className={`menu-mobile ${isMenuOpen ? "open" : ""} `}>
              <button className="menu-mobile__close" onClick={() => {toggleMenu();toggleOverlay();handleLinkClick() }}>
                Close
              </button>
              <ul className="main-menu__list">
                <li className="main-menu__item">
                  <Link to="/" className="main-menu__link" onClick={()=>{ toggleOverlay();handleLinkClick()}}>
                    Home
                  </Link>
                </li>
                <li className="main-menu__item">
                  <Link to="/shop" className="main-menu__link" onClick={()=>{ toggleOverlay();handleLinkClick()}}>
                    Shop
                  </Link>
                </li>
                <li className="main-menu__item">
                  <Link to="/about" className="main-menu__link" onClick={()=>{ toggleOverlay();handleLinkClick()}} >
                    About
                  </Link>
                </li>
                <li className="main-menu__item">
                  <Link to="contact" className="main-menu__link"  onClick={()=>{ toggleOverlay();handleLinkClick()}}>
                    Contact
                  </Link>
                </li>
              </ul>
              <div className="header-items ">
                <div className="header-item">
                  <Link to={`/login`} onClick={()=>{ toggleOverlay();handleLinkClick()}} >
                    <span>
                      <img src="/src/assets/icons/1.svg" alt="User icon" />
                    </span>
                  </Link>
                </div>
                <div className="header-item">
                  <span>
                    <img src="/src/assets/icons/2.svg" alt="User icon" />
                  </span>
                </div>
                <div className="header-item">
                  <span>
                    <img src="/src/assets/icons/3.svg" alt="User icon" />
                  </span>
                </div>
                <div className="header-item">
                  <p className="qty">
                    <UseOrderItem />
                  </p>
                  <Link to="/cart" onClick={()=>{ toggleOverlay();handleLinkClick()}}>
                    <span>
                      <img src="/src/assets/icons/4.svg" alt="Cart icon" />
                    </span>
                  </Link>
                </div>
              </div>
            </div>
            <div className={`overlay ${isOverlayOpen ? "open" : ""}`} onClick={() => {toggleMenu(); toggleOverlay();}}></div>
            <nav className="main-menu">
              <ul className="main-menu__list">
                <li className="main-menu__item">
                  <Link to="/" className="main-menu__link">
                    Home
                  </Link>
                </li>
                <li className="main-menu__item">
                  <Link to="/shop" className="main-menu__link">
                    Shop
                  </Link>
                </li>
                <li className="main-menu__item">
                  <Link to="/about" className="main-menu__link">
                    About
                  </Link>
                </li>
                <li className="main-menu__item">
                  <Link to="contact" className="main-menu__link">
                    Contact
                  </Link>
                </li>
              </ul>
            </nav>
            <div className="header-items">
              <div className="header-item">
                <Link to={`/login`}>
                  <span>
                    <img src="/src/assets/icons/1.svg" alt="User icon" />
                  </span>
                </Link>
              </div>
              <div className="header-item">
                <span>
                  <img src="/src/assets/icons/2.svg" alt="User icon" />
                </span>
              </div>
              <div className="header-item">
                <span>
                  <img src="/src/assets/icons/3.svg" alt="User icon" />
                </span>
              </div>
              <div className="header-item">
                <p className="qty">
                  <UseOrderItem />
                </p>
                <Link to="/cart">
                  <span>
                    <img src="/src/assets/icons/4.svg" alt="Cart icon" />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
