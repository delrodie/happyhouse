import React, {useState} from "react";
import {BrowserRouter as Router, Link, Outlet, Route, Routes} from "react-router-dom";
import Home from "../pages/Home";
import {Produit} from "../pages/Produit";
import Recette from "../pages/Recette";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars, faUser} from "@fortawesome/free-solid-svg-icons";
import '../../styles/app.scss'

const App = () => {
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleToggleMenu = () => {
      setIsOffcanvasOpen(!isOffcanvasOpen);
  };

  const handleLogout = () => {
      setIsLoggedIn(false)
  };

  const handleLinkClick = () => {
      setIsOffcanvasOpen(false)
  }

  return(
      <Router>
          <div>
              <nav className="navbar navbar-dark bg-primary sticky-top">
                  <div className="container">
                      <button className="navbar-toggler" type="button" onClick={handleToggleMenu}>
                          <FontAwesomeIcon icon={faBars}/>
                      </button>
                      <Link to="/" className="navbar-brand logo"><span>H</span>appyHouse</Link>
                      <div className="ml-auto">
                          {isLoggedIn ?(
                              <div className="nav-item dropdown">
                                  <button className="btn btn-link dropdown-toggle" id="userDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                      <FontAwesomeIcon icon={faUser} />
                                  </button>
                                  <div className="dropdown-menu dropdown-menu-right" aria-labelledby="userDropdown">
                                      <a href="#" className="dropdown-item">Profile</a>
                                      <div className="dropdown-divider"></div>
                                      <button className="dropdown-item" onClick={handleLogout}>Déconnexion</button>
                                  </div>
                              </div>
                          ):(
                              <ul className="navbar-nav">
                                  <li className="nav-item">
                                      <a href="#" className="nav-link">Connexion</a>
                                  </li>
                              </ul>
                          )}
                      </div>
                  </div>
              </nav>
              <div className={`offcanvas offcanvas-start ${isOffcanvasOpen ? 'show':''}`} tabIndex={-1} id="offcanvasMenu" aria-labelledby="offcanvasMenuLabel">
                  <div className="offcanvas-header">
                      <h5 className="offcanvas-title" id="offcanvasMenuLabel">Menu</h5>
                      <button type="button" className="btn-close" onClick={handleToggleMenu} aria-label="Close"></button>
                  </div>
                  <div className="offcanvas-body">
                      <ul className="navbar-nav">
                          <li className="nav-item">
                              <Link to="/" onClick={handleLinkClick} className="nav-link">Accueil</Link>
                          </li>
                          <li className="nav-item">
                              <Link to="/produits" onClick={handleLinkClick} className="nav-link">Produits</Link>
                          </li>
                          <li className="nav-item">
                              <Link to="/recettes" onClick={handleLinkClick} className="nav-link">Recettes</Link>
                          </li>
                      </ul>

                  </div>
              </div>
              <div className="container">
                  <Routes>
                      <Route exact path="/" element={<Home/>}/>
                      <Route path="/produits/*" element={<Produit/>}/>
                      <Route path="/recettes/*" element={<Recette/>}/>
                  </Routes>
              </div>
          </div>
      </Router>
  )
}

export default App;